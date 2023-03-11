# IO

主要四个核心 interface

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
type Writer interface {
	Write(p []byte) (n int, err error)
}
type Closer interface {
	Close() error
}
type Seeker interface {
	Seek(offset int64, whence int) (int64, error)
}

```

包含以上四个的组合

- os.File 同时实现了 io.Reader 和 io.Writer
- strings.Reader 实现了 io.Reader
- bufio.Reader/Writer 分别实现了 io.Reader 和 io.Writer
- bytes.Buffer 同时实现了 io.Reader 和 io.Writer
- bytes.Reader 实现了 io.Reader
- compress/gzip.Reader/Writer 分别实现了 io.Reader 和 io.Writer
- crypto/cipher.StreamReader/StreamWriter 分别实现了 io.Reader 和 io.Writer
- crypto/tls.Conn 同时实现了 io.Reader 和 io.Writer
- encoding/csv.Reader/Writer 分别实现了 io.Reader 和 io.Writer
- mime/multipart.Part 实现了 io.Reader
- net/conn 分别实现了 io.Reader 和 io.Writer(Conn 接口定义了 Read/Write)

```go
type ReaderFrom interface {
	ReadFrom(r Reader) (n int64, err error)
}
type WriterTo interface {
	WriteTo(w Writer) (n int64, err error)
}
type ReaderAt interface {
	ReadAt(p []byte, off int64) (n int, err error)
}
type WriterAt interface {
	WriteAt(p []byte, off int64) (n int, err error)
}

```

```
type ByteReader interface {
   ReadByte() (byte, error)
}
type ByteWriter interface {
	WriteByte(c byte) error
}

type RuneReader interface {
	ReadRune() (r rune, size int, err error)
}
type StringWriter interface {
	WriteString(s string) (n int, err error)
}
```

提供了一些方法

```go
func WriteString(w Writer, s string) (n int, err error)

func ReadAtLeast(r Reader, buf []byte, min int) (n int, err error)

func ReadFull(r Reader, buf []byte) (n int, err error) {
	return ReadAtLeast(r, buf, len(buf))
}


func CopyN(dst Writer, src Reader, n int64) (written int64, err error)
func Copy(dst Writer, src Reader) (written int64, err error)
func CopyBuffer(dst Writer, src Reader, buf []byte)


```
