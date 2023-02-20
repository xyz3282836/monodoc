# 第十六章 网络IPC 套接字

## 套接字描述

套接字是通信端点的抽象

**套接字描述符**：正如使用文件描述符访问文件，应用程序用套接字描述符访问套接字

套接字描述符在 UNIX 系统中被当作是一种文件描述符

许多处理文件描述符的 函数（如 read 和 write）可以用于处理套接字描述符

为创建一个套接字，调用 socket 函数

```c
#include <sys/socket.h>
int socket(int domain,int type,int protocol);
```

参数 domain（域）确定通信的特性

AF_INET IPv4

AF_INET6 IPv6

AF_UNIX 别名 AF_LOCAL unix域

AF_UPSPEC

参数 type 确定套接字的类型，进一步确定通信特征

SOCK_DGRAM 默认UDP 无连接 报文

SOCK_RAW 直接访问下面的网络层 应用程序负责构造自己的协议头部，这是因为传输协议（如 TCP 和 UDP） 被绕过了

SOCK_SEQPACKET 面向连接 报文

SOCK_STREAM 默认tcp 面向连接 字节流

参数 protocol 通常是 0，表示为给定的域和套接字类型选择默认协议

当对同一域和套接字 类型支持多个协议时，可以使用 protocol 选择一个特定协议

因特网域套接字定义的协议：

IPPROTO_IP IPv4

IPPROTO_IPV6 IPv6

IPPROTO_ICMP 

IPPROTO_RAW

IPPROTO_TCP tcp

IPPROTO_UDP udp



套接字通信是双向的。可以采用 shutdown 函数来禁止一个套接字的 I/O

```c
#include <sys/socket.h>
int shutdown(int sockfd,int flow);
```

如果 how 是 SHUT_RD（关闭读端），那么无法从套接字读取数据。
如果 how 是 SHUT_WR（关闭写 端），那么无法使用套接字发送数据。
如果 how 是 SHUT_RDWR，则既无法读取数据，又无法发送数据

## 寻址

进程标识：计算机的网络地址 + 计算机上用端口号表示的服务

### 字节序

big-endian：最大字节地址出现在最低有效字节

little-endian：最低有效字节包含最小字节地址

不管字节如何排序，最高有效字节总是在左边msb，最低有效字节总是在右边lsb

0x04030201：msb包含4，lsb包含1

大端 cp来存，cp[0]=4

小端 cp来存，cp[0]=1

网络协议指定了字节序，TCP/IP 协议栈使用大端字节序

对于 TCP/IP 应用程序，有 4 个用来在处理器字节序和网络字节序之间实施转换的函数

```c
#include <arpa/inet.h>
uint32_t htonl(uint32_t hostint32);//返回值：以网络字节序表示的 32 位整数
uint16_t htons(uint16_t hostint16);//返回值：以网络字节序表示的 16 位整数
uint32_t ntohl(uint32_t netint32);//返回值：以主机字节序表示的 32 位整数
uint16_t ntohs(uint16_t netint16);//返回值：以主机字节序表示的 16 位整数
```

h 表示“主机”字节序，n 表示“网络”字节序。l 表示“长”（即 4 字节）整数，s 表示“短” （即 4 字节）整数

### 地址格式

```c
为使不同格式地址能够传入到套接字函数，地址会被强制转换成一个通用的地址结构 sockaddr
struct sockaddr{
    sa_family_t sa_family;
    char sa_data[];//linux sa_data[14];
    ...
}
在 IPv4 因特网域（AF_INET）中，套接字 地址用结构 sockaddr_in 表示
struct socketaddr_in{
	sa_family_t sin_family;
	in_port_t sin_port;
	struct in_addr sin_addr;
}
struct in_addr{
	in_addr_t s_addr;
}
与 AF_INET 域相比较，IPv6 因特网域（AF_INET6）套接字地址用结构 sockaddr_in6 表示
struct socketaddr_in6{
	sa_family_t sin6_family;
	in_port_t sin6_port;
	uint32_t sin6_flowinfo;
	uint32_t sin6_scope_id;
	struct in6_addr sin6_addr;
}
struct in6_addr{
	uint8_t s6_addr[16];
}
```

尽管 **sockaddr_in** 与 **sockaddr_in6** 结构相差比较大，但它们均被强制转换成 **sockaddr** 结构输入到套接字例程中

二进制地址格式与点分十进制字符表示（a.b.c.d）之间的相互转换的两个函数

```c
#include <arpa/inet.h>
const char *inet_ntop(int domain,const void *restrict addr,char *restrict str,socketlen_t size);
int inet_pton(int domain,const char *restrict str,void *restrict addr);
```

参数 domain 仅支持两个值：AF_INET 和 AF_INET6

### 地址查询

通过调用 gethostent，可以找到给定计算机系统的主机信息

```c
#include <netdb.h>
struct hostent *gethostent(void);
void sethostent(int stayopen);
void endhostent(void);
计算机系统的主机信息
struct hostent{
    
}
```

能够采用一套相似的接口来获得网络名字和网络编号

```c
#include <netdb.h>
struct netent *getnetbyaddr(uint32_t net,int type);
struct netent *getnetbyname(const char *name);
struct netent *getnetent(void);
void setnetent(int stayopen);
void endnetent(void);
网络名字和网络编号
struct netent{
    
}
```

可以用以下函数在协议名字和协议编号之间进行映射

```c
#include <netdb.h>
struct protoent *getprotobyname(const char *name);
struct protoent *getprotobynumber(int proto);
struct protoent *getprotoent(void);

void setprotoent(int stayopen);
void endprotoent(void);
协议
struct protoent{
    
}
```

可以 使用函数 getservbyname 将一个服务名映射到一个端口号，使用函数 getservbyport 将一 个端口号映射到一个服务名，使用函数 getservent 顺序扫描服务数据库。

