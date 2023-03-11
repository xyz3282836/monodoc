# af_xdp

## 说明

bpf bsd packet filter，能以安全的方式在不同的钩点执行用户注入到内核的字节码。2013 年 Alexei Starovoitov 对 BPF 进行了改造，有了 eBPF

## XDP

eBFP 有很多钩子，而 XDP 就是 linux 网络数据处理的一个 hook 点。XDP 全称 eXPress Data Path，快速数据路径，能够在数据到达网卡驱动时对其进行处理。

三种运行模式：generic，native，offload。

![](./../img/ebpf-xdp.png)

offload 是直接在网卡中对 xdp 程序进行处理，挂载点最靠前，性能最佳，但是需要硬件特别支持

native 是最传统的 xdp 模式，需要驱动支持，目前主流网卡驱动都实现了 native xdp，挂载在驱动接受路径上

generic 是内核模拟出的一种通用模式，不需要驱动支持，但是 xdp 挂载最靠后，性能不如 native

## 工作流程

af_xdp 分为两个部分：socket 和 UMEM

### socket

类似传统 socket，通过 socket()创建一个 xsk，每个 xsk 包含一个 RX ring 和 TX ring，收包在 RX ring 进行，发包在 TX ring 进行

### UMEM

存放大小相等的内存块地址，包含两个 FILL ring 和 COMPLETION ring。

收包前，将包地址写到 FILL ring，内核消费这些数据收包，完成收包后地址放到 xsk 的 RX ring 中，用户程序消费 ring 得到数据帧

发包时，用户向 UMEM 的地址中写数据帧，写到 TX ring，内核消费开始执行发包，完成后写到 COMPLETION ring。

为了让 xsk 成功收包从网卡中，需要将 xsk 绑定到网卡和队列。
