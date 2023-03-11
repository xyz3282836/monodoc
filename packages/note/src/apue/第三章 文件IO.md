# 第三章 文件 IO

I/O 函数就是打开文件，读文件，写文件，在绝大数 unix 系统中只需用到 5 个函数 open、read、write、lseek、close。

不同缓存长度对 read 和 write 有影响。unbuffered I/O（不带缓冲的 I/O）与后面标准 I/O 函数

所谓不带缓存就是说 read 和 write 都调用内核的一个系统调用。

不带缓冲的 I/O 不是 ISO C 的组成部分，是 POSIX.1 核 Single UNIX Specification 的组成部分

### 文件描述符-fd

对于内核而言，打开的文件都是通过 fd 引用

非负整数

打开或者创建文件时，内核向进程返回一个 fd

POSIX.1 幻数 0、1、2 被标准化，STDIN_FILENO、STDOUT_FILENO、STDERR_FILENO，这些常量通常写在<unistd.h>

fd 的范围 0~OPEN_MAX-1，现在基本没啥限制

## open 和 openat

```c
int open(char *path,int oflag,...);//返回fd
/*
oflag:（在<fcntl.h>)
O_RDONLY 0
O_WRONLY 1
O_RDWR   2
O_EXEC
O_SEARCH（应用与目录，其实就是打开目录时验证搜索权限,就是后续对返回的fd进行操作就不需要再次检查对该目录的搜索权限，不过书中涉及的操作系统都不支持这个参数，不用记了）
----
可选，也就是第三个参数及以上
O_APPEND
O_CLOEXEC
O_CEEAT
O_DIRECTOR
O_EXCL 如果同时指定O_CREAT，如文件已存在则出错，其实用途就是测试一个文件是否存在，而且原子操作
O_NOCTTY path是终端设备的情况
O_NONBLOCK 后面说吧
O_SYNC 每次write都要等待物理上I/O操作完成，就是文件+属性都更新后
O_TRUNC 文件存在而且写或读写打开，那么将其长度截断为0
O_TTY_INIT 又是终端，有TTY
O_DSYNC 和sync区别就是，文件更新后，不用等到属性也更新后才去write
O_RSYNC 直到所有进程对文件同一部分挂起的写操作完成，在这之前所有进程对这个fd进行read操作等待，就是等
*/

int openat(int fd,const *path,int oflag,...);//返回fd
```

open 与 openat 三种可能性，区别就是 fd 引起的

- path 为绝对路径，那么 fd 就被忽略，两函数相当了
- path 是相对路径，fd 是相对路径在文件系统中的开始地址（fd 需要相对路径获得，感觉在 openat 之前用 open 获取到了这个 fd）
- path 相对路径，fd 是 AT_FDCWD，两者又相当了

openat 是 POSIX.1 加的，不属于 ISO C，主要为了线程可以用相对路径打开，因为一个进程下的多个不同线程很难在统一时间工作在不同目录中

还可以避免 TOCTTOU，time-of-check-to-time-of-use，其实就是 2 依赖 1，1 执行后 2 执行，但是要上中间 1 的涉及的文件变了，那么 2 就很难讲了，其实就是原子性

小 ps：文件名过长，是默默截断不报错还是报错，是个历史问题，不同系统处理方式不同，但是 POSIX.1 有个常量 POSIX_NO_TRUNC(trunc 出现了，上面 oflag 可选参数也有这个单词)，但是现在大多数系统文件名 255 最大长度，通常没谁蛋疼超过这个，所有很少会有这个问题
2018-4-3 23:11

## 文件 I/O

I/O 函数就是打开文件，读文件，写文件，在绝大数 unix 系统中只需用到 5 个函数 open、read、write、lseek、close。

不同缓存长度对 read 和 write 有影响。unbuffered I/O（不带缓冲的 I/O）与后面标准 I/O 函数

所谓不带缓存就是说 read 和 write 都调用内核的一个系统调用。

不带缓冲的 I/O 不是 ISO C 的组成部分，是 POSIX.1 核 Single UNIX Specification 的组成部分

### 文件描述符-fd

对于内核而言，打开的文件都是通过 fd 引用

非负整数

打开或者创建文件时，内核向进程返回一个 fd

POSIX.1 幻数 0、1、2 被标准化，STDIN_FILENO、STDOUT_FILENO、STDERR_FILENO，这些常量通常写在<unistd.h>

fd 的范围 0~OPEN_MAX-1，现在基本没啥限制

## open 和 openat

