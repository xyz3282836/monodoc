---
title: "ecache"
date: 2025-07-04 10:45:00 +8
category: 技术
tag:
  - ecache
  - LRU
---

## 基础

### 生成位掩码

将一个 `uint16` 转换为形如 `2^n-1` 的数（二进制表示为全是 1 的位掩码）

```go
func maskOfNextPowOf2(cap uint16) uint32 {
	if cap > 0 && cap&(cap-1) == 0 {
		return uint32(cap - 1)
	}
	cap |= (cap >> 1)
	cap |= (cap >> 2)
	cap |= (cap >> 4)
	return uint32(cap | (cap >> 8))
}
```

先判断大于0，且 cap 是否为 2 的幂

- 如果是，则返回 cap-1，否则返回一个掩码（mask），用于后续位运算。
- 如果 不是 ，通过一系列位运算，把 cap 的二进制从最高位的 1 开始，后面的所有位都变成 1。
  - 16位如`1xxx,xxx,xxxx,xxxx`，`cap |= (cap >> 1)`j过一次移位得到`01xx,xxxx,xxxx,xxxx`，在`|`或操作得到`11xx,xxxx,xxxx,xxxx`
  - `cap |= (cap >> 2)`得到`1111,xxxx,xxxx,xxxx`
  - `cap |= (cap >> 4)`得到`1111,1111,xxxx,xxxx`
  - `cap |= (cap >> 8)得到`得到`1111,1111,1111,1111`

### 优化哈希取模操作

- 传统取模：`hash % size`（性能较低）
- 优化方式：`hash & mask`（性能更好）
- 前提是 size 必须是 2 的幂，而 mask = size - 1

### hashBKDR

`hashBKDR` 函数是一种字符串哈希算法实现，通常用于将字符串转换为整数哈希值。这个算法的名称来源于它的作者 Brian Kernighan 和 Dennis Ritchie（即 K&R，《C程序设计语言》的作者）。

在缓存系统中，这种哈希函数通常用于：

1. 计算键（key）的哈希值，用于确定数据应该存储在哪个分片或桶中
2. 降低字符串比较的开销，通过先比较哈希值再比较原始字符串
3. 实现高效的字符串到整数的映射

BKDR哈希算法的典型实现如下：

```go
func hashBKDR(s string) uint32 {
    var seed uint32 = 131 // 31, 131, 1313, 13131... 都是不错的选择
    var hash uint32 = 0
    for i := 0; i < len(s); i++ {
        hash = hash*seed + uint32(s[i])
    }
    return hash
}
```

这个算法的特点是：

- 实现简单
- 计算速度快
- 冲突率较低
- 分布均匀性好

在分片缓存或需要快速定位数据的场景中，这种哈希函数非常有用，因为它可以将任意长度的字符串映射到固定范围的整数值，便于后续的索引操作。
