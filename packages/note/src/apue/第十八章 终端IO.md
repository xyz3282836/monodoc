# 第十八章 终端 IO

终端 I/O 处理分立为两种不同的风格：一种是系统 Ⅲ 的风格，由 System V 沿续下来，另一种是 V7 的风格，它成为 BSD 派生的系统终端 I/O 处理的标准

终端 I/O 有两种不同的工作模式：规范模式输入处理；非规范模式输入处理

比如通常的 shell 就是规范模式，而 vim 编辑器就是非规范模式

## 特殊输入字符

posix.1

## 获得和设置终端属性

```c
struct termios {
    tcflag_t c_iflag;/* input flags */
    tcflag_t c_oflag;/* output flags */
    tcflag_t c_cflag;/* control flags */
    tcflag_t c_lflag;/* local flags */
    cc_t  c_cc[NCCS];/* control characters */
};

所有选项都可以被检查和更改
#include <termios.h>
int tcgetattr(int fd,struct *termptr);
int tcsetattr(int fd,int opt,const struct termios *termptr);
```

## stty 命令

在命令行（或 shell 脚本）中用 stty(1)命令进行检查和更改

## 波特率函数

```c
#include <termios.h>
speed_t cfgetispeed
speed_t cfsetispeed
speed_t cfgetospeed
speed_t cfsetospeed

```

## 行为控制函数

4 个函数提供了终端设备的行控制能力

4 个函数都要求参数 fd 引用一个终端设备

```c
#include <termios.h>
int tcdrain(int fd);//等待所有输出都被传递
int tcflow(int fd, int action);//用于对输入和输出流控制进行控制
int tcflush(int fd, int queue);
//冲洗（抛弃）输入缓冲区（其中的数据是终端驱动程序已接收到，但用户程序 尚未读取的）或
//输出缓冲区（其中的数据是用户程序已经写入，但尚未被传递的）
int tcsendbreak(int fd, int duration);//在一个指定的时间区间内发送连续的 0 值位流
```

## 终端标志

历史上，在大多数 UNIX 系统版本中，控制终端的名字一直是/dev/tty。

## 规范模式
