# go 的调度

#### 生产 goroutine

生产的 goroutine 有三个去处: p.runnext,p.local runq,schedt.global runq

go func(){...} go 关键字底层调用 runtime.newproc 创建 g，按照优先级给到三个去处

先看 p.runnext，为空调用 runtime.runqput 塞进去 g

非空的情况下新的 goroutine 就会抢占 runnext，挤出去的 g 被放到 local runq 中

#### 消费执行 g 的过程
