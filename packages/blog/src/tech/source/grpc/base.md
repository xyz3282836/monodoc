---
title: "resolver"
date: 2023-07-18 09:00:00 +8
category: 技术
tag:
  - grpc
  - 服务发现
  - resolver
---

## 基础

基础接口：

```go
type Builder interface {
	Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)
	Scheme() string
}

type Resolver interface {
	ResolveNow(ResolveNowOptions)
	Close()
}

type ClientConn interface {
	UpdateState(State) error
	ReportError(error)
	// Deprecated: Use UpdateState instead.
	NewAddress(addresses []Address)
	// Deprecated: Use UpdateState instead.
	NewServiceConfig(serviceConfig string)
	// ParseServiceConfig parses the provided service config and returns an
	// object that provides the parsed config.
	ParseServiceConfig(serviceConfigJSON string) *serviceconfig.ParseResult
}
```

下面依次分析这三个接口的作用：

- `Builder`用于 gRPC 内部创建`Resolver`接口的实现，但注意声明的`Build`方法将接口`ClientConn`作为参数传入了
- `ClientConn`接口有两个废弃方法不用管，看`UpdateState`方法需要传入`State`结构，看代码可以发现其中包含了`Addresses []Address // Resolved addresses for the target`，可以看出是需要将服务发现得到的`Address`对象列表告诉`ClientConn`的对象
- `Resolver`提供了`ResolveNow`用于被 gRPC 尝试重新进行服务发现

看完这三个接口就可以明白 gRPC 的服务发现实现逻辑，通过`Builder`进行`Reslover`的创建，在`Build`的过程中将服务发现的地址信息丢给`ClientConn`用于内部连接创建等逻辑。主要逻辑可以按下面顺序来看源码理解：

