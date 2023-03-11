# gpm

Go 程序执行过

可执行文件（go 编译好的可执行文件）开始执行

\_rt0_amd64_windows // 不同平台执行入口不同

\_rt0_amd64_linux // 不同平台执行入口不同

...osinit... // 一系列的检测和初始化

schedinit 调度初始化，按照 GOMAXPROCS 这个环境变量决定创建多少个 p，allp 的数量

创建 main goroutine 之前 allp[0]->m0->g0

以 runtime.run 为程序入口，new main goroutine(newproc 函数调用)

创建 main goroutine 之后，main goroutine 会加入到当前 p 也就是 allp[0]的本地 runq 中

mstart(-->schedule()) 函数开启循环调度，是所有工作线程的入口，主要是调用 schedule 函数，执行调度循环

m0 开始执行关联 p 中的 main goroutine，goroutine 中执行 runtime.main

runtime.main 中会创建 sysmon，package init ...

call main.main

...

代码中使用 go 来创建协程，会被编译器转换为 newproc 函数调用，newproc 会给 goroutine 构造一个栈帧，目的让其协程运行完毕后可以返回 goexit()函数中，进行协程资源处理的工作

exit runtime.main 会调用 exit 函数结束进程

几个重要数据结构

runtime.g 协程结构

runtime.m 工作线程结构

runtime.p 调度结构 runq

runtime.schedt 调度器结构，调度相关信息结构 midle，pidle，runq

全局变量 g0 是主线程对应的 g，也就是上面的 main goroutine，并且**在主线程栈上分配**，空间大，g0 持有 m0 的指针

全局变量 m0 是主线程对应的 m，m0 持有 g0 的指针，并且最开始 m0 执行的协程就是 g0

没有全局变量 p0

全局变量 allgs 记录所有 g

全局变量 allm 记录所有 m

全局变量 allp 记录所有 p

全局变量 sched 记录所有空闲的 m，空闲的 p

最终 go 的调度模型只有 gm，导致各个 m 争抢 g，加了锁，性能很差

后面引入了 runtime.p 有个本地 runq [256]guintptr，这样只要把一个 p 关联到一个 m，m 就可以从 p 这里直接获取 g，p 有个本地 runq，但是还是存在一个全局 runq，保存在全局变量 sched 中

如果 p 的本地 runq 满了，就会放到全局 sched 的 runq 中，而 m 先从自己 p 的本地 runq 获取 g，都处理完了就从全局 runq 中获取 g 来执行，如果全局 runq 也没了那就从别的 p 的本地 runq 获取 g

allp[0] 也就是 allp 的第一个 p 于 m0 关联起来

time.Sleep 会调用 gopark 函数，把当前协程状态从\_Grunning 改为 \_Gwaiting，不会把当前协程 g 返回到本地 runq 中，而是在 timer 总等待，继而调用 schedule()进行调度，让其他 g 可以执行，等到 sleep 时间到了，timer 会把之前的 g 重新设置为 \_Grunnable，并且重新放回本地 runq 中

一个协程中，使用 go 关键字启动一个新的协程，会把这个新协程加入自己 p 的本地 runq 中，当时如果有新的空闲的 p，就会启动新的线程关联到这个空闲的 p，并且把这个新协程加入空闲 p 的本地 runq 中
