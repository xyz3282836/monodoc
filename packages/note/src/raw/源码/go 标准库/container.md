# container

## list

双向链表

```go
// Element is an element of a linked list.
type Element struct {
	// Next and previous pointers in the doubly-linked list of elements.
	// To simplify the implementation, internally a list l is implemented
	// as a ring, such that &l.root is both the next element of the last
	// list element (l.Back()) and the previous element of the first list
	// element (l.Front()).
	next, prev *Element

	// The list to which this element belongs.
	list *List

	// The value stored with this element.
	Value interface{}
}
```

root 根节点不放数据，外部无法获取root节点信息

使用上非环，内部实现其实是环

## ring

operations on circular lists

```go
type Ring struct {
	next, prev *Ring
	Value      interface{} // for use by client; untouched by this library
}
```

双向链表，环

可unlink，link，move，do

## heap

包含sort.Interface: Less() Len() Swap() ,加上自己的interface: Pop(),Push()



