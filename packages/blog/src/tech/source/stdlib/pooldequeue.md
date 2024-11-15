---
title: "pooldequeue--double-ended queue"
date: 2024-11-13 22:40:00 +8
category: 技术
tag:
  - go lib
  - double-ended queue
---

## pooldequeue

设计比较巧妙，单协程生产，多协程消费

主要结构体定义如下，其中vals长度必须为2的N次幂

```go
type poolDequeue struct {
	// headTail packs together a 32-bit head index and a 32-bit
	// tail index. Both are indexes into vals modulo len(vals)-1.
	//
	// tail = index of oldest data in queue
	// head = index of next slot to fill
	//
	// Slots in the range [tail, head) are owned by consumers.
	// A consumer continues to own a slot outside this range until
	// it nils the slot, at which point ownership passes to the
	// producer.
	//
	// The head index is stored in the most-significant bits so
	// that we can atomically add to it and the overflow is
	// harmless.
	headTail uint64

	// vals is a ring buffer of interface{} values stored in this
	// dequeue. The size of this must be a power of 2.
	//
	// vals[i].typ is nil if the slot is empty and non-nil
	// otherwise. A slot is still in use until *both* the tail
	// index has moved beyond it and typ has been set to nil. This
	// is set to nil atomically by the consumer and read
	// atomically by the producer.
	vals []eface
}
```

headTail是一个uint64，可以unpack成为head和tail，起始值一样，当head增长的时候，和tail就会形成差值，差值为0就是队列为空，也就是tail追上了head的增长进度的时候，比如起始状态，

```go
if tail == head {
	// Queue is empty.
	return nil, false
}
```

当差值为val的len长度时，表示队列满了

```go
if (tail+uint32(len(d.vals)))&(1<<dequeueBits-1) == head {
	fmt.Printf("pushHead head:%d %b tail:%d %b vals:%v and Queue is full and ", head, head, tail, tail, d.vals)
	// Queue is full.
	return false
}
```

vals为存放目标数据的固定数组，其中最核心的就是存放数据在数组中的索引，这个索引分为两个：

一个为head新增索引

```go
slot := &d.vals[head&uint32(len(d.vals)-1)]
```

新增的时候为

```go
atomic.AddUint64(&headTail, 1<<dequeueBits)
```

这里主要是直接给高位head添加1，实际增加`1<<dequeueBits`

一个为tail删除索引

```go
slot = &d.vals[tail&uint32(len(d.vals)-1)]
```

tail的增长目的就是pop目标数据了，新增的时候为

```go
ptrs2 := d.pack(head, tail+1)
if atomic.CompareAndSwapUint64(&d.headTail, ptrs, ptrs2) {
	// Success.
	slot = &d.vals[tail&uint32(len(d.vals)-1)]
	break
}
```

由于tail为地位，可以直接加1

两个索引本质是数据队列的头和尾的索引，tail落后于head的增长，所以也就可以实现从head开始增加的地方pop目标数据，巧妙的实现了头增加尾部减少的目标

另外，索引是可以循环的

```go
func Test_Pool(t *testing.T) {
  var headTail uint64
	vallen := 1 << 7
	for i := 0; i < 400; i++ {
		head, _ := unpack(headTail)
		index := head & uint32(vallen-1)
		fmt.Printf("index:%d %b\n", index, index)
		atomic.AddUint64(&headTail, 1<<dequeueBits)
	}
}
```

从0->vallen-1，再回到0，0->vallen-1不停循环

这个队列的大小是 2 的幂次方，这样可以用 `&` 来取模，而不用 `%`，这样可以提高性能。

测试代码：https://github.com/xyz3282836/gostd

## reference

[https://mp.weixin.qq.com/s/fj87oGZPkFKQiGZxhrYRVQ](https://mp.weixin.qq.com/s/fj87oGZPkFKQiGZxhrYRVQ)