```c
#include <fcntl.h>
int open(char *path,int oflag,...);//返回fd
/*
oflag:（在<fcntl.h>)
O_RDONLY 0
O_WRONLY 1
O_RDWR   2
O_EXEC
O_SEARCH（应用与目录，其实就是打开目录时验证搜索权限,就是后续对返回的fd进行操作就不需要再次检查对该目录的搜索权限，不过书中涉及的操作系统都不支持这个参数，不用记了）
----
上面5个只能有一个，下面的可选通过或，比如 O_RDWR|O_APPEND
O_APPEND
O_CLOEXEC 把FD_CLOEXEC常量设置为文件描述符标志
O_CREAT 没有就创建
O_DIRECTOR
O_EXCL 如果同时指定O_CREAT，如文件已存在则出错，其实用途就是测试一个文件是否存在，而且原子操作(也就是测试+创建)
O_NOCTTY path是终端设备的情况
O_NONBLOCK 后面说吧--非阻塞模式
O_SYNC 每次write都要等待物理上I/O操作完成，就是文件+属性都更新后--等待同步写完成
O_TRUNC 有点复杂
O_TTY_INIT 又是终端，有TTY
O_DSYNC 和sync区别就是，文件更新后，不用等到属性也更新后才去write--等待同步写完成
O_RSYNC 直到所有进程对文件同一部分挂起的写操作完成，在这之前所有进程对这个fd进行read操作等待，就是等--同步读和写
*/

int openat(int fd,const *path,int oflag,...);//返回fd
```

open 与 openat 三种可能性，区别就是 fd 引起的

- path 为绝对路径，那么 fd 就被忽略，两函数相当了
- path 是相对路径，fd 是相对路径在文件系统中的开始地址（fd 需要相对路径获得，感觉在 openat 之前用 open 获取到了这个 fd）
- path 相对路径，fd 是 AT_FDCWD，两者又相当了

openat 是 POSIX.1 加的，不属于 ISO C，主要为了线程可以用相对路径打开，因为一个进程下的多个不同线程很难在统一时间工作在不同目录中

还可以避免 TOCTTOU，time-of-check-to-time-of-use，其实就是 2 依赖 1，1 执行后 2 执行，但是要上中间 1 的涉及的文件变了，那么 2 就很难讲了，其实就是原子性

小 ps：文件名过长，是默默截断不报错还是报错，是个历史问题，不同系统处理方式不同，但是 POSIX.1 有个常量 POSIX_NO_TRUNC(trunc 出现了，上面 oflag 可选参数也有这个单词)，但是现在大多数系统文件名 255 最大长度，通常没谁蛋疼超过这个，所有很少会有这个问题

2018-4-3 23:11

## creat

```c
#include <fcntl.h>
int creat(const char *path,mode_t mode);
//等效与
int open(path,O_WRONLY|O_CREAT|O_TRUNC,mode);
```

早期，open 只能打开存在的文件

现在 open 新版支持了

creat 不足之处在于只能以只写方式打开和创建文件

如果文件已经存在那么会被截断 0

## close

```c
#include <unistd.h>
int close(int fd);// 0成功，-1出错
```

一个进程终止时，内核自动关闭它所有打开的文件，所有可以利用这一点，不显式

## lseek

```c
#include <unistd.h>
off_t lseek(int fd,off_t offset,int whence);
/*
whence:
SEEK_SET 从头开始+offset
SEEK_CUR 从当前开始+offset，为正或负
SEEK_END 为文件末尾+offset，为正或负
*/
od -c file.txt // -c是以字符打印文件内容，打印空洞，空洞会显示\0
```

当打开一个文件的时候，除非指定`O_APPEND`，否则该偏移量被设置为 0

空洞不会占用磁盘块

偏移量，如果 off_t 是 32 位整型，那么文件最大长度就是 2^31-1

## read

```c
#include <unistd.h>
ssize_t read(int fd,void *buf,size_t nbytes);// 0表示已读到文件尾
/*
经典定义
int read(int fd,char *buf,unsigned nbytes);
为了和ISO C一致才改的
void *表示通用指针
*/
```

ssize_t 有符号，size_t 无符号，和 SSIZE_MAX 常量有关

## write

```c
#include <unistd.h>
ssize_t write(int fd,const void *buf,size_t nbytes);
```

出错，要么磁盘写满了，要么超过了一个给定进程的文件长度的限制

注意，如果打开时指定了 O_APPEND，那么每次写操作之前，会追加写

## I/O 的效率

通常 unix 的 shell 提供一种方法，在标准输入打开一个文件读，在标准输出上创建或重写一个文件，这使得程序不必打开输入和输出文件，而且可以使用 I/O 的重定向功能

unix 系统在进程终止时会自动关闭所有打开的 fd

unix 系统内核，对应文本文件和二进制文件没区别

关于读 write 的参数 buf 多少，需要测试

早期计算机主存是用铁氧体磁芯(ferrite cord)，也是'core dump'词的由来

## 文件共享

unix 支持不同进程间共享打开文件

