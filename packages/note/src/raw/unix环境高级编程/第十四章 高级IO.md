# 第十四章 高级IO

## 非阻塞IO

fd是阻塞还是非阻塞是可以设置的，这也直接影响系统调用函数是否阻塞还是非阻塞（直接返回错误）

对于一个给定的fd，有两种方法可以指定为非阻塞IO

1. open的时候指定O_NOBLOCK
2. 已经open的fd，使用fcntl函数设置O_NOBLOCK

## 记录锁

### fcntl记录锁

```c
#include <fcntl.h>
int fcntl(int fd,int cmd,../* struct flock *flockptr */);
```

任意多个进程在一个给定的字节上可以有一把共享的读锁，但是在一个给定字节上只能有一个进程有一把独占写锁

单进程加写锁，后面的锁范围会覆盖前面

F_SETLK 和 F_SETLKW 命令总是替换调用进程现有的锁（若已存在），所以调用进程决不会阻塞在自己持有的锁上，于是，F_GETLK 命令决不会报告调用进程自己持有的锁

### 锁的隐含继承和释放

1. 锁与进程和文件两者相关联。这有两重含义：第一重很明显，当一个进程终止时，它所建立的锁全部释放；无论一个描述符何时关闭，该进程通过这一描述符引用的文件上的任何一把锁都会释放（这些锁都是该进程设置的）dup，close

```
https://blog.csdn.net/lqt641/article/details/54605920#使用-dup-复制文件描述符
```

2. 由 fork 产生的子进程不继承父进程所设置的锁。这意味着，若一个进程得到一把锁， 然后调用 fork，那么对于父进程获得的锁而言，子进程被视为另一个进程。对于通过 fork 从父进程处继承过来的描述符，子进程需要调用 fcntl 才能获得它自己的锁
3. 在执行 exec 后，新程序可以继承原执行程序的锁。但是注意，如果对一个文件描述符设置 了执行时关闭标志，那么当作为 exec 的一部分关闭该文件描述符时，将释放相应文件的所有锁

### FreeBSD实现

前面已经给出了 open、fork 以及 dup 调用后的数据结构（见图 3-9 和图 8-2）

在原来的这些图上新加了 lockf 结构

### 建议性锁和强制性锁

建议性锁：就是内核不去维护这个锁，程序员自己要遵守这个原则

强制性锁会让内核检查每一个 open、read 和 write，验证调用进程是否违背了正在访问 的文件上的某一把锁。强制性锁有时也称为强迫方式锁

## I/O 多路转接

从一个fd读，然后写到另一个fd，不去设置O_NOBLOCK，就会是阻塞IO，很常见

#### 但是如果必须从两个fd去读，那么任意一个fd被阻塞，另外一个fd就无法处理数据了

telnet命令结构：从终端读（std-in)，将数据写到网络连接上，同时从网络连接读，将所得数据写到终端上(std-out)，在网络另一端，telnetd守护进程读用户的命令，发送给shell，将shell执行的结果通过telnet命令发送给用户，并显示在终端上，如同登入了远程机器了

telnet进程有两个输入，两个输出，**也就是两个fd要去读**

终端用户写给telnet，网络连接返回给telnet；telnet输出给网络连接，telnet输出到终端给用户

1. 所以不能对两个输入中任意一个使用阻塞read，所以处理方式是使用**两个进程（fork）**来处理：telnet父进程读用户输入的，telnet子进程读网络连接返回的，那么就可以使用阻塞读了，但是还有问题的，子进程由于网络断了，导致子进程终止，然后父进程接受到了子进程结束的信号SIGCHLD，这ok，但是如果父进程由于终端输入了文件结束符而终止，那么应该通知子进程停止，但是这需要引入另一个信号，更加复杂。
2. 如果使用**两个线程来处理**，也会很复杂。
3. 如果仍旧一个进程处理，使用**非阻塞IO**来处理，基本思想就是**轮询**，但是浪费cpu

Ps: 将两个输入描述符都设置为非阻塞的，对第一个描述符发一个 read。如果该输入上有数据，则 读数据并处理它。如果无数据可读，则该调用立即返回。然后对第二个描述符作同样的处理。在 此之后，等待一定的时间（可能是若干秒），然后再尝试从第一个描述符读。这种形式的循环称 为**轮询**
这种方法的不足之处是浪费 CPU 时间。大多数时间实际上是无数据可读，因此执行 read 系统调用浪费了时间
在每次循环后要等多长时间再执行下一轮循环也很难确定
虽然轮询技术 在支持非阻塞 I/O 的所有系统上都可使用，但是在多任务系统中应当避免使用这种方法

4. 使用**异步IO**，基本思想就是，当fd可以进程IO了，用信号通知内核，不是直接系统调用read，但是也会有问题一：移植性问题；问题二：两个fd发给内核的信号必须区分，导致如果fd不止两个，那**有限数量的信号无法满足**啊，而且为了确定fd是否准备好了，任然要将两个fd设置为非阻塞，并且顺序尝试执行IO
5. 使用IO多路转接，先构造一张fd列表，然后调用一个函数直到fd中的一个准备好了才返回告知进程哪些fd准备好了，和4比没有发信号，函数阻塞（有超时设置）直到一个fd准备好了IO，poll，pselect，select都是这种函数

