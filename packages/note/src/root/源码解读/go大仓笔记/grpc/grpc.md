# GRPC

## grpc官方库

定义了两个interface：Resolver和Builder

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

## B站实现

### warden目录

定义了warden.Resolver，warden.Builder两个结构体

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

warden.Resolver实现了`GRPC.Resolver`，也包含name.Resolver接口，这里可以传递name.Resolver的实现，比如name/discovery里Discovery对象

warden.Builder实现了`GRPC.Builder.Build`，唯一包含naming.Builder接口，这里可以传递naming.Builder的实现，比如name/discovery里Discovery对象

warden中NewClient传递的就是Discovery对象，并且调用了grpc.resolver.Register注册了Discovery对象；然后grpc中在DialContext会最终调用`Build(target Target, cc ClientConn, opts BuildOptions) (Resolver, error)`方法（调用链路详见后面分析），如下Build方法实现中创建warden.Resolver对象，其中warden.Resolver.nr就是Discovery对象，调用`Build(appid string, opts ...naming.BuildOpt) naming.Resolver`创建的name/discovery Resolver对象（包含了Discovery对象），然后在方法中会最终调用name/discovery Discovery的polls和Fetch方法

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

往grpc注册discovery实现实例

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

target格式

client.Dial => warden.Dial => warden.dial => grpc.DialContext => grpc.newCCResolverWrapper 此处会拿到 resolverBuilder，就是从上一步grpc.resolver.m通过grpc.ClientConn.target，格式为[scheme]://[authority]/endpoint，解析出scheme为"discovery"  => grpc.resolver.Builder.Build => name/discovery Discovery.Build => name/discovery Discovery.serverproc(=>name/discovery Discovery.polls) && 创建了name/discovery Resolver对象(=>name/discovery Resolver.updateproc => name/discovery Resolver.nr也就是name/discovery Discovery.Fetch)

```go
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
  // Build the resolver.
	rWrapper, err := newCCResolverWrapper(cc, resolverBuilder)
	...
}
// 这里 newCCResolverWrapper 调用

func newCCResolverWrapper(cc *ClientConn, rb resolver.Builder) (*ccResolverWrapper, error) {
	...
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

所以 name.Discovery 调用Build 方法可以创建name.Discovery.Resolver