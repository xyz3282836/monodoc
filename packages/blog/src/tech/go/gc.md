---
title: "gc"
date: 2025-01-13 16:14:00 +8
category: go
tag:
  - go
  - gc
---

### 背景

gc的几个重要阶段

1. sweep termination 清理终止：清理终止，会触发stw，所有P都会进入sage-point 安全点，准备新一轮的gc；

   **触发 STW（Stop-the-World）**，让所有的 **P（Processor）** 停止用户代码的执行，并进入 **safe-point（安全点）**。

   🔧 **关键点：**
   - **safe-point** 是 GC 可以安全执行的地方，防止用户代码修改内存结构。

   - 在这个阶段，Go runtime 会：
     - **停止用户代码**；
     - 确保之前的清理阶段完成；
     - 准备开始**新的标记阶段**。

2. the mark phase 标记阶段：程序和gc同时运行，gc执行根节点的标记，这包括扫描所有的栈，全局对象以及不在堆中运行时数据结构；

   **并发执行**，GC 和用户代码同时运行。

   🔧 **关键点：**
   - 从根对象（root set）开始，标记所有**可达对象**。

   - 根对象包括：
     - **栈变量**；
     - **全局变量**；
     - **运行时数据结构**。

   - 使用 **写屏障（Write Barrier）** 确保在标记阶段产生的新对象也能被正确标记。

   💡 **写屏障的作用**：
   - 防止在标记阶段，用户代码分配新对象时，这些对象被遗漏。
   - 确保并发标记的准确性。

3. mark termination 标记终止：标记终止，触发stw，确保所有对象都已标记完成，gc状态变更，关闭gc工作线程；

   **触发 STW**，暂停所有用户代码，确保标记过程完成。

   🔧 **关键点：**
   - 进入 STW 状态，停止用户代码。

   - 执行以下任务：
     - 确保所有对象都已被正确标记。
     - **关闭标记线程**。
     - 准备进入清理阶段。

4. sweep phase 清理阶段：恢复程序执行，后台并发清理所有内存管理单元；

   **并发执行**，回收未标记的内存块。

   🔧 **关键点：**
   - 恢复用户代码的执行，清理阶段**在后台并发进行**。

   - 回收所有**未标记的对象**，将它们的内存块放入**空闲列表**，供后续分配使用。

   - 清理阶段是**增量完成**的，避免一次性清理造成长时间暂停。

### 触发gc

在 Go 中主要会在三个地方触发 GC：

1、监控线程 runtime.sysmon 定时调用；

2、手动调用 runtime.GC 函数进行垃圾收集；

3、申请内存时 runtime.mallocgc 会根据堆大小判断是否调用；

#### runtime.sysmon

Go 程序在启动的时候会后台运行一个线程定时执行 runtime.sysmon 函数，这个函数主要用来检查死锁、运行计时器、调度抢占、以及 GC 等。

它会执行 `runtime.gcTrigger`中的 test 函数来判断是否应该进行 GC。由于 GC 可能需要执行时间比较长，所以运行时会在应用程序启动时在后台开启一个用于强制触发垃圾收集的 Goroutine 执行 forcegchelper 函数。

不过 forcegchelper 函数在一般情况下会一直被 goparkunlock 函数一直挂起，直到 sysmon 触发GC 校验通过，才会将该被挂起的 Goroutine 放转身到全局调度队列中等待被调度执行 GC。

#### runtime.GC

这个比较简单，会获取当前的 GC 循环次数，然后设值为 gcTriggerCycle 模式调用 gcStart 进行循环。

#### runtime.mallocgc

tiny malloc、small alloc 都会先去 mcache 中找空闲内存块进行内存分配，如果 mcache 中分配不到内存，就要到 mcentral 或 mheap 中去申请内存，这个时候就会尝试触发 GC；而对于 large alloc 一定会尝试触发 GC 因为它直接在堆页上分配内存。

### 控制gc

上面这三个触发 GC 的地方最终都会调用 gcStart 执行 GC，但是在执行 GC 之前一定会先判断这次调用是否应该被执行，并不是每次调用都一定会执行 GC， 这个时候就要说一下 `runtime.gcTrigger`中的 test 函数，这个函数负责校验本次 GC 是否应该被执行。

```go
func (t gcTrigger) test() bool {
	if !memstats.enablegc || panicking.Load() != 0 || gcphase != _GCoff {
		return false
	}
	switch t.kind {
	case gcTriggerHeap:
		trigger, _ := gcController.trigger()
		return gcController.heapLive.Load() >= trigger
	case gcTriggerTime:
		if gcController.gcPercent.Load() < 0 {
			return false
		}
		lastgc := int64(atomic.Load64(&memstats.last_gc_nanotime))
		return lastgc != 0 && t.now-lastgc > forcegcperiod
	case gcTriggerCycle:
		// t.n > work.cycles, but accounting for wraparound.
		return int32(t.n-work.cycles.Load()) > 0
	}
	return true
}
```

- gcTriggerHeap：按堆大小触发，堆大小和上次 GC 时相比达到一定阈值则触发；
- gcTriggerTime：按时间触发，如果超过 forcegcperiod（默认2分钟） 时间没有被 GC，那么会执行GC；
- gcTriggerCycle：没有开启垃圾收集，则触发新的循环；

#### Go Memory Ballast

通过设置 ballast 数组我们达到了延迟 GC 的效果，但是这种效果只会在临时变量比较多的系统中有用，对于全局变量多的系统，用处不大。

#### Go GC Tuner

在 Go 中其实提供了 `runtime.SetFinalizer` 函数，它会在对象被 GC 的时候最后回调一下。可以通过它来设置一个钩子，每次 GC 完之后检查一下内存情况，然后设置 GOGC 值。

#### Soft Memory Limit

Go 实现了三种策略触发 GC ，其中一种是 gcTriggerHeap，它会根据堆的大小设定下次执行 GC 的堆目标值。 1.19 版的代码正是对 gcTriggerHeap 策略做了修改。

`gcControllerState.heapGoalInternal`计算 HeapGoal 的时候使用了两种方式，一种是通过 GOGC 值计算，另一种是通过 memoryLimit 值计算，然后取它们两个中小的值作为 HeapGoal。

```go
func (c *gcControllerState) heapGoalInternal() (goal, minTrigger uint64) {
	// Start with the goal calculated for gcPercent.
	goal = c.gcPercentHeapGoal.Load()

	// Check if the memory-limit-based goal is smaller, and if so, pick that.
	if newGoal := c.memoryLimitHeapGoal(); newGoal < goal {
		goal = newGoal
	} else {
		// We're not limited by the memory limit goal, so perform a series of
		// adjustments that might move the goal forward in a variety of circumstances.
```

Go GC 的触发是取上面两者计算结果较小的值，那么原本我们使用 GOGC 填的太大怕导致 OOM，现在我们可以加上 memoryLimit 参数限制一下；或者直接 GOGC = off ，然后设置 memoryLimit 参数，通过它来调配我们的 GC。
