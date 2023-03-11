# 主要思路

> 注意，plan9 和 intel 汇编指令不同

replacefunc 替换 rawfunc

## 全局

先不区分协程，全局生效，虽然会有很多问题

先找到 replacefunc 和 rawfunc 内存地址，

```go
replacefuncReflectValue = reflect.ValueOf(replacefunc) // 获取reflect.Value
replacefuncPtr := uintprt(unsate.Pointer(&replacefuncReflectValue))//??
// replacefunc 内存地址做处理，
func jmp(to uintptr) []byte {
  return []byte{
    0x48, 0xBA,     // movabs rdx
    byte(to),
    byte(to >> 8),
    byte(to >> 16),
    byte(to >> 24),
    byte(to >> 32),
    byte(to >> 40),
    byte(to >> 48),
    byte(to >> 56), // movabs rdx,to
    0xFF, 0xE2,     // jmp rdx
  }
}
```
