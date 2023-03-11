# context 传递 kv

## go sdk context 包

ctx 的 kv pair

提供了两个方法

```go
context.WithValue()
context.Value()
```

## grpc-go metadata 包

提供了传出和传入 key 定义

```go
type mdIncomingKey struct{}
type mdOutgoingKey struct{}

```

## B 站 metadata 包

大仓提供了 metadata 的定义

ctx 存储 kv：metadata.mdKey=>metadata.MD

metadata.MD 存储的 map 的 key 比对 metadata.outgoingKey 和 metadata.incomingKey

```go
// MD is a mapping from metadata keys to values.
type MD map[string]interface{}
type mdKey struct{}

// rpc client 获取和塞入的 outgoing key
var outgoingKey = map[string]struct{}{
	Color:       {},
	RemoteIP:    {},
	RemotePort:  {},
	Mirror:      {},
	Criticality: {},
}

var incomingKey = map[string]struct{}{
	Caller: {},
	Zone:   {},
}
```

### http server

bm server.go handlerContext 处理了 ctx 的 kv，这样 bff 网关接口内部通过内置的 key 可以获取相应的信息

```go
func (engine *Engine) handleContext(c *Context) {
	engine.prepareHandler(c)
	if sampled, _ := engine.statSampler.IsSampled(c.RoutePath); sampled {
		c.Request.Body = &statBody{
			ctx:        c,
			routePath:  c.RoutePath,
			ReadCloser: c.Request.Body,
		}
		c.Writer = &statWriter{
			ctx:            c,
			routePath:      c.RoutePath,
			ResponseWriter: c.Writer,
		}
	}

	var cancel func()
	req := c.Request
	ctype := req.Header.Get("Content-Type")
	switch {
	case strings.Contains(ctype, "multipart/form-data"):
		req.ParseMultipartForm(defaultMaxMemory)
	default:
		req.ParseForm()
	}

	// get derived timeout from http request header,
	// compare with the engine configured,
	// and use the minimum one
	engine.lock.RLock()
	tm := time.Duration(engine.conf.Timeout)
	engine.lock.RUnlock()
	// the method config is preferred
	if pc := engine.methodConfig(c.RoutePath); pc != nil {
		tm = time.Duration(pc.Timeout)
	}
	if ctm := timeout(req); ctm > 0 && tm > ctm {
		tm = ctm
	}
	ipAddr := remoteIP(req)
	ipPort := remotePort(req)
	md := metadata.MD{
		metadata.Color:       color(req),
		metadata.RemoteIP:    ipAddr,
		metadata.RemotePort:  ipPort,
		metadata.Caller:      caller(req),
		metadata.Mirror:      mirror(req),
		metadata.Criticality: string(criticalityPkg.Critical),
	}
	if crtl := criticality(req); crtl != criticalityPkg.EmptyCriticality {
		md[metadata.Criticality] = string(crtl)
	}
  // 1.构建ctx，并且塞入md，metadata.mdKey => metadata.MD，底层调用go sdk下context.WithValue
	ctx := metadata.NewContext(context.Background(), md)
  // 2.塞入networkKey
	ctx = netctx.NewContext(ctx, netctx.Network{
		RemoteIP:   ipAddr,
		RemotePort: ipPort,
		WebcdnIP:   req.Header.Get("X-Cache-Server-Addr"),
	})
	if tm > 0 {
    // 3.ctx 设置超时
		c.Context, cancel = context.WithTimeout(ctx, tm)
	} else {
    // 4.ctx 设置cacel
		c.Context, cancel = context.WithCancel(ctx)
	}
	defer cancel()
	c.Next()
}
```

ctx 塞入 metadata.mdKey => metadata.MD

### grpc

#### client

```go
// handle returns a new unary client interceptor for OpenTracing\Logging\LinkTimeout.
func (c *Client) handle() grpc.UnaryClientInterceptor {
	return func(ctx context.Context, method string, req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) (err error) {
		var (
			ok     bool
			t      trace.Trace
			gmd    metadata.MD
			conf   *ClientConfig
			cancel context.CancelFunc
			addr   string
			p      peer.Peer
		)

		// apm tracing
		if t, ok = trace.FromContext(ctx); ok {
			t = t.Fork("", method)
		} else {
			t = trace.New(method)
		}
		t.SetTag(_gRPCComponentTag)
		t.SetTag(trace.SpanKindClientTag)
		t.SetTag(trace.String(trace.TagMirror, nmd.String(ctx, nmd.Mirror)))
		defer grpc_trace.FinishWithError(t, &err)

		// 1.构建value grpc.metadata.MD
		gmd = baseMetadata()
		trace.Inject(t, trace.GRPCFormat, gmd)
		c.mutex.RLock()
		if conf, ok = c.conf.Method[method]; !ok {
			conf = c.conf
		}
		c.mutex.RUnlock()
		brk := c.breaker.Get(method)
		if err = brk.Allow(); err != nil {
			_metricClientReqCodeTotal.Inc(method, "breaker", getPathFromTarget(cc.Target()))
			return
		}
		defer onBreaker(brk, &err)
		var timeOpt *TimeoutCallOption
		for _, opt := range opts {
			var tok bool
			timeOpt, tok = opt.(*TimeoutCallOption)
			if tok {
				break
			}
		}
		if timeOpt != nil && timeOpt.Timeout > 0 {
			ctx, cancel = context.WithTimeout(xcontext.Detach(ctx), timeOpt.Timeout)
		} else {
			_, ctx, cancel = conf.Timeout.Shrink(ctx)
		}
		defer cancel()
    // 2.获取上游ctx中key metadata.mdKey得到value metadata.MD(非grpc.metadata.MD)，value是个map，对于这个map的key string和metadata.outgoingKey做比对从而过滤，gmd是grpc.metadata.MD
    // grpc.metadata.MD 是 map[string][]string
    // metadata.MD 都是 map[string]interface{}
		nmd.Range(ctx,
			func(key string, value interface{}) {
				if valstr, ok := value.(string); ok && valstr != "" {
					gmd[key] = []string{valstr}
				}
			},
			nmd.IsOutgoingKey)
    // 3.获取上游ctx中key grpc.metadata.mdOutgoingKey得到value grpc.metadata.MD
		if oldmd, ok := metadata.FromOutgoingContext(ctx); ok {
      // 4.和3生成的MD做合并
			gmd = metadata.Join(gmd, oldmd)
		}
    // 5.调用grpc-go底层方法，塞入key grpc.metadata.mdOutgoingKey和value grpc.metadata.MD
		ctx = metadata.NewOutgoingContext(ctx, gmd)

		opts = append(opts, grpc.Peer(&p))
    // 6.发起grpc请求
		err = invoker(ctx, method, req, reply, cc, opts...)
		if p.Addr != nil {
			addr = p.Addr.String()
		}
		if t != nil {
			t.SetTag(trace.String(trace.TagAddress, addr), trace.String(trace.TagComment, ""))
		}
		return
	}
}
```

client 端调用下游 grpc 服务时，合并 ctx 中的 metadata.mdKey => metadata.MD 和 grpc.metadata.mdOutgoingKey => value grpc.metadata.MD，并且构建新的塞入 ctx 中 grpc.metadata.mdOutgoingKey => grpc.metadata.MD

#### server

```go
// handle return a new unary server interceptor for OpenTracing\Logging\LinkTimeout.
func (s *Server) handle() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, args *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		var (
			cancel func()
			addr   string
		)
		s.mutex.RLock()
		conf := s.conf
		s.mutex.RUnlock()
		// get derived timeout from grpc context,
		// compare with the warden configured,
		// and use the minimum one
		timeout := time.Duration(conf.Timeout)
		if dl, ok := ctx.Deadline(); ok {
			ctimeout := time.Until(dl)
			if ctimeout-time.Millisecond*2 > 0 {
				ctimeout = ctimeout - time.Millisecond*2
			}
			if timeout > ctimeout {
				timeout = ctimeout
			}
		}
		ctx, cancel = context.WithTimeout(ctx, timeout)
		defer cancel()

		// get grpc metadata(trace & remote_ip & color)
		var t trace.Trace
    // 1.初始化metadata.MD，cmd是服务创建的
		cmd := nmd.MD{}
		cmd[nmd.FullMethod] = args.FullMethod
    // 2.获取上游ctx中key grpc.metadata.mdIncomingKey得到value grpc.metadata.MD
    // 不是client设置的key mdOutgoingKey ？
    // gmd是grpc.metadata.MD，上游ctx中的
		if gmd, ok := metadata.FromIncomingContext(ctx); ok {
			t, _ = trace.Extract(trace.GRPCFormat, gmd)
			for key, vals := range gmd {
        // 3.这里nmd是metadata.MD，nmd和gmd的key都是string，key比较，过滤了非（metadata.outgoingKey+metadata.ingoingKey），把gmd数据复制到cmd
				if nmd.IsIncomingKey(key) {
					cmd[key] = vals[0]
				}
			}
      // 4.这里重新调整cmd的color，上面已经遍历了gmd，但是做了过滤，包含颜色的key不在（metadata.outgoingKey+metadata.ingoingKey）中，所以要再次使用gmd获取
			reconcileColor(gmd, cmd)
		}
		if t == nil {
			t = trace.New(args.FullMethod)
		} else {
			t.SetTitle(args.FullMethod)
		}
		t.SetTag(_gRPCComponentTag)
		t.SetTag(trace.SpanKindServerTag)
		t.SetTag(trace.TagString(trace.TagMirror, nmd.String(ctx, nmd.Mirror)))
		t.SetTag(trace.TagInt("server-throughput-in", messageSize(req)))
		// set BILI-TRACE-ID to response header, associate the misaka log
		grpc.SetTrailer(ctx, metadata.Pairs(trace.BiliTraceID, t.TraceID()))
		grpc.SetTrailer(ctx, metadata.Pairs(trace.DeprecatedBiliTraceID, t.ShortTraceID()))

		if pr, ok := peer.FromContext(ctx); ok {
			addr = pr.Addr.String()
			t.SetTag(trace.String(trace.TagAddress, addr))
		}
		defer grpc_trace.FinishWithError(t, &err)
		// 5.构建ctx，把cmd设置到ctx中，metadata.mdKey => metadata.MD，底层调用go sdk下context.WithValue
		// use common meta data context instead of grpc context
		ctx = nmd.NewContext(ctx, cmd)
		ctx = trace.NewContext(ctx, t)

		resp, err = handler(ctx, req)
		if err != nil {
			return nil, status.FromError(err).Err()
		}
		t.SetTag(trace.TagInt("server-throughput-out", messageSize(resp)))
		return resp, nil
	}
}
```

server 端处理上游 grpc 请求时，合并 ctx 中 grpc.metadata.mdIncomingKey => grpc.metadata.MD，并且构建新的塞入 ctx 中 metadata.mdKey => metadata.MD

### 总结

> 1. http server 端 ctx 塞入 metadata.mdKey => metadata.MD
> 2. grpc client 端调用下游 grpc 服务时，合并 ctx 中的 metadata.mdKey => metadata.MD 和 grpc.metadata.mdOutgoingKey => value grpc.metadata.MD，并且构建新的塞入 ctx 中 grpc.metadata.mdOutgoingKey => grpc.metadata.MD
> 3. grpc server 端处理上游 grpc 请求时，合并 ctx 中 grpc.metadata.mdIncomingKey => grpc.metadata.MD，并且构建新的塞入 ctx 中 metadata.mdKey => metadata.MD

### 案例

调用链路：**apigw -> bff1 -> grpcs1 -> grpcs2**

bff1 ctx 链路分析

1. 从 req 获取 metadata 信息，往 ctx 塞入 metadata.mdKey => metadata.MD
2. 调用 grpcs1，合并 1 中的 metadata.mdKey => metadata.MD 和`grpc.metadata.mdOutgoingKey` => value grpc.metadata.MD，构建新的塞入 ctx 中`grpc.metadata.mdOutgoingKey` => grpc.metadata.MD

grpcs1 ctx 链路分析

1. 处理 grpc 请求，合并 ctx 中`grpc.metadata.mdIncomingKey` => grpc.metadata.MD，并且构建新的塞入 ctx 中 metadata.mdKey => metadata.MD
2. 调用 grpcs2，合并 1 中的 metadata.mdKey => metadata.MD 和`grpc.metadata.mdOutgoingKey` => value grpc.metadata.MD，构建新的塞入 ctx 中`grpc.metadata.mdOutgoingKey` => grpc.metadata.MD

grpcs2 ctx 链路分析

1. 处理 grpc 请求，合并 ctx 中`grpc.metadata.mdIncomingKey` => grpc.metadata.MD，并且构建新的塞入 ctx 中 metadata.mdKey => metadata.MD

2. 逻辑处理
