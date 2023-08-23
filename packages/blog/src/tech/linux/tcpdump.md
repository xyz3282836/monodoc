---
title: "tcpdump"
date: 2023-08-17 12:59:00 +8
category: linux
tag:
  - linux
  - shell
  - tcpdump
  - ip
  - http
---

tcp|ip|arp 注意 tcp [src|dst] port xxx, ip [src|dst] host xxx.xxx.xxx.xxx，只能 tcp 修饰 port，ip 修饰 host

host xxx.xxx.xxx.xxx ip 地址或者域名

ip [src|dst] host 127.0.0.2 and [tcp|udp] [src|dst] port 5000

net ip 网段 xxx.xxx.xxx.0/24

port|portrange [xxx|ssh|xxx-xxx]端口号，也可以是服务的通用名称如 http|https|dns|ssh

src,dst 修饰 host 或者 port

-n 不显示域名显示具体 ip 地址

-nn ip 地址和端口号

-w 写文件

-C 写文件的大小限制，1 标识 1,000,000 字节 1m 左右

-c 指定抓多少个包后就停止

tcp|arp|icmp|ip|ip6 传输层协议，应用层不支持

-q 简化输出信息

-Q in 外网请求主机的包; out 主机返回外网的包

-s 指定抓包的大小

-A ascii 码显示报文

-X ascii + 16 进制 和 wireshark 类似

-e 显示链路层信息 mac 地址等，以太网 ethert

-F 指定规则文件

less 10 抓取小于 10 字节的包

greater 100 抓取大于 100 字节的包

![](./../img/tcpdump.png)

tcpdump src port https -nn -Q out

主机发包外网，443 服务向外网发数据包（翻墙机器把外网的内容返回给客户端）

tcpdump dst port https -nn -Q in

外网给主机 443 服务发包（客户端请求翻墙机器的翻墙服务 443）

#### 参数

![tcpdump 常用过滤表达式类](./../img/tcpdump-param.jpg)
