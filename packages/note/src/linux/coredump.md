# linux core dump

## 运行的进程创建 core dump 文件

一般通过 gdb 来生成，使用 gdb 把进程 attach 进来，然后执行 generate-core-file 或者 gcore 命令来生成 core dump 文件

## 程序崩溃生成 core dump 文件

这次崩溃生成由两个因素控制

1. 是否生成，ulimit -c 为 0 代表不会自动生成，含义就是限制 core dump 文件的大小，单位 KB，可以设置成 ulimit -c unlimited 甚至成无限或者其他值；

2. 生成格式配置 cat /proc/sys/kernel/core_pattern

```shell
[root@23 ~]# cat /proc/sys/kernel/core_pattern
|/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h %e

gdb ./cmdexec corefile
```

Golang 程序 panic 也可以生成 core dump，需要设置运行 golang 程序前，设置 export GOTRACEBACK=crash (none,single 默认,all,system,crash)

gdb 对于 golang 支持的不是太好，golang 官方建议使用 delve

```shell
git clone https://github.com/go-delve/delve
cd delve && make build

dlv core ./cmdexec corefile
```
