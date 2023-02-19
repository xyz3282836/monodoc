# go profiling tracing observability

Goroutine scheduler



Garbage Collection



The stack



The heap



## Go profilers

### cpu profiler

两种方式：

1.写文件

```go
	file, _ := os.Create("./cpu.pprof")
	pprof.StartCPUProfile(file)
	defer pprof.StopCPUProfile()

// go tool pprof [--http=:8080] cpu.pprof|http://127.0.0.1:xxx/debug/pprof/profile [web浏览器]本地命令 打开 [文件采集或者web采集]
```

2.import net/http/pprof

```go
import _ "net/http/pprof"
```



### Memory profiler

```go
file, _ := os.Create("./mem.pprof")
// allocs or heap
// Both profiles contain the same data, the only difference is that the allocs profile has alloc_space/bytes set as the default sample type, whereas the heap profile defaults to inuse_space/bytes. This is used by the pprof tool to decide which sample type to show by default.
pprof.Lookup("allocs").WriteTo(file,0)
defer pprof.Lookup("allocs").WriteTo(file, 0)
defer runtime.GC()
// go tool pprof [--http=:8080] cpu.pprof|http://127.0.0.1:xxx/debug/pprof/profile [web浏览器]本地命令 打开 [文件采集或者web采集]
```

2.import net/http/pprof

```go
import _ "net/http/pprof"
```



### Block profiler

```go
runtime.SetBlockProfileRate(100_000_000) // WARNING: Can cause some CPU overhead
file, _ := os.Create("./block.pprof")
defer pprof.Lookup("block").WriteTo(file, 0)

// go tool pprof [--http=:8080] cpu.pprof|http://127.0.0.1:xxx/debug/pprof/profile [web浏览器]本地命令 打开 [文件采集或者web采集]
```

2.import net/http/pprof

```go
import _ "net/http/pprof"
```

### Mutex profiler

```
runtime.SetMutexProfileFraction(100)
file, _ := os.Create("./mutex.pprof")
defer pprof.Lookup("mutex").WriteTo(file, 0)
```

2.import net/http/pprof

```go
import _ "net/http/pprof"
```

### 