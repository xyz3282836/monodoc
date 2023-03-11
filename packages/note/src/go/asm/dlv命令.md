# dlv 命令

## 基础

go build 可以用*-gcflags*给*go*编译器传入参数，也就是传给 go tool compile 的参数，因此可以用 go tool compile --help 查看所有可用的参数。

其中-m 可以检查代码的编译优化情况，包括逃逸情况和函数是否内联。

如果只在编译特定包时需要传递参数，格式应遵守“包名=参数列表”，如 go build -gcflags -gcflags='log=-N -l' main.go

go build 用-ldflags 给 go 链接器传入参数，实际是给 go tool link 的参数，可以用 go tool link --help 查看可用的参数。

常用-X 来指定版本号等编译时才决定的参数值。例如代码中定义 var buildVer string，然后在编译时用 go build -ldflags "-X main.buildVer=1.0" ... 来赋值。注意-X 只能给 string 类型变量赋值。

## dlv

// 生成无内联优化的可执行二进制文件

```shell
go build -gcflags "-N -l" -v
```

// 后台执行阻塞的 http server 程序

```shell
nohub ./godlv
```

// 自动编译二进制文件，并且进入 dlv，并且可以使用 restart

```shell
dlv debug ./main.go
dlv debug godlv (项目目录名称)
```

// 使 Delve 控制一个已经运行的进程，并开始一个新的调试会话。 当退出调试会话时，你可以选择让该进程继续运行或杀死它。

```shell
dlv attach pid
```

进入 dlv 后

就是打断点，触发执行后停在该断点

```shell
b main.go:17 或者 b randHandler
```

c 就是 continue，下一个断点或者没有断点就结束了,如果结束后外部触发了会再次重新走第一个断点

help 会打印可供使用的命令

bp 列出所有断点，并且由序号，供 clear 删除使用

clearall 删除所有断点

clear 4

toggle 4 断点状态设置为不可用

s 执行下一行代码

n 执行代码的下一步

r restart 的 alias,重新开始 debug，attach 方式不行，需要 delve 自己创建的进程才可以，比如 dlv debug 的方式

si step-instruction 的 alias，针对汇编代码，否则和 step 一样

so stepout 的 alias，跳出当前函数，s 太慢，so 直接跳出当前函数，返回上层调用继续向下，比较方便

args 打印当前所在函数的参数值

locals 打印当前函数，执行此步之前的所有局部变量值，不是所有，只有执行到了才能打印

print 打印 locals 返回的局部变量以及参数，全局变量

whatis \_xxb 打印变量类型

set 修改变量值,debug 非常有用，注意当前一步涉及的变量无法改动

vars main.\_xxb 打印所有全局变量，加上名称可以自动正则匹配（vars xb$)

funcs count 查看 count 方法

list 打印了很多东西，需要重新定位当前代码，非常有用

disass 查看当前汇编代码执行位置（s 代码执行一步，可能 si 要执行多次汇编指令）

###### reference

https://zhuanlan.zhihu.com/p/425645473