## select和pselect

```c
#include <sys/select.h>
int select(int maxfdpl,fd_set *restrict readfds,fd_set *restrict writefds,fd_set *restrict exceptfds,struct timeval *restrict tvptr);
```

tvptr就是等待的时间

readfds

fd0  fd1  fd2
0     0      0    ...

writefds

exceptfds

这三个可以通过下面宏来操作fd，如果是null，表示不关心

```c
#include <sys/select.h>
int FD_ISSET(int fd, fd_set *fdset);//返回值：若 fd 在描述符集中，返回非 0 值；否则，返回 0
void FD_CLR(int fd, fd_set *fdset);
void FD_SET(int fd, fd_set *fdset);
void FD_ZERO(fd_set *fdset);
```

maxfdpl：最大fd编号+1，在 3 个描述符集中找出最大描述符编号值，然后加 1

或者可以设置为FD_SETSIZE，最大值，通常是1024，但是一般程序不会使用这么多fd，通常3-10个，这样内核就只需要在此范围内寻找打开的位

比如 readset 有fd(0)，fd(3)；write有fd(1)，fd(2)

```
fd(0)             fd(3)
1     0     0     1...

      fd(1) fd(2)
0     1     1     0...
```

那么maxfdpl:4，也就是前四个位去寻找

```c
#include <sys/select.h>
int pselect(int maxfdp1, fd_set *restrict readfds,fd_set *restrict writefds, fd_set *restrict exceptfds,const struct timespec *restrict tsptr,const sigset_t *restrict sigmask);
```

maxfdp1一样

readfds，writefds，exceptfds一样

tsptr支持更加准确的时间，而且是const，pselect不能改变这个值

sigmask为了调用函数的时候可以安装这个参数的屏蔽字，返回的时候再回复以前的屏蔽字

## 函数poll

类似select，但是接口不同

```c
#include <poll.h>
int poll(struct pollfd fdarray[],nfds_t nfds,int timeout);
//SVR4这样声明：struct pollfd *fdarray，和上面等效在c语言中
struct pollfd {
    int fd;/* file descriptor to check, or < 0 to ignore */
    short events;/* events of interest on fd */
    short revents;/* events that occurred on fd 由内核设置*/
};
```

没有这个概念了：读，写，异常的fd集

pollfd：fd，感兴趣的事件，已经发生的事件

nfds unsigned long

poll没有修改events成员，与select不同，select修改参数来指示哪个fd已经准备好

与 select 一样，一个描述符是否阻塞不会影响 poll 是否阻塞。有超时设置，而且就算一个fd阻塞在那里，只要其他fd准备好了，依旧可以返回

## 异步IO

select和poll实现了异步通知

关于描述符的状态，系统并 不主动告诉我们任何信息，我们需要进行查询（调用 select 或 poll）

而前面提到的缺点，信号不够，否则无法区分信号对应哪一个fd

SUSv4 中将通用的异步 I/O 机制从实时扩展部分调整到基本规范部分。这种机制解决了这些 陈旧的异步 I/O 设施存在的局限性。

POSIX异步IO接口会有问题

### System V 异步IO

System V 的异步 I/O 信号是 SIGPOLL

### BSD异步IO

异步 I/O 是信号 SIGIO 和 SIGURG 的组合

### POSIX异步IO

这些异步 I/O 接口使用 AIO 控制块来描述 I/O 操作



```c
struct aiocb{
    int aio_field;//表示被打开用来读或者写的fd
    off_t aio_offset;//读或写的文件偏移量，O_APPEND追加模式系统会忽略这个参数
    volatile void *aio_buf;//缓冲区指针
    size_t aio_nbytes;//每次复制数据的大小
    int aio_reqprio;//排序，但是不一定起作用
    struct sigevent aio_sigevent;//完成IO事件后调用
    int aio_lio_opcode;//只能用于基于列表的异步IO
}
struct sigevent{
    int sigev_notify;//通知方式 不通知[0] 通知[1] 通知[2]
    int sigev_signo;//通知[1] 如果要通知的话，指定信号；如果信号处理程序指定SA_SIGINFO，那么支持排队信号，就会传递siginfo结构，其中si_value会被设置sigev_value[1]
    union sigval sigev_value;//[1] [2]
    void (*sigev_function)(union sigval);//通知[2] 指定这个函数被调用，而且sigev_value作为参数被传入
    pthread_attr_t *sigev_notify_attributes;//通知[2] 除非sigev_notify_attributes字段被设定为 pthread 属性结构的地址，且该结构指定了一个另外的线程属性，否则该函数将在分离状态下的一个单独的线程中执行
}

#include <aio.h>
int aio_read(struct aiocb *aiocb);
int aio_write(struct aiocb *aiocb);

int aio_fsync(int op, struct aiocb *aiocb);

int aio_error(const struct aiocb *aiocb);
```

