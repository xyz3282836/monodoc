# gpm

Go 程序执行过

可执行文件（go 编译好的可执行文件）开始执行

_rt0_amd64_windows // 不同平台执行入口不同

_rt0_amd64_linux // 不同平台执行入口不同

...osinit... // 一系列的检测和初始化

schedinit 调度初始化，按照GOMAXPROCS这个环境变量决定创建多少个p，allp的数量

创建main goroutine之前 allp[0]->m0->g0

以runtime.run 为程序入口，new main goroutine(newproc函数调用)

创建main goroutine之后，main goroutine会加入到当前p也就是allp[0]的本地runq中

mstart(-->schedule()) 函数开启循环调度，是所有工作线程的入口，主要是调用schedule函数，执行调度循环

m0开始执行关联p中的main goroutine，goroutine中执行runtime.main

runtime.main中会创建sysmon，package init ...

call main.main

...

代码中使用go 来创建协程，会被编译器转换为newproc函数调用，newproc会给goroutine构造一个栈帧，目的让其协程运行完毕后可以返回goexit()函数中，进行协程资源处理的工作

exit runtime.main会调用exit函数结束进程

 

几个重要数据结构

runtime.g 协程结构

runtime.m 工作线程结构

runtime.p 调度结构 runq

runtime.schedt 调度器结构，调度相关信息结构 midle，pidle，runq

全局变量g0是主线程对应的g，也就是上面的main goroutine，并且**在主线程栈上分配**，空间大，g0持有m0的指针

全局变量m0是主线程对应的m，m0持有g0的指针，并且最开始m0执行的协程就是g0

没有全局变量p0

全局变量allgs记录所有g



全局变量allm记录所有m

全局变量allp记录所有p

全局变量sched记录所有空闲的m，空闲的p

最终go的调度模型只有gm，导致各个m争抢g，加了锁，性能很差

后面引入了runtime.p 有个本地 runq [256]guintptr，这样只要把一个p关联到一个m，m就可以从p这里直接获取g，p有个本地runq，但是还是存在一个全局runq，保存在全局变量sched中

如果p的本地runq满了，就会放到全局sched的runq中，而m先从自己p的本地runq获取g，都处理完了就从全局runq中获取g来执行，如果全局runq也没了那就从别的p的本地runq获取g

allp[0] 也就是allp的第一个p于m0关联起来





time.Sleep 会调用gopark函数，把当前协程状态从_Grunning改为 _Gwaiting，不会把当前协程g返回到本地runq中，而是在timer总等待，继而调用schedule()进行调度，让其他g可以执行，等到sleep时间到了，timer会把之前的g重新设置为 _Grunnable，并且重新放回本地runq中



一个协程中，使用go关键字启动一个新的协程，会把这个新协程加入自己p的本地runq中，当时如果有新的空闲的p，就会启动新的线程关联到这个空闲的p，并且把这个新协程加入空闲p的本地runq中