内核的所有 I/O 数据结构有 3 种

1. 每个进程都有一个进程表项，包含**fd 表**，里面有**fd**、**fd 标志**、**指向一个文件表的指针**
2. 文件表，**文件状态标志**（读，写，追加，同步，非阻塞等）、**当前文件偏移量**、**指向该文件 v 节点的指针**
3. v 节点结构，**文件类型**、**对此文件进行操作函数的指针**、**i 节点-索引节点(大多数文件)(当前文件长度)**

ps i 节点包含了**文件所有者**、**文件长度**、**指向文件实际数据块在磁盘上的位置指针等**，linux 没有使用 v 节点，而是使用了 i 节点结构

文件表各自拥有

场景：两个独立进程各自打开同一个文件，那么分成各自文件表分开，但是都指向同一个 v 节点表

流程：

write 后，文件表中偏移量写入，如果超过当前文件长度，那么会将 i 节点中当前文件长度设为当前偏移量

lseek 定位到文件尾，和用 O_APPEND 打开文件是不同的，前者写不会追加写

fd 标志和文件状态标志的作用范围区别，前者只用于一个进程的一个 fd，后者应用于所有指向该文件表的任何进程中的 fd
2018-4-8 23:55

## 原子操作

早期 unix 不支持 open 的`O_APPEND`

多个进程同时追加写同一个文件（都有各自的文件表，但是共享同一个 v 节点），会有问题

`O_APPEND`提供了原子性，在内核每次写之前，都将偏移量设置到尾端

### 原子函数 pread 和 pwrite

```c
#include <unistd.h>
ssize_t pread(int fd,void *buf,size_t nbytes,off_t offset);
sseize_t pwrite(int fd,const void *buf,size_t nbytes,off_t offset);
```

相当于先 lseek 再 read/write

创建一个文件

open(char,O_RDWR|O_CREAT|O_EXCL)，原子操作：测试+新建文件

## dup 和 dup2

```c
#include <unistd.h>
int dup(int fd);
int dup2(int fd,int fd2);
---------------------------
int fd1, fd2, fd3, fd4;
fd1 = open("f1", O_RDWR);
fd2 = open("f2", O_RDWR);
```

两函数都可以复制一个现有的 fd，进程表两条记录的 fd 都指向同一个文件表（注意和上面两个独立进程打开同一个文件的区别，同一个进程的文件表会共用）

open 同一个文件两次返回不同 fd，那么也会有不同文件表(每次调用 open 函数都会分配一个新的文件表)

## sync,fsync 和 fdatasync

```c
#include <unistd.h>
int fsync(int fd);
int fdatasync(int fd);
以上两个成功返回0
void sync(void);
```

sync 只是将写入任务排入队列就返回，不会阻塞

系统守护进程 update 一般 30s 调用 sync

fsync 等写到磁盘(data+atrribute)才会结束

fdatasync 等写到磁盘(data)才会结束

## fcntl

改变已经打开文件的属性

```c
#include <fcntl.h>
int fcntl(int fd,int cmd,.../* arg*/);//成功则依赖于cmd
/*
cmd 5中功能
F_DUPFD或F_DUPFD_CLOEXEC  都复制一个已有fd，后者还设置新fd的标志值
dup(fd) 相当于 fcntl(fd,F_DUPFD,0)
dup(fd,fd2) 相当于 close(fd2) fcntl(fd,F_DUPFD,fd2)
涉及的FD_CLOEXEC在第八章说
F_GETFD或F_SETFD          fd标志(就是这个常量FD_CLOEXEC)
很多现有程序不使用FD_CLOEXEC，直接用默认的0，或者1
F_GETFL或F_SETFL          文件状态标志(open函数里的)
F_SETFL:O_APPEND,O_NONBLOCK,O_SYNC,O_DSYNC,O_RSYNC,O_FSYNC,O_ASYNC
F_GETOWN或F_SETOWN        异步I/O所有权，获取/设置信号正的进程id或者负的进程组ID(绝对值)
第14章说
F_GETLK,F_SSETLK或F_SETKW 记录锁
*/
```

标准输出上 fcntl 设置 O_SYNC 将不起作用，不报错，因为这是 shell 打开的

## ioctl

```c
#include <unistd.h>//system v
#include <sys/ioctl.h>//bsd and linux
int ioctl(int fd, int request,...);
```

## /dev/fd

打开文件/dev/fd/n 等效与复制描述符 n

fd = open("/dev/fd/0",mode) 等效于 fd=dup(0)

如果先前 fd 0 被打开为只读，那么我们也只能对 fd 进行读操作，即使 fd = open("/dev/fd/0",O_RDWR)

## 小结

因为 read 和 write 都在内核执行，所有称为不带缓冲的 I/O 函数

2018-4-9 23:55
