# GRPC

## grpc 服务发现

定义了两个 interface：Resolver 和 Builder

```go
// Resolver watches for the updates on the specified target.
// Updates include address updates and service config updates.
type Resolver interface {
	// ResolveNow will be called by gRPC to try to resolve the target name
	// again. It's just a hint, resolver can ignore this if it's not necessary.
	//
	// It could be called multiple times concurrently.
	ResolveNow(ResolveNowOptions)
	// Close closes the resolver.
	Close()
}

// Builder creates a resolver that will be used to watch name resolution updates.
type Builder interface {
	// Build creates a new resolver for the given target.
	//
	// gRPC dial calls Build synchronously, and fails if the returned error is
	// not nil.
	Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)
	// Scheme returns the scheme supported by this resolver.
	// Scheme is defined at https://github.com/grpc/grpc/blob/master/doc/naming.md.
	Scheme() string
}
```

## B 站实现

### warden 目录

定义了 warden.Resolver，warden.Builder 两个结构体

```go
// 实现了grpc.Resolver接口
type Resolver struct {
  nr   naming.Resolver // 实现有 name/discovery Resolver结构，包含了Discovery结构
	cc   resolver.ClientConn // grpc的interface
	quit chan struct{}

	zone string
}

// 实现了GRPC.Builder.Build方法
type Builder struct {
	naming.Builder // 实现有 name/discovery Discovery结构
}
```

warden.Resolver 实现了`GRPC.Resolver`，也包含 name.Resolver 接口，这里可以传递 name.Resolver 的实现，比如 name/discovery 里 Discovery 对象

warden.Builder 实现了`GRPC.Builder.Build`，唯一包含 naming.Builder 接口，这里可以传递 naming.Builder 的实现，比如 name/discovery 里 Discovery 对象

warden 中 NewClient 传递的就是 Discovery 对象，并且调用了 grpc.resolver.Register 注册了 Discovery 对象；然后 grpc 中在 DialContext 会最终调用`Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)`方法（调用链路详见后面分析），如下 Build 方法实现中创建 warden.Resolver 对象，其中 warden.Resolver.nr 就是 Discovery 对象，调用`Build(appid string, opts ...naming.BuildOpt) naming.Resolver`创建的 name/discovery Resolver 对象（包含了 Discovery 对象），然后在方法中会最终调用 name/discovery Discovery 的 polls 和 Fetch 方法

```go
// Build returns itself for Resolver, because it's both a builder and a resolver.
func (b *Builder) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
	var zone = env.Zone
	ss := int64(50)
	clusters := map[string]struct{}{}
	str := strings.SplitN(target.Endpoint, "?", 2)
	if len(str) == 0 {
		return nil, errors.Errorf("resolver: parse target.Endpoint(%s) failed!err:=endpoint is empty", target.Endpoint)
	} else if len(str) == 2 {
		m, err := url.ParseQuery(str[1])
		if err == nil {
			for _, c := range m[naming.MetaCluster] {
				clusters[c] = struct{}{}
			}
			zones := m[naming.MetaZone]
			if len(zones) > 0 {
				zone = zones[0]
			}
			if sub, ok := m["subset"]; ok {
				if t, err := strconv.ParseInt(sub[0], 10, 32); err == nil {
					ss = t
				}

			}
		}
	}
	r := &Resolver{
		nr:   b.Builder.Build(str[0], naming.Filter(Scheme, clusters), naming.ScheduleNode(zone), naming.Subset(int(ss))),
		cc:   cc,
		quit: make(chan struct{}, 1),
		zone: zone,
	}
	go r.updateproc()
	return r, nil
}

// 这里的 b.Builder.Build => Discovery.serverproc => Discovery.poll => http 请求 http://%s/discovery/polls grpc服务实例节点信息

// 这里的 r.updateproc =>
```

整个链路：

client 端

```go
	// 客户端 new 目标grpc服务的client
	if cfg == nil {
		cfg = &warden.ClientConfig{NonBlock: true}
	} else {
		cfg.NonBlock = true
	}
	client := warden.NewClient(cfg, opts...)
	conn, err := client.Dial(context.Background(), "discovery://default/"+"live.live.online-allliving")
	if err != nil {
		return
	}
	cli = &Client{
		AllLivingClient: v1.NewAllLivingClient(conn),
		MaxIdClient: v1.NewMaxIdClient(conn),
	}
```

