# group

缓存方法执行的结果

```go
// Group is a lazy load container.
type Group struct {
	new  func() interface{}
	objs sync.Map
	sync.RWMutex
}
// NewGroup news a group container.
func NewGroup(new func() interface{}) *Group {
	if new == nil {
		panic("container.group: can't assign a nil to the new function")
	}
	return &Group{
		new: new,
	}
}

// Get gets the object by the given key.
func (g *Group) Get(key string) interface{}
// Reset resets the new function and deletes all existing objects.
func (g *Group) Reset(new func() interface{})
// Clear deletes all objects.
func (g *Group) Clear()
```

