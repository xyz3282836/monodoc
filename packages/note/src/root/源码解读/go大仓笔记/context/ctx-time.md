# context timeout

### client

```go
// d 为本地配置某个下游的超时时间，c为上游传递的ctx，比较后选小的
func (d Duration) Shrink(c context.Context) (Duration, context.Context, context.CancelFunc) {
	if deadline, ok := c.Deadline(); ok {
		if ctimeout := xtime.Until(deadline); ctimeout < xtime.Duration(d) {
			// 选小的
			return Duration(ctimeout), c, func() {}
		}
	}
	ctx, cancel := context.WithTimeout(c, xtime.Duration(d))
	return d, ctx, cancel
}
```

case1: 上游还剩下 400ms，本地默认250ms，则返回小的250ms

case2: 上游还剩下 200ms，本地默认250ms，则返回小的200ms

case3: 上游还剩下 600ms，本地配置450ms，则返回小的450ms

### server

```go
s.mutex.RLock()
conf := s.conf
s.mutex.RUnlock()
// get derived timeout from grpc context,
// compare with the warden configured,
// and use the minimum one
// warden配置的服务超时时间和ctx的超时时间，选择小的
timeout := time.Duration(conf.Timeout)
if dl, ok := ctx.Deadline(); ok {
  // ctimeout ctx还剩下的时间
	ctimeout := time.Until(dl)
  // -2ms ?
	if ctimeout-time.Millisecond*2 > 0 {
		ctimeout = ctimeout - time.Millisecond*2
	}
	if timeout > ctimeout {
		timeout = ctimeout
	}
}
ctx, cancel = context.WithTimeout(ctx, timeout)
defer cancel()
```

case: 上游还剩400ms，服务配置的800ms，则按照400ms超时来
