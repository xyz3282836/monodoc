# bytes

## Reader 

```go
type Reader struct {
    s        []byte
    i        int64 // 当前读取下标
    prevRune int   // 前一个字符的下标，也可能 < 0
}
```

bytes 包下的 Reader 类型实现了 io 包下的 Reader, ReaderAt, RuneReader, RuneScanner, ByteReader, ByteScanner, ReadSeeker, Seeker, WriterTo 等多个接口。主要用于 Read 数据。

```go
func NewReader(b []byte) *Reader
```



```go
// 读取数据至 b 
func (r *Reader) Read(b []byte) (n int, err error) 
// 读取一个字节
func (r *Reader) ReadByte() (byte, error)
// 读取一个字符
func (r *Reader) ReadRune() (ch rune, size int, err error)
// 读取数据至 w
func (r *Reader) WriteTo(w io.Writer) (n int64, err error)
// 进度下标指向前一个字节，如果 r.i <= 0 返回错误。
func (r *Reader) UnreadByte() 
// 进度下标指向前一个字符，如果 r.i <= 0 返回错误，且只能在每次 ReadRune 方法后使用一次，否则返回错误。
func (r *Reader) UnreadRune() 
// 读取 r.s[off:] 的数据至b，该方法忽略进度下标 i，不使用也不修改。
func (r *Reader) ReadAt(b []byte, off int64) (n int, err error) 
// 根据 whence 的值，修改并返回进度下标 i ，当 whence == 0 ，进度下标修改为 off，当 whence == 1 ，进度下标修改为 i+off，当 whence == 2 ，进度下标修改为 len[s]+off.
// off 可以为负数，whence 的只能为 0，1，2，当 whence 为其他值或计算后的进度下标越界，则返回错误。
func (r *Reader) Seek(offset int64, whence int) (int64, error)
```

## Buffer

该类型实现了 io 包下的 ByteScanner, ByteWriter, ReadWriter, Reader, ReaderFrom, RuneReader, RuneScanner, StringWriter, Writer, WriterTo 等接口，可以方便的进行读写操作。

```go
// 读取到字节 delim 后，以字节数组的形式返回该字节及前面读取到的字节。如果遍历 b.buf 也找不到匹配的字节，则返回错误(一般是 EOF)
func (b *Buffer) ReadBytes(delim byte) (line []byte, err error)
// 读取到字节 delim 后，以字符串的形式返回该字节及前面读取到的字节。如果遍历 b.buf 也找不到匹配的字节，则返回错误(一般是 EOF)
func (b *Buffer) ReadString(delim byte) (line string, err error)
// 截断 b.buf , 舍弃 b.off+n 之后的数据。n == 0 时，调用 Reset 方法重置该对象，当 n 越界时（n < 0 || n > b.Len() ）方法会触发 panic.
func (b *Buffer) Truncate(n int)
```