两点，第一

往 grpc 注册 discovery 实现实例

warden.NewClient => warden.resolver.Register(discovery.Builder()) => grpc.resolver.Register(name/discovery Discovery) => grpc.resolver.m[discovery.Scheme()]=name/discovery Discovery

```go
client := warden.NewClient(cfg, opts...)
// 这里 warden.NewClient调用

func NewClient(conf *ClientConfig, opt ...grpc.DialOption) *Client {
  // 这里就是new name.discovery 的实现
	resolver.Register(discovery.Builder())
	c := new(Client)
	if err := c.SetConfig(conf); err != nil {
		panic(err)
	}
	c.Use(abtest.UnaryClientInterceptor()) // TODO(luhao02): move to component
	c.Use(auroragrpc.UnaryClientInterceptor())
	c.UseOpt(grpc.WithDefaultServiceConfig(fmt.Sprintf(`{"loadBalancingPolicy":"%s"}`, p2c.Name)))
	c.UseOpt(opt...)
	return c
}
```

第二

target 格式

client.Dial => warden.Dial => warden.dial => grpc.DialContext => grpc.newCCResolverWrapper

此处会拿到 resolverBuilder

就是从上一步 grpc.resolver.m 通过 grpc.ClientConn.target，格式为[scheme]://[authority]/endpoint

解析出 scheme 为"discovery" => grpc.resolver.Builder.Build => name/discovery Discovery.Build => name/discovery Discovery.serverproc(=>name/discovery Discovery.polls) && 创建了 name/discovery Resolver 对象(=>name/discovery Resolver.updateproc => name/discovery Resolver.nr 也就是 name/discovery Discovery.Fetch)

```go
// 返回的conn是*grpc.ClientConn
conn, err := client.Dial(context.Background(), "discovery://default/"+"live.live.online-allliving")
// 这里 client.Dial 调用

// Dial creates a client connection to the given target.
// Target format is scheme://authority/endpoint?query_arg=value
// example: discovery://default/account.account.service?cluster=shfy01&cluster=shfy02
func (c *Client) Dial(ctx context.Context, target string, opts ...grpc.DialOption) (conn *grpc.ClientConn, err error) {
	opts = append(opts, grpc.WithInsecure())
	return c.dial(ctx, target, opts...)
}
// 这里 c.dial 调用

func (c *Client) dial(ctx context.Context, target string, opts ...grpc.DialOption) (conn *grpc.ClientConn, err error) {
 	...
  if conn, err = grpc.DialContext(ctx, target, dialOptions...); err != nil {
		fmt.Fprintf(os.Stderr, "warden client: dial %s error %v!", target, err)
	}
  ...
}
// 这里 grpc.DialContext 调用了grpc 官方库

func DialContext(ctx context.Context, target string, opts ...DialOption) (conn *ClientConn, err error) {
  ...
  // Determine the resolver to use.
  // 这里target就是[scheme]://[authority]/endpoint，后面通过name/discovery Discovery的实现grpc.resolver.Builder.Build方法获取字符串discovery，通过resolver包下Get方法获取到前面注册的name/discovery Discovery的实例
	resolverBuilder, err := cc.parseTargetAndFindResolver()
  ...
  ...func (cc *ClientConn) parseTargetAndFindResolver() (resolver.Builder, error) {
    		...
    		rb = cc.getResolver(parsedTarget.URL.Scheme)
    		...
  	 }
	...
  // Build the resolver.
  // 将我们自己实现的Resolver（name/discovery Discovery）包裹进去，里面会调用我们实现的Build
	rWrapper, err := newCCResolverWrapper(cc, resolverBuilder)
	...
}
// 这里 newCCResolverWrapper 调用

func newCCResolverWrapper(cc *ClientConn, rb resolver.Builder) (*ccResolverWrapper, error) {
	...
  // 调用我们自己实现的Build方法
  // 第二个参数cc ClientConn，不是最前面的conn，而是个interface，newCCResolverWrapper方法的返回值ccResolverWrapper实现了这个interface
  // 返回值ccr.resolver是name/discovery Resolver实例
  ccr.resolver, err = rb.Build(cc.parsedTarget, ccr, rbo)
  ...
}
```

### naming

定义了三个接口

```go
// Resolver resolve naming service
type Resolver interface {
	Fetch(context.Context) (map[string][]*Instance, bool)
	//Unwatch(id string)
	Watch() <-chan struct{}
	Close() error
}

// Registry Register an instance and renew automatically
type Registry interface {
	Register(context.Context, *Instance) (context.CancelFunc, error)
	Close() error
}

// Builder resolver builder.
type Builder interface {
	Build(id string, options ...BuildOpt) Resolver
	Scheme() string
}
```

name.Discovery 实现了 name.Registry 和 name.Builder

```go
// Discovery is discovery client.
type Discovery struct {
	once       sync.Once
	conf       *Config
	ctx        context.Context
	cancelFunc context.CancelFunc
	httpClient *bm.Client

	mutex       sync.RWMutex
	apps        map[string]*appInfo
	registry    map[string]struct{}
	lastHost    string
	cancelPolls context.CancelFunc
	idx         uint64
	node        atomic.Value
	delete      chan *appInfo
	close       int64
}

// Resolver discveory resolver.
type Resolver struct {
	id    string
	event chan struct{}
	d     *Discovery
	opt   *naming.BuildOptions
}
```

name.Discovery.Resolver 实现了 name.Resolver

所以 name.Discovery 调用 Build 方法可以创建 name.Discovery.Resolver

## grpc 负载均衡

要想实现自定义的Balancer的话，就必须要实现grpc.balancer.Builder接口

```go
// Builder creates a balancer.
type Builder interface {
	// Build creates a new balancer with the ClientConn.
	Build(cc ClientConn, opts BuildOptions) Balancer
	// Name returns the name of balancers built by this builder.
	// It will be used to pick balancers (for example in service config).
	Name() string
}

// Build方法返回的接口
type Balancer interface {
	// UpdateClientConnState is called by gRPC when the state of the ClientConn
	// changes.  If the error returned is ErrBadResolverState, the ClientConn
	// will begin calling ResolveNow on the active name resolver with
	// exponential backoff until a subsequent call to UpdateClientConnState
	// returns a nil error.  Any other errors are currently ignored.
	UpdateClientConnState(ClientConnState) error
	// ResolverError is called by gRPC when the name resolver reports an error.
	ResolverError(error)
	// UpdateSubConnState is called by gRPC when the state of a SubConn
	// changes.
	UpdateSubConnState(SubConn, SubConnState)
	// Close closes the balancer. The balancer is not required to call
	// ClientConn.RemoveSubConn for its existing SubConns.
	Close()
}

// 第一个参数是interface
// ClientConn represents a gRPC ClientConn.
//
// This interface is to be implemented by gRPC. Users should not need a
// brand new implementation of this interface. For the situations like
// testing, the new implementation should embed this interface. This allows
// gRPC to add new methods to this interface.
type ClientConn interface {
	// NewSubConn is called by balancer to create a new SubConn.
	// It doesn't block and wait for the connections to be established.
	// Behaviors of the SubConn can be controlled by options.
	NewSubConn([]resolver.Address, NewSubConnOptions) (SubConn, error)
	// RemoveSubConn removes the SubConn from ClientConn.
	// The SubConn will be shutdown.
	RemoveSubConn(SubConn)
	// UpdateAddresses updates the addresses used in the passed in SubConn.
	// gRPC checks if the currently connected address is still in the new list.
	// If so, the connection will be kept. Else, the connection will be
	// gracefully closed, and a new connection will be created.
	//
	// This will trigger a state transition for the SubConn.
	UpdateAddresses(SubConn, []resolver.Address)

	// UpdateState notifies gRPC that the balancer's internal state has
	// changed.
	//
	// gRPC will update the connectivity state of the ClientConn, and will call
	// Pick on the new Picker to pick new SubConns.
	UpdateState(State)

	// ResolveNow is called by balancer to notify gRPC to do a name resolving.
	ResolveNow(resolver.ResolveNowOptions)

	// Target returns the dial target for this ClientConn.
	//
	// Deprecated: Use the Target field in the BuildOptions instead.
	Target() string
}
```
