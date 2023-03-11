# ascii_conn
```go
// asiiConn is the low-level implementation of Conn
// 实现了conn.go的protocolConn interface
type asiiConn struct {
	err  error
	conn net.Conn
	// Read & Write
	readTimeout  time.Duration
	writeTimeout time.Duration
	rw           *bufio.ReadWriter
}

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
```

