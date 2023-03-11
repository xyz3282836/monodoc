# mc

Memcache 主体结构，其中有 Pool 结构，相当于包了一层，主张使用主体结构。

```go
type Memcache struct {
	pool *Pool
}
```

Pool 结构中有 pool.Pool，其实是连接池的 interface，mc 中使用 pool.NewList 来实现，也就是链表的实现，同时还有个 slice 的实现。

```go
type Pool struct {
	p pool.Pool // 连接池的接口，实际mc使用list来实现
	c *Config
}
func NewPool(cfg *Config) (p *Pool) {
	if cfg.DialTimeout <= 0 || cfg.ReadTimeout <= 0 || cfg.WriteTimeout <= 0 {
		panic("must config memcache timeout")
	}
	p1 := pool.NewList(cfg.Config)
	cnop := DialConnectTimeout(time.Duration(cfg.DialTimeout))
	rdop := DialReadTimeout(time.Duration(cfg.ReadTimeout))
	wrop := DialWriteTimeout(time.Duration(cfg.WriteTimeout))
	p1.New = func(ctx context.Context) (io.Closer, error) {
		conn, err := Dial(cfg.Proto, cfg.Addr, cnop, rdop, wrop)
		return newTraceConn(conn, fmt.Sprintf("%s://%s", cfg.Proto, cfg.Addr)), err
	}
	p = &Pool{p: p1, c: cfg}
}
```

NewPool 中，pool.Pool 由 pool.NewList 实现，也就是 pool 中 list 实现，list 中的 New 是个生成连接的方法，New 由 newTraceConn 实现，第一个参数是 Conn 接口的实现，由 Dial 实现

```go
// Dial connects to the Memcache server at the given network and
// address using the specified options.
func Dial(network, address string, options ...DialOption) (Conn, error) {
	do := dialOptions{
		dial: net.Dial,
	}
	for _, option := range options {
		option.f(&do)
	}
	netConn, err := do.dial(network, address)
	if err != nil {
		return nil, pkgerr.WithStack(err)
	}
	pconn, err := newASCIIConn(netConn, do.readTimeout, do.writeTimeout)
	return &conn{pconn: pconn, ed: newEncodeDecoder()}, nil
}
// 实现了Conn接口
type conn struct {
	// low level connection.
	pconn protocolConn// 由newASCIIConn方法返回的asiiConn的结构实现
	ed    *encodeDecode
}

// low level connection that implement memcache protocol provide basic operation.
type protocolConn interface {
	Populate(ctx context.Context, cmd string, key string, flags uint32, expiration int32, cas uint64, data []byte) error
	Get(ctx context.Context, key string) (*Item, error)
	GetMulti(ctx context.Context, keys ...string) (map[string]*Item, error)
	Touch(ctx context.Context, key string, expire int32) error
	IncrDecr(ctx context.Context, cmd, key string, delta uint64) (uint64, error)
	Delete(ctx context.Context, key string) error
	Close() error
	Err() error
}
```

**Dial 返回 conn 结构**，其中 conn 结构中的 protocolConn 是个 interface，需要实现，由 newASCIIConn 方法实现，其中第一个参数是 net.Conn，由 net.Dial(go sdk)方法返回；newASCIIConn 方法返回的 asiiConn 实现了 protocolConn 接口；而 conn 结构实现了 Conn 接口

```go
// newConn returns a new memcache connection for the given net connection.
func newASCIIConn(netConn net.Conn, readTimeout, writeTimeout time.Duration) (protocolConn, error) {
	if writeTimeout <= 0 || readTimeout <= 0 {
		return nil, pkgerr.Errorf("readTimeout writeTimeout can't be zero")
	}
	c := &asiiConn{
		conn: netConn,
		rw: bufio.NewReadWriter(bufio.NewReader(netConn),
			bufio.NewWriter(netConn)),
		readTimeout:  readTimeout,
		writeTimeout: writeTimeout,
	}
	return c, nil
}
var _ protocolConn = &asiiConn{}
// asiiConn is the low-level implementation of Conn
type asiiConn struct {
	err  error
	conn net.Conn
	// Read & Write
	readTimeout  time.Duration
	writeTimeout time.Duration
	rw           *bufio.ReadWriter
}
```

回到 NewPool 方法，其中 New 由 newTraceConn 实现，第一个参数由 Dial 方法返回了 Conn 的实现

```go
func newTraceConn(conn Conn, address string) Conn {
	tags := []trace.Tag{
		trace.SpanKindClientTag,
		trace.String(trace.TagComponent, "cache/memcache"),
		trace.String(trace.TagPeerService, "memcache"),
		trace.String(trace.TagPeerAddress, address),
	}
	return &traceConn{Conn: conn, tags: tags}
}
type traceConn struct {
	Conn
	tags []trace.Tag
}
```

traceConn 中的 Conn 实际是 Dial 的返回 Conn 的实现