```c
#include <netdb.h>
struct servent *getservbyname(const char *name, const char *proto);
struct servent *getserbyport(int port, const char *proto);
struct servent *getservent(void);

void setservent(int stayopen);
void endservent(void);
服务名
struct servent{
    
}
```

getaddrinfo 函数允许将一个主机名和一个服务名映射到一个地址

```c
#include <sys/socket.h>
#include <netdb.h>
int getaddrinfo(const char *restrict host,
				const char *restrict service,
				const struct addrinfo *restrict hint,
				struct addrinfo **restrict res);

void freeaddrinfo(struct addrinfo *ai);
struct addrinfo{
    int ai_flags;
    int ai_family;// domain 域
    int ai_socktype;//类型
    int ai_protocol;//协议
    socklen_t ai_addrlen;
    struct sockaddr *ai_addr;
    char *ai_canonname;
    struct addrinfo *ai_next;
    ...
}
```

可以提供一个可选的 hint 来选择符合特定条件的地址。hint 是一个用于过滤地址的模板，包 括 ai_family、ai_flags、ai_protocol 和 ai_socktype 字段

getnameinfo 函数将一个地址转换成一个主机名和一个服务名

```c
#include <sys/socket.h>
#include <netdb.h>
int getnameinfo(const struct sockaddr *restrict addr, 
                socklen_t alen,
				char *restrict host, 
                socklen_t hostlen,
				char *restrict service, 
                socklen_t servlen, 
                int flags);
```

### 套接字与地址关联

给一个接收客户端请求的服务器套接字关联上一个众所周知的地址

客户端应 有一种方法来发现连接服务器所需要的地址，最简单的方法就是服务器保留一个地址并且注册在 /etc/services 或者某个名字服务中

使用 bind 函数来关联地址和套接字

```c
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *addr, socklen_t len);
```

可以调用 getsockname 函数来发现绑定到套接字上的地址

```c
#include <sys/socket.h>
int getsockname(int sockfd, struct sockaddr *restrict addr,socklen_t *restrict alenp);
int getpeername(int sockfd, struct sockaddr *restrict addr,socklen_t *restrict alenp);
```

## 建立连接

```c
#include <sys/socket.h>
int connect(int sockfd,const struct sockaddr *addr,socket_t len);
```

服务器调用 listen 函数来宣告它愿意接受连接请求。

```c
#include <sys/socket.h>
int listen(int sockfd, int backlog);
```

参数 backlog 提供了一个提示，提示系统该进程所要入队的未完成连接请求数量

一旦服务器调用了 listen，所用的套接字就能接收连接请求。使用 accept 函数获得连接 请求并建立连接

```c
#include <sys/socket.h>
accept(int sockefd,struct socketaddr *addr,socklen_t *restrict len);
```

函数 accept 所返回的文件描述符是套接字描述符，该描述符连接到调用 connect 的客户端

这个新的套接字描述符和原始套接字（sockfd）具有相同的套接字类型和地址族

传给 accept 的原始套接字没有关联到这个连接，而是继续保持可用状态并接收其他连接请求

返回时，accept 会在缓冲区填充客户端的地址，并且更新指向 len 的整数来反映该地址的大小

如果没有连接请求在等待，accept 会阻塞直到一个请求到来。如果 sockfd 处于非阻塞模式， accept 会返回−1，并将 errno 设置为 EAGAIN 或 EWOULDBLOCK

## 数据传输

尽管可以通过 read 和 write 交换数据，但这就是这两个函数所能做的一切

3 个函数用来发送数据，3 个用于接收数据

最简单的是 send，它和 write 很像，但是可以指定标志来改变处理传输数据的方式

对于字节流协议，send 会阻塞直到整个数据传 输完成。函数 sendto 和 send 很类似。区别在于 sendto 可以在无连接的套接字上指定一个目 标地址

```c
#include <sys/socket.h>
ssize_t send(int sockfd,const void *buf,size_t nbytes,int flags);
ssize_t sendto(int sockfd, const void *buf, size_t nbytes, int flags,const struct sockaddr *destaddr, socklen_t destlen);
```

通过套接字发送数据时，还有一个选择。可以调用带有 msghdr 结构的 sendmsg 来指定多 重缓冲区传输数据，这和 writev 函数很相似

```c
#include <sys/socket.h>
ssize_t sendmsg(int sockfd, const struct msghdr *msg, int flags);
```

函数 recv 和 read 相似，但是 recv 可以指定标志来控制如何接收数据。

```c
#include <sys/socket.h>
ssize_t recv(int sockfd,void *buf,size_t nbytes,int flags);
ssize_t recvfrom(int sockfd, void *restrict buf, size_t len, int flags, struct sockaddr *restrict addr, socklen_t *restrict addrlen);
//因为可以获得发送者的地址，recvfrom 通常用于无连接的套接字。否则，recvfrom 等同于recv
```

为了将接收到的数据送入多个缓冲区，类似于 readv，或者想接收辅助数据，可以使用 recvmsg

```c
#include <sys/socket.h>
ssize_t recvmsg(int sockfd, struct msghdr *msg, int flags);
```

## 套接字选项

套接字机制提供了两个套接字选项接口来控制套接字行为

1. 通用选项，工作在所有套接字类型上
2. 在套接字层次管理的选项
3. 特定于某协议的选项

```c
#include <sys/socket.h>
int setsockopt(int sockfd, int level, int option, const void *val, socklen_t len);
int getsockopt(int sockfd, int level, int option, void *restrict val, socklen_t *restrict lenp);
```

参数 level 标识了选项应用的协议

## 带外数据

TCP 支持带外数 据，但是 UDP 不支持

