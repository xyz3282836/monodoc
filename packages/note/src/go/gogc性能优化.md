# go gc 性能优化

Go gc 触发时机为 heap 大小增长为上次 gc 的两倍时。但在 GO GC 实际实践中会按照 Pacer 调频算法根据堆增长速度等因素，使堆大小在达到两倍大小前提前发起 GC。通过调整 GC 的步调，以调整 GC 的触发频率。

两种方式

1. 设置 gc
2. 设置 debug.SetGCPercent()

设置 GOGC 的弊端

- GOGC 设置比率的方式不精确；
- GOGC 设置过小，容易频繁触发 GC；
- 对某些程序本身占用内存就低，容易触发 GC；
- GOGC 设置很大，有的时候又容易触发 OOM；

## go ballast

- **n.**（船中保持平衡的）压舱物；（热气球的）镇重物
- **v.**在…上装压舱物[沙囊]；为(铁路等)铺道碴；使沉着

Go ballast，其实很简单就是初始化一个生命周期贯穿整个 Go 应用生命周期的超大 slice。

## go tuner

通过自动调整 GOGC，来动态的调整 GC 的 target ,用来在内存足够的时候调整 GOGC 来减少 GC 的次数。

## SetMemoryLimit

1.19.1 新增 debug.SetMemoryLimit 解决这个问题

- SetMemoryLimit + GOGC = off + MemoryLimit 足够大；
  - 设置 Go Ballast 的效果一样，常驻稳态内存的服务；
- SetMemoryLimit + GOGC = 100 + MemoryLimit 足够大；
  - 在没有达到 MemoryLimit 阈值的情况下，还是遵循 GOGC 的 target 决定要不要进行垃圾回收，使用 GOGC tuner 进行调优，避免多次高频的垃圾回收，大部分应用服务符合这类配置；
- SetMemoryLimit + GOGC = 100 + MemoryLimit 不足够大；
- SetMemoryLimit + GOGC = off + MemoryLimit 不足够大；

## references

[1] https://segmentfault.com/a/1190000041602269

[2] https://segmentfault.com/a/1190000041637173

[3] https://wudaijun.com/2020/01/go-gc-keypoint-and-monitor/

[4] https://mp.weixin.qq.com/s/gc34RYqmzeMndEJ1-7sOwg

[5] https://mp.weixin.qq.com/s/_qedHY6tHvtmXcmy9JTfig

[6] https://mp.weixin.qq.com/s/ry9HpZqFt4nZD_BZYLUBeA

[7] https://mp.weixin.qq.com/s/EIuM073G7VV1rIsnTXWyEw

[8] https://go.googlesource.com/proposal/+/a216b56e743c5b6b300b3ef1673ee62684b5b63b/design/44167-gc-pacer-redesign.md

[9] https://www.ardanlabs.com/blog/2018/12/garbage-collection-in-go-part1-semantics.html

[10] https://www.ardanlabs.com/blog/2018/08/scheduling-in-go-part2.html

[11] https://www.ardanlabs.com/blog/2018/12/scheduling-in-go-part3.html
