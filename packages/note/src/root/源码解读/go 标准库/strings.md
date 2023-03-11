# strings

提供一些字符串编辑操作，工具方法

## Reader

```go
type Reader struct {
  s        string    // Reader 读取的数据来源
  i        int // current reading index（当前读的索引位置）
  prevRune int // index of previous rune; or < 0（前一个读取的 rune 索引位置）
}
```

实现了 io.Reader（Read 方法），io.ReaderAt（ReadAt 方法），io.Seeker（Seek 方法），io.WriterTo（WriteTo 方法），io.ByteReader（ReadByte 方法），io.ByteScanner（ReadByte 和 UnreadByte 方法），io.RuneReader（ReadRune 方法） 和 io.RuneScanner（ReadRune 和 UnreadRune 方法）。

```go
func NewReader(s string) *Reader
```

bytes.NewBufferString 有类似的功能，不过，如果只是为了读取，NewReader 会更高效。

## Builder

```go
type Builder struct {
    addr *Builder // of receiver, to detect copies by value
    buf  []byte
}
```

实现了 io 包下的 Writer, ByteWriter, StringWriter 等接口，可以向该对象内写入数据，Builder 没有实现 Reader 等接口，所以该类型不可读，但提供了 String 方法可以获取对象内的数据。