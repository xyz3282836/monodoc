# linux core dump

## 运行的进程创建core dump文件

一般通过gdb来生成，使用gdb把进程attach进来，然后执行generate-core-file或者gcore命令来生成core dump文件

## 程序崩溃生成core dump文件

这次崩溃生成由两个因素控制

1. 是否生成，ulimit -c 为0代表不会自动生成，含义就是限制core dump文件的大小，单位KB，可以设置成 ulimit -c unlimited 甚至成无限或者其他值；

2. 生成格式配置 cat /proc/sys/kernel/core_pattern

```shell
[root@23 ~]# cat /proc/sys/kernel/core_pattern 
|/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h %e

gdb ./cmdexec corefile
```

Golang 程序panic也可以生成core dump，需要设置运行golang 程序前，设置  export GOTRACEBACK=crash (none,single默认,all,system,crash)

gdb对于golang支持的不是太好，golang 官方建议使用delve

```shell
git clone https://github.com/go-delve/delve
cd delve && make build

dlv core ./cmdexec corefile
```