在进行异步 I/O 之前需要先初始化 AIO 控制块，调用 aio_read 函数来进行异步读操作，或 调用 aio_write 函数来进行异步写操作

要想强制所有等待中的异步操作不等待而写入持久化的存储中，可以设立一个 AIO 控制块并 调用 aio_fsync 函数

```c
#include <aio.h>
int aio_fsync(int op, struct aiocb *aiocb);
```

如果 op 参数设定为 O_DSYNC，那么操作执行起来就会像调用了 fdatasync 一样。否则，如果 op 参数设定为 O_SYNC， 那么操作执行起来就会像调用了 fsync 一样

像 aio_read 和 aio_write 函数一样，在安排了同步时，aio_fsync 操作返回。在异步 同步操作完成之前，数据不会被持久化。AIO 控制块控制我们如何被通知，就像 aio_read 和 aio_write 函数一样。为了获知一个异步读、写或者同步操作的完成状态，需要调用 aio_error 函数

```c
#include <aio.h>
int aio_error(const struct aiocb *aiocb);
//返回值0 异步操作成功完成。需要调用 aio_return 函数获取操作返回值。
ssize_t aio_return(const struct aiocb *aiocb);
```

执行 I/O 操作时，如果还有其他事务要处理而不想被 I/O 操作阻塞，就可以使用异步 I/O。然 而，如果在完成了所有事务时，还有异步操作未完成时，可以调用 aio_suspend 函数来阻塞进 程，直到操作完成。

```c
#include <aio.h>
int aio_suspend(const struct aiocb *const list[], int nent,const struct timespec *timeout);
```

list 参数是一个指向 AIO 控制块数组的指针，nent 参数表明了数组中的条目数。数组中的空 指针会被跳过，其他条目都必须指向已用于初始化异步 I/O 操作的 AIO 控制块

当还有我们不想再完成的等待中的异步 I/O 操作时，可以尝试使用 aio_cancel 函数来取消它们

```c
#include <aio.h>
int aio_cancel(int fd, struct aiocb *aiocb);
```

还有一个函数也被包含在异步 I/O 接口当中，尽管它既能以同步的方式来使用，又能以异步的方 式来使用，这个函数就是 lio_listio。该函数提交一系列由一个 AIO 控制块列表描述的 I/O 请求

```c
#include <aio.h>
int lio_listio(int mode, struct aiocb *restrict const list[restrict],int nent, struct sigevent *restrict sigev);
```

## readv和writev

readv 和 writev 函数用于在一次函数调用中读、写多个非连续缓冲区。

散布读（scatter read）和聚集写（gather write）。

```c
#include <sys/uio.h>
sszie_t readv(int fd,const struct iovec *iov,int iovcnt);
ssize_t write(int fd,const struct iovec *iov,int iovcnt);
struct iovec{
    void *iov_base;
    size_t iov_len;
}
```

readn和writen

一次 read 操作所返回的数据可能少于所要求的数据，即使还没达到文件尾端也可能是 这样。这不是一个错误，应当继续读该设备

一次 write 操作的返回值也可能少于指定输出的字节数。这可能是由某个因素造成的， 例如，内核输出缓冲区变满

这两 个函数只是按需多次调用 read 和 write 直至读、写了 N 字节数据

```c
#include "apue.h"
ssize_t readn(int fd,void *buf,size_t nbytes);
ssize_t writen(int fd,void *buf,size_t nbytes);
```

## 存储映射IO

存储映射 I/O（memory-mapped I/O）能将一个磁盘文件映射到存储空间中的一个缓冲区上， 于是，当从缓冲区中取数据时，就相当于读文件中的相应字节。与此类似，将数据存入缓冲区时， 相应字节就自动写入文件

存储映射 I/O 伴随虚拟存储系统已经用了很多年

为了使用这种功能，应首先告诉内核将一个给定的文件映射到一个存储区域中

```c
#include <sys/mman.h>
void *mmap(void *addr,size_t len,int prot,int flag,int fd,off_t off);
//flag
MAP_FIXED
MAP_SHARED
MAP_PRIVATE
```

新程序则不能通过 exec 继承存储映射区，调用 mprotect 可以更改一个现有映射的权限

```c
#include <sys/mman.h>
int mprotect(void *addr, size_t len, int prot);
```

如果共享映射中的页已修改，那么可以调用 msync 将该页冲洗到被映射的文件中。msync 函数类似于 fsync（见 3.13 节），但作用于存储映射区

```c
#include <sys/mman.h>
int msync(void *addr, size_t len, int flags);
```

当进程终止时，会自动解除存储映射区的映射，或者直接调用 munmap 函数也可以解除映射区。

关闭映射存储区时使用的文件描述符 并不解除映射区

```c
#include <sys/mman.h>
int munmap(void *addr, size_t len);
```

对于 MAP_SHARED 区磁盘文件的更新，会在我们将数据写到存储映射区后的某个时刻， 按内核虚拟存储算法自动进行。在存储区解除映射后，对 MAP_PRIVATE 存储区的修改会被丢弃