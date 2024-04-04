---
title: "go语言测试"
date: 2024-04-01 14:26:00 +8
category: go
tag:
  - interface
  - base
---

## 普通测试

```bash
go test -run Testxxx
匹配 Testxxx
```

必须Test开头

## 性能测试

`-run`一般执行普通测试，性能测试需要`-bench`开启

```bash
go test -bench xxx
```

必须`Benchmark`开头，负责出错

例子：

```
go test -bench=BenchmarkGenerate$ -benchmem -benchtime=50x -count=3
```

-benchmem 展示内存分配信息

-benchtime 50x指执行50次，还可以是5s，表示控制在5s内

-count 3 表示benchmark 3轮

可以通过下面代码，跳过前面的耗时

```
b.ResetTimer() // 重置定时器
```

还可以限制指定范围做压力测试

```go
func BenchmarkBubbleSort(b *testing.B) {
	for n := 0; n < b.N; n++ {
		b.StopTimer()
		nums := generateWithCap(10000)
		b.StartTimer()
		bubbleSort(nums)
	}
}
```
