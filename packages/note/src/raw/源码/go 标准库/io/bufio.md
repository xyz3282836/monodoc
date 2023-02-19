# bufio

Package bufio implements buffered I/O. It wraps an io.Reader or io.Writer object, creating another object (Reader or Writer) that also implements the interface but provides buffering and some help for textual I/O.

```go
// Buffered input.

// Reader implements buffering for an io.Reader object.
type Reader struct {
   buf          []byte
   rd           io.Reader // reader provided by the client
   r, w         int       // buf read and write positions
   err          error
   lastByte     int // last byte read for UnreadByte; -1 means invalid
   lastRuneSize int // size of last rune read for UnreadRune; -1 means invalid
}
```



```go
// buffered output

// Writer implements buffering for an io.Writer object.
// If an error occurs writing to a Writer, no more data will be
// accepted and all subsequent writes, and Flush, will return the error.
// After all data has been written, the client should call the
// Flush method to guarantee all data has been forwarded to
// the underlying io.Writer.
type Writer struct {
   err error
   buf []byte
   n   int
   wr  io.Writer
}
```



```go
// buffered input and output

// ReadWriter stores pointers to a Reader and a Writer.
// It implements io.ReadWriter.
type ReadWriter struct {
   *Reader
   *Writer
}
```

## scanner

本身也是个reader

```
// Scanner provides a convenient interface for reading data such as
// a file of newline-delimited lines of text. Successive calls to
// the Scan method will step through the 'tokens' of a file, skipping
// the bytes between the tokens. The specification of a token is
// defined by a split function of type SplitFunc; the default split
// function breaks the input into lines with line termination stripped. Split
// functions are defined in this package for scanning a file into
// lines, bytes, UTF-8-encoded runes, and space-delimited words. The
// client may instead provide a custom split function.
//
// Scanning stops unrecoverably at EOF, the first I/O error, or a token too
// large to fit in the buffer. When a scan stops, the reader may have
// advanced arbitrarily far past the last token. Programs that need more
// control over error handling or large tokens, or must run sequential scans
// on a reader, should use bufio.Reader instead.
//
type Scanner struct {
   r            io.Reader // The reader provided by the client.
   split        SplitFunc // The function to split the tokens.
   maxTokenSize int       // Maximum size of a token; modified by tests.
   token        []byte    // Last token returned by split.
   buf          []byte    // Buffer used as argument to split.
   start        int       // First non-processed byte in buf.
   end          int       // End of data in buf.
   err          error     // Sticky error.
   empties      int       // Count of successive empty tokens.
   scanCalled   bool      // Scan has been called; buffer is in use.
   done         bool      // Scan has finished.
}
```