- 当`client`在`Dial`时会根据`target`解析的`scheme`获取对应的`Builder`，[官方代码位置](https://github.com/grpc/grpc-go/blob/master/clientconn.go#L242)
- 当`Dial`成功会创建出结构体`ClientConn`的对象[官方代码位置](https://github.com/grpc/grpc-go/blob/master/clientconn.go#L447)(注意不是上面的`ClientConn`接口)，可以看到结构体`ClientConn`内的成员`resolverWrapper`又实现了接口`ClientConn`的方法[官方代码位置](https://github.com/grpc/grpc-go/blob/master/resolver_conn_wrapper.go)
- 当`resolverWrapper`被初始化时就会调用`Build`方法[官方代码位置](https://github.com/grpc/grpc-go/blob/master/resolver_conn_wrapper.go#L89)，其中参数为接口`ClientConn`传入的是`ccResolverWrapper`
- 当用户基于`Builder`的实现进行`UpdateState`调用时，则会触发结构体`ClientConn`的`updateResolverState`方法[官方代码位置](https://github.com/grpc/grpc-go/blob/master/resolver_conn_wrapper.go#L109)，`updateResolverState`则会对传入的`Address`进行初始化等逻辑[官方代码位置](https://github.com/grpc/grpc-go/blob/master/clientconn.go#L553)

如此整个服务发现过程就结束了。从中也可以看出 gRPC 官方提供的三个接口还是很灵活的，但也正因为灵活要实现稍微麻烦一些，而`Address`[官方代码位置](https://github.com/grpc/grpc-go/blob/master/resolver/resolver.go#L79)如果直接被业务拿来用于服务节点信息的描述结构则显得有些过于简单。

所以`warden`包装了 gRPC 的整个服务发现实现逻辑，代码分别位于`library/naming/naming.go`和`warden/resolver/resolver.go`，其中：

`resolver.go`内实现了 gRPC官方的`resolver.Builder`和`resolver.Resolver`接口，但也暴露了`naming.go`内的`naming.Builder`和`naming.Resolver`接口

- **Resolver实现了gRPC官方`resolver.Resolver`接口，并且包含了naming包下新的Resolver interface**
- **Builder实现了gRPC官方`resolver.Builder`接口，并且new可以传入naming包下新的Builder interface**

```go
// warden/resolver/resolver.go

_  resolver.Resolver = &Resolver{}// Resolver实现了gRPC官方resolver.Resolver接口
_  resolver.Builder  = &Builder{}// Builder实现了gRPC官方resolver.Builder接口

type Resolver struct {
	nr   naming.Resolver// naming包下Resolver interface
	cc   resolver.ClientConn
	quit chan struct{}

	zone string
}

// Close is a noop for Resolver.
func (r *Resolver) Close() {
...
}

// ResolveNow is a noop for Resolver.
func (r *Resolver) ResolveNow(o resolver.ResolveNowOptions) {
  // 空函数
}

func (r *Resolver) updateproc(forceZone bool) {
...
}

func (r *Resolver) newAddress(instances []*naming.Instance) {
...
}


type Builder struct {
	naming.Builder// naming包下Builder interface,其中就有grpc.Resolver.Scheme的定义，所以实现了grpc的resolver.Builder接口
}

func (b *Builder) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
...
  // 内部会调用naming.Builder的简化Build方法
}

```

`naming.go`内定义了用于描述业务实例的`Instance`结构、用于服务注册的`Registry`接口、用于服务发现的`Resolver`接口。

可以看到封装方式与 gRPC 官方的方法一样，通过`Builder`进行`Resolver`的初始化。不同的是通过封装将参数进行了简化：

- `Build`只需要传对应的服务`id`即可：`warden/resolver/resolver.go`在 gRPC 进行调用后，会根据`Scheme`方法查询对应的`naming.Builder`实现并调用`Build`将`id`传入，而`naming.Resolver`的实现即可通过`id`去对应的服务发现中间件进行实例信息的查询
- 而`Resolver`则对方法进行了扩展，除了简单进行`Fetch`操作外还多了`Watch`方法，用于监听服务发现中间件的节点变化情况，从而能够实时的进行服务实例信息的更新

```go
// library/naming/naming.go
type Builder interface {
	Build(id string, options ...BuildOpt) Resolver// 这是naming下的Resolver interface
	Scheme() string
}

type Resolver interface {
	Fetch(context.Context) (map[string][]*Instance, bool)
	Watch() <-chan struct{}
	Close() error
}
```

discovery是naming.go中Builder和Resolver的具体的一种实现，有其他实现

- **Discovery实现了naming下的Builder和Registry接口**
- **Resolver实现了naming下的Resolver接口**

```go
// library/naming/discovery/discovery.go

_ naming.Builder  = &Discovery{}
_ naming.Registry = &Discovery{}
_ naming.Resolver = &Resolver{}
```

## 拦截器

### 说明

gRPC 暴露了两个拦截器接口，分别是：

- `grpc.UnaryServerInterceptor`服务端拦截器
- `grpc.UnaryClientInterceptor`客户端拦截器

基于两个拦截器可以针对性的定制公共模块的封装代码，比如`warden/logging.go`是通用日志逻辑。

### 分析

#### 服务端拦截器

让我们先看一下`grpc.UnaryServerInterceptor`的声明，[官方代码位置](https://github.com/grpc/grpc-go/blob/master/interceptor.go)：

```go
// UnaryServerInfo consists of various information about a unary RPC on
// server side. All per-rpc information may be mutated by the interceptor.
type UnaryServerInfo struct {
    // Server is the service implementation the user provides. This is read-only.
    Server interface{}
    // FullMethod is the full RPC method string, i.e., /package.service/method.
    FullMethod string
}

// UnaryHandler defines the handler invoked by UnaryServerInterceptor to complete the normal
// execution of a unary RPC. If a UnaryHandler returns an error, it should be produced by the
// status package, or else gRPC will use codes.Unknown as the status code and err.Error() as
// the status message of the RPC.
type UnaryHandler func(ctx context.Context, req interface{}) (interface{}, error)

// UnaryServerInterceptor provides a hook to intercept the execution of a unary RPC on the server. info
// contains all the information of this RPC the interceptor can operate on. And handler is the wrapper
// of the service method implementation. It is the responsibility of the interceptor to invoke handler
// to complete the RPC.
type UnaryServerInterceptor func(ctx context.Context, req interface{}, info *UnaryServerInfo, handler UnaryHandler) (resp interface{}, err error)
```

看起来很简单包括：

- 一个`UnaryServerInfo`结构体用于`Server`和`FullMethod`字段传递，`Server`为`gRPC server`的对象实例，`FullMethod`为请求方法的全名
- 一个`UnaryHandler`方法用于传递`Handler`，就是基于`proto`文件`service`内声明而生成的方法
- 一个`UnaryServerInterceptor`用于拦截`Handler`方法，可在`Handler`执行前后插入拦截代码

为了更形象的说明拦截器的执行过程，请看基于`proto`生成的以下代码[代码位置](https://github.com/bilibili/kratos-demo/blob/master/api/api.pb.go)：

```go
func _Demo_SayHello_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
    in := new(HelloReq)
    if err := dec(in); err != nil {
        return nil, err
    }
    if interceptor == nil {
        return srv.(DemoServer).SayHello(ctx, in)
    }
    info := &grpc.UnaryServerInfo{
        Server:     srv,
        FullMethod: "/demo.service.v1.Demo/SayHello",
    }
    handler := func(ctx context.Context, req interface{}) (interface{}, error) {
        return srv.(DemoServer).SayHello(ctx, req.(*HelloReq))
    }
    return interceptor(ctx, in, info, handler)
}
```

这个`_Demo_SayHello_Handler`方法是关键，该方法会被包装为`grpc.ServiceDesc`结构，被注册到 gRPC 内部，具体可在生成的`pb.go`代码内查找`s.RegisterService(&_Demo_serviceDesc, srv)`。

- 当`gRPC server`收到一次请求时，首先根据请求方法从注册到`server`内的`grpc.ServiceDesc`找到该方法对应的`Handler`如：`_Demo_SayHello_Handler`并执行
- `_Demo_SayHello_Handler`执行过程请看上面具体代码，当`interceptor`不为`nil`时，会将`SayHello`包装为`grpc.UnaryHandler`结构传递给`interceptor`

这样就完成了`UnaryServerInterceptor`的执行过程。那么`_Demo_SayHello_Handler`内的`interceptor`是如何注入到`gRPC server`内，则看下面这段代码[官方代码位置](https://github.com/grpc/grpc-go/blob/master/server.go)：

```go
// UnaryInterceptor returns a ServerOption that sets the UnaryServerInterceptor for the
// server. Only one unary interceptor can be installed. The construction of multiple
// interceptors (e.g., chaining) can be implemented at the caller.
func UnaryInterceptor(i UnaryServerInterceptor) ServerOption {
    return func(o *options) {
        if o.unaryInt != nil {
            panic("The unary server interceptor was already set and may not be reset.")
        }
        o.unaryInt = i
    }
}
```

请一定注意这方法的注释！！！

> Only one unary interceptor can be installed. The construction of multiple interceptors (e.g., chaining) can be implemented at the caller.

`gRPC`本身只支持一个`interceptor`，想要多`interceptors`需要自己实现~~所以`warden`基于`grpc.UnaryClientInterceptor`实现了`interceptor chain`，请看下面代码[代码位置](https://github.com/bilibili/kratos/blob/master/pkg/net/rpc/warden/server.go)：

```go
// Use attachs a global inteceptor to the server.
// For example, this is the right place for a rate limiter or error management inteceptor.
func (s *Server) Use(handlers ...grpc.UnaryServerInterceptor) *Server {
    finalSize := len(s.handlers) + len(handlers)
    if finalSize >= int(_abortIndex) {
        panic("warden: server use too many handlers")
    }
    mergedHandlers := make([]grpc.UnaryServerInterceptor, finalSize)
    copy(mergedHandlers, s.handlers)
    copy(mergedHandlers[len(s.handlers):], handlers)
    s.handlers = mergedHandlers
    return s
}

// interceptor is a single interceptor out of a chain of many interceptors.
// Execution is done in left-to-right order, including passing of context.
// For example ChainUnaryServer(one, two, three) will execute one before two before three, and three
// will see context changes of one and two.
func (s *Server) interceptor(ctx context.Context, req interface{}, args *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
    var (
        i     int
        chain grpc.UnaryHandler
    )

    n := len(s.handlers)
    if n == 0 {
        return handler(ctx, req)
    }

    chain = func(ic context.Context, ir interface{}) (interface{}, error) {
        if i == n-1 {
            return handler(ic, ir)
        }
        i++
        return s.handlers[i](ic, ir, args, chain)
    }

    return s.handlers[0](ctx, req, args, chain)
}
```

很简单的逻辑：

- `warden server`使用`Use`方法进行`grpc.UnaryServerInterceptor`的注入，而`func (s *Server) interceptor`本身就实现了`grpc.UnaryServerInterceptor`
- `func (s *Server) interceptor`可以根据注册的`grpc.UnaryServerInterceptor`顺序从前到后依次执行

而`warden`在初始化的时候将该方法本身注册到了`gRPC server`，在`NewServer`方法内可以看到下面代码：

```go
opt = append(opt, keepParam, grpc.UnaryInterceptor(s.interceptor))
s.server = grpc.NewServer(opt...)
```

如此完整的服务端拦截器逻辑就串联完成。

#### 客户端拦截器

让我们先看一下`grpc.UnaryClientInterceptor`的声明，[官方代码位置](https://github.com/grpc/grpc-go/blob/master/interceptor.go)：

```go
// UnaryInvoker is called by UnaryClientInterceptor to complete RPCs.
type UnaryInvoker func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, opts ...CallOption) error

// UnaryClientInterceptor intercepts the execution of a unary RPC on the client. invoker is the handler to complete the RPC
// and it is the responsibility of the interceptor to call it.
// This is an EXPERIMENTAL API.
type UnaryClientInterceptor func(ctx context.Context, method string, req, reply interface{}, cc *ClientConn, invoker UnaryInvoker, opts ...CallOption) error
```

看起来和服务端拦截器并没有什么太大的区别，比较简单包括：

- 一个`UnaryInvoker`表示客户端具体要发出的执行方法
- 一个`UnaryClientInterceptor`用于拦截`Invoker`方法，可在`Invoker`执行前后插入拦截代码

具体执行过程，请看基于`proto`生成的下面代码[代码位置](https://github.com/bilibili/kratos-demo/blob/master/api/api.pb.go)：

```go
func (c *demoClient) SayHello(ctx context.Context, in *HelloReq, opts ...grpc.CallOption) (*google_protobuf1.Empty, error) {
    out := new(google_protobuf1.Empty)
    err := grpc.Invoke(ctx, "/demo.service.v1.Demo/SayHello", in, out, c.cc, opts...)
    if err != nil {
        return nil, err
    }
    return out, nil
}
```

当客户端调用`SayHello`时可以看到执行了`grpc.Invoke`方法，并且将`fullMethod`和其他参数传入，最终会执行下面代码[官方代码位置](https://github.com/grpc/grpc-go/blob/master/call.go)：

```go
// Invoke sends the RPC request on the wire and returns after response is
// received.  This is typically called by generated code.
//
// All errors returned by Invoke are compatible with the status package.
func (cc *ClientConn) Invoke(ctx context.Context, method string, args, reply interface{}, opts ...CallOption) error {
    // allow interceptor to see all applicable call options, which means those
    // configured as defaults from dial option as well as per-call options
    opts = combine(cc.dopts.callOptions, opts)

    if cc.dopts.unaryInt != nil {
        return cc.dopts.unaryInt(ctx, method, args, reply, cc, invoke, opts...)
    }
    return invoke(ctx, method, args, reply, cc, opts...)
}
```

其中的`unaryInt`即为客户端连接创建时注册的拦截器，使用下面代码注册[官方代码位置](https://github.com/grpc/grpc-go/blob/master/dialoptions.go)：

```go
// WithUnaryInterceptor returns a DialOption that specifies the interceptor for
// unary RPCs.
func WithUnaryInterceptor(f UnaryClientInterceptor) DialOption {
    return newFuncDialOption(func(o *dialOptions) {
        o.unaryInt = f
    })
}
```

需要注意的是客户端的拦截器在官方`gRPC`内也只能支持注册一个，与服务端拦截器`interceptor chain`逻辑类似`warden`在客户端拦截器也做了相同处理，并且在客户端连接时进行注册，请看下面代码[代码位置](https://github.com/bilibili/kratos/blob/master/pkg/net/rpc/warden/client.go)：

```go
// Use attachs a global inteceptor to the Client.
// For example, this is the right place for a circuit breaker or error management inteceptor.
func (c *Client) Use(handlers ...grpc.UnaryClientInterceptor) *Client {
    finalSize := len(c.handlers) + len(handlers)
    if finalSize >= int(_abortIndex) {
        panic("warden: client use too many handlers")
    }
    mergedHandlers := make([]grpc.UnaryClientInterceptor, finalSize)
    copy(mergedHandlers, c.handlers)
    copy(mergedHandlers[len(c.handlers):], handlers)
    c.handlers = mergedHandlers
    return c
}

// chainUnaryClient creates a single interceptor out of a chain of many interceptors.
//
// Execution is done in left-to-right order, including passing of context.
// For example ChainUnaryClient(one, two, three) will execute one before two before three.
func (c *Client) chainUnaryClient() grpc.UnaryClientInterceptor {
    n := len(c.handlers)
    if n == 0 {
        return func(ctx context.Context, method string, req, reply interface{},
            cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
            return invoker(ctx, method, req, reply, cc, opts...)
        }
    }

    return func(ctx context.Context, method string, req, reply interface{},
        cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
        var (
            i            int
            chainHandler grpc.UnaryInvoker
        )
        chainHandler = func(ictx context.Context, imethod string, ireq, ireply interface{}, ic *grpc.ClientConn, iopts ...grpc.CallOption) error {
            if i == n-1 {
                return invoker(ictx, imethod, ireq, ireply, ic, iopts...)
            }
            i++
            return c.handlers[i](ictx, imethod, ireq, ireply, ic, chainHandler, iopts...)
        }

        return c.handlers[0](ctx, method, req, reply, cc, chainHandler, opts...)
    }
}
```

如此完整的客户端拦截器逻辑就串联完成。

#### 实现自己的拦截器

以服务端拦截器`logging`为例：

```go
// serverLogging warden grpc logging
func serverLogging() grpc.UnaryServerInterceptor {
    return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
        // NOTE: handler执行之前的拦截代码：主要获取一些关键参数，如耗时计时、ip等
        // 如果自定义的拦截器只需要在handler执行后，那么可以直接执行handler

        startTime := time.Now()
        caller := metadata.String(ctx, metadata.Caller)
        if caller == "" {
            caller = "no_user"
        }
        var remoteIP string
        if peerInfo, ok := peer.FromContext(ctx); ok {
            remoteIP = peerInfo.Addr.String()
        }
        var quota float64
        if deadline, ok := ctx.Deadline(); ok {
            quota = time.Until(deadline).Seconds()
        }

        // call server handler
        resp, err := handler(ctx, req) // NOTE: 以具体执行的handler为分界线！！！

        // NOTE: handler执行之后的拦截代码：主要进行耗时计算、日志记录
        // 如果自定义的拦截器在handler执行后不需要逻辑，这可直接返回

        // after server response
        code := ecode.Cause(err).Code()
        duration := time.Since(startTime)

        // monitor
        statsServer.Timing(caller, int64(duration/time.Millisecond), info.FullMethod)
        statsServer.Incr(caller, info.FullMethod, strconv.Itoa(code))
        logFields := []log.D{
            log.KVString("user", caller),
            log.KVString("ip", remoteIP),
            log.KVString("path", info.FullMethod),
            log.KVInt("ret", code),
            // TODO: it will panic if someone remove String method from protobuf message struct that auto generate from protoc.
            log.KVString("args", req.(fmt.Stringer).String()),
            log.KVFloat64("ts", duration.Seconds()),
            log.KVFloat64("timeout_quota", quota),
            log.KVString("source", "grpc-access-log"),
        }
        if err != nil {
            logFields = append(logFields, log.KV("error", err.Error()), log.KV("stack", fmt.Sprintf("%+v", err)))
        }
        logFn(code, duration)(ctx, logFields...)
        return resp, err
    }
}
```

#### 内置拦截器

##### 自适应限流拦截器

更多关于自适应限流的信息，请参考：kratos 自适应限流

```go
package grpc

import (
    pb "kratos-demo/api"
    "kratos-demo/internal/service"
    "github.com/bilibili/kratos/pkg/conf/paladin"
    "github.com/bilibili/kratos/pkg/net/rpc/warden"
    "github.com/bilibili/kratos/pkg/net/rpc/warden/ratelimiter"
)

// New new a grpc server.
func New(svc *service.Service) *warden.Server {
    var rc struct {
        Server *warden.ServerConfig
    }
    if err := paladin.Get("grpc.toml").UnmarshalTOML(&rc); err != nil {
        if err != paladin.ErrNotExist {
            panic(err)
        }
    }
    ws := warden.NewServer(rc.Server)

    // 挂载自适应限流拦截器到 warden server，使用默认配置
    limiter := ratelimiter.New(nil)
    ws.Use(limiter.Limit())

    // 注意替换这里：
    // RegisterDemoServer方法是在"api"目录下代码生成的
    // 对应proto文件内自定义的service名字，请使用正确方法名替换
    pb.RegisterDemoServer(ws.Server(), svc)

    ws, err := ws.Start()
    if err != nil {
        panic(err)
    }
    return ws
}
```

## reference

https://go-kratos.dev/docs/
