# kubernetes

## cfs

默认情况下，kubelet 使用 CFS 配额来管理和执行 POD 的 CPU 限制。CFS 的方式在调度 CPU 时间片时是在宿主机的所有核心上面切换，实现最终的完全公平。这种方式会影响 CPU 缓存亲和性，在我们部分延迟敏感的业务场景下会带来**性能延迟**。

## cpuset

为了解决这个问题，在这些业务场景下我们使用了 CPU 管理器的**static 策略**来优化性能。对 CPU 密集型业务及延时敏感业务来说，能够极大的降低容器虚拟化带来的性能损耗。

static 策略就是我们常说的 CPU 绑核，对应到 docker 运行时就是 CPUSet 这个参数。

docker 对于配置 cpuset 的容器，会使用 cgroup 的 cpuset 的子系统，将容器 namespace 和 CPU 序号绑定到一起。

![](./../img/image2020-2-27_17-25-19.png)

## cpu 资源隔离

### cpu 核心隔离

```
group zorro {
    cpuset {
        cpuset.cpus = "0-23";
        cpuset.mems = "0-1";
    }
}

```

### cpu 时间隔离

```
cat /cgroup/cpu/xxx/cpu.cfs_period_us
100000
这个数字的单位是微秒，就是说，我们的cpu时间周期是100ms

cat /cgroup/cpu/xxx/cpu.cfs_quota_us
-1 无限制
调度器会根据这个值的大小决定进程组在一个时间周期内（即100ms）使用cpu时间的比率。比如这个值我们设置成50000，那么就是时间周期的50%，于是这个进程组只能在一个cpu上占用50%的cpu时间
50% * 100000 * cpu核心数

group zorro {
    cpu {
            cpu.cfs_quota_us = "1200000";
    }
}
```

### 权重 cpu 隔离

```
group zorro {
    cpu {
            cpu.shares = 1000;
    }
}
```
