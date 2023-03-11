# go的调度

#### 生产goroutine

生产的goroutine有三个去处: p.runnext,p.local runq,schedt.global runq

go func(){...} go关键字底层调用 runtime.newproc 创建g，按照优先级给到三个去处

先看p.runnext，为空调用runtime.runqput 塞进去g

非空的情况下新的goroutine就会抢占runnext，挤出去的g被放到local runq中

#### 消费执行g的过程