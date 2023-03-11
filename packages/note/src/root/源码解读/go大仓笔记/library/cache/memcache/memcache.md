# Memcache

```go
// Memcache主体结构
type Memcache struct {
	pool *Pool // pool_conn.go 中的Pool
}
func New(cfg *Config) *Memcache {
	return &Memcache{pool: NewPool(cfg)} // pool_conn.go 中的NewPool方法
}


type Conn interface {
	Close() error
	Err() error
	Add(item *Item) error
	Set(item *Item) error
	Replace(item *Item) error
	Get(key string) (*Item, error)
	GetMulti(keys []string) (map[string]*Item, error)
	Delete(key string) error
	Increment(key string, delta uint64) (newValue uint64, err error)
	Decrement(key string, delta uint64) (newValue uint64, err error)
	CompareAndSwap(item *Item) error
	Touch(key string, seconds int32) (err error)
	Scan(item *Item, v interface{}) (err error)
	AddContext(ctx context.Context, item *Item) error
	SetContext(ctx context.Context, item *Item) error
	ReplaceContext(ctx context.Context, item *Item) error
	GetContext(ctx context.Context, key string) (*Item, error)
	GetMultiContext(ctx context.Context, keys []string) (map[string]*Item, error)
	DeleteContext(ctx context.Context, key string) error
	IncrementContext(ctx context.Context, key string, delta uint64) (newValue uint64, err error)
	DecrementContext(ctx context.Context, key string, delta uint64) (newValue uint64, err error)
	CompareAndSwapContext(ctx context.Context, item *Item) error
	TouchContext(ctx context.Context, key string, seconds int32) (err error)
}
```





