# conn

```go
type conn struct {
	// low level connection.
	pconn protocolConn // 需要
	ed    *encodeDecode
}
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
  // 调用ascii_conn.go 中的newASCIIConn返回protocolConn 接口的实现
	pconn, err := newASCIIConn(netConn, do.readTimeout, do.writeTimeout)
	return &conn{pconn: pconn, ed: newEncodeDecoder()}, nil
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
