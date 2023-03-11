# linux-namespace

![](./../img/image-20220819092737036.png)

namespace 主要特性就是资源隔离

docker run -it ubuntu:18.04 /bin/bash

一般使用 docker 会新增上面的五种做到资源隔离 uts，ips，pid，network，mount

### docker 网络模式

docker run 创建 Docker 容器时，可以用--net 指定网络模式，有四种

docker run -it ubuntu:18.04 /bin/bash --net=...

#### host 模式

--net=host 和宿主机共用一个 network namespace

#### none 模式

关闭网络功能

#### bridge 模式（默认模式）

容器使用独立 network namespace，并且连接到 docker0 虚拟网桥，通过 iptables nat 表配置和宿主机进行通信

#### container 模式

指定新创建的容器和已经存在的一个容器共享他的 network namespace
