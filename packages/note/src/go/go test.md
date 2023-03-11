# go test

```go
func BenchmarkGetPrimes(b *testing.B) {
    for i := 0; i < b.N; i++ {
        GetPrimes(1000)
    }
}
```

```shell
$ go test -bench=. -run=^$  lesson2/article10/main
goos: darwin
goarch: amd64
pkg: lesson2/article10/main
BenchmarkGetPrimes-8      312973              3307 ns/op
PASS
ok      lesson2/article10/main  1.082s
-bench=.，只有有了这个标记，命令才会进行性能测试，.表示需要执行任意名称的性能测试函数。
-run=^$，这个标记用于表明需要执行哪些功能测试函数，值^$意味着：只执行名称为空的功能测试函数，换句话说，不执行任何功能测试函数。

BenchmarkGetPrimes-8被称为单个性能测试的名称，它表示命令执行了性能测试函数BenchmarkGetPrimes，并且当时所用的最大 P 数量为8。最大 P 数量相当于可以同时运行 goroutine 的逻辑 CPU 的最大个数。

在写测试函数的时候会调用传入参数b *testing.B的b.N。go test命令会先尝试把b.N设置为1，然后执行测试函数。

如果测试函数的执行时间没有超过上限，此上限默认为 1 秒，那么命令就会改大b.N的值，然后再次执行测试函数，如此往复，直到这个时间大于或等于上限为止。
所以b.N就是指的上面结果中的312973。3307 ns/op表明单次执行GetPrimes函数的平均耗时为3307纳秒。


```

![](./../img/go-test.png)

run test

```
go test -v -run
```

run benchmark

```shell
 go test -bench=BenchmarkBufferWithPool -benchmem -count=2
```
