# pool_conn

```go
// Pool memcache connection pool struct.
type Pool struct {
	p pool.Pool // 连接池的interface
	c *Config
}

// poolConn实现了memcache.go 的 Conn
type poolConn struct {
	c   Conn
	p   *Pool
	ctx context.Context
}

// Pool提供get方法返回poolConn也就是Conn interface的实现，返回了一个链接
func (p *Pool) Get(ctx context.Context) Conn {
	c, err := p.p.Get(ctx)
	p.connStat(err)
	if err != nil {
		return errConn{err}
	}
	c1, _ := c.(Conn)
	return &poolConn{p: p, c: c1, ctx: ctx}
}

// 连接池的实现pool.NewList，其中 conn.go中的Dial也就是连接池的New
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
	return
}
```
