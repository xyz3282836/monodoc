# 第五章 标准 IO

标准 IO 不仅仅是 unix 实现了。

这个库是 ISO C 标准说明。

Single UNIX Specification 对 ISO C 进行了补充，定义了另外一些接口。

## 流和 FILE 对象

第三章围绕 fd，而这章函数围绕流

流的定向决定了读写字符是单字节还是多字节-宽

在未定义的流上使用单字节 IO 函数或者多字节 IO 函数，则流的定向将被设置单或者宽

只有两个函数可以改变流的定向：freopen 和 fwide

```c
#include <stdio.h>
#include <wchar.h>
int fwide(FILE *fp,int mode);//流宽定向返回正值，字节定向返回负值，为定向返回0
设定流的定向，前提条件是未被设定流的定向
流可能无效，那么需要前后检查errno

macos的FILE定义
typedef	struct __sFILE {
	unsigned char *_p;	/* current position in (some) buffer */
	int	_r;		/* read space left for getc() */
	int	_w;		/* write space left for putc() */
	short	_flags;		/* flags, below; this FILE is free if 0 */
	short	_file;		/* fileno, if Unix descriptor, else -1 */
	struct	__sbuf _bf;	/* the buffer (at least 1 byte, if !NULL) */
	int	_lbfsize;	/* 0 or -_bf._size, for inline putc */

	/* operations */
	void	*_cookie;	/* cookie passed to io functions */
	int	(* _Nullable _close)(void *);
	int	(* _Nullable _read) (void *, char *, int);
	fpos_t	(* _Nullable _seek) (void *, fpos_t, int);
	int	(* _Nullable _write)(void *, const char *, int);

	/* separate buffer for long sequences of ungetc() */
	struct	__sbuf _ub;	/* ungetc buffer */
	struct __sFILEX *_extra; /* additions to FILE to not break ABI */
	int	_ur;		/* saved _r when _r is counting ungetc data */

	/* tricks to meet minimum requirements even when malloc() fails */
	unsigned char _ubuf[3];	/* guarantee an ungetc() buffer */
	unsigned char _nbuf[1];	/* guarantee a getc() buffer */

	/* separate buffer for fgetln() when line crosses buffer boundary */
	struct	__sbuf _lb;	/* buffer for fgetln() */

	/* Unix stdio files get aligned to block boundaries on fseek() */
	int	_blksize;	/* stat.st_blksize (may be != _bf._size) */
	fpos_t	_offset;	/* current lseek offset (see WARNING) */
} FILE


/* stdio buffers */
struct __sbuf {
	unsigned char	*_base;
	int		_size;
};
```

## 缓冲

全缓冲

满了才 flush

行缓冲

遇到换行符就 flush，终端是行缓冲

不带缓冲

一般标准错误就是不带缓冲的

更改系统缓冲类型

```c
#include <stdio.h>
void setbuf(FILE *restrict fp,char *restrict buf);//通常全缓冲
int setvbuf(FILE *restrict fp,char *restrict buf,int mode,size_t size);
setvbuf(fp,buf,_IOFBF,BUFSIZE) 相当于 setbuf(fp,buf)
/*
mode:
_IOFBF
_IOLBF
_IONBF
*/
使该流所有未写的数据都被传送至内核
int fflush(FILE *fp);//出错返回EOF
```

## 打开流

```c
#include <stdio.h>
FILE *fopen(const char *restrict pathname,const char *restrict type);
FILE *freopen(const char *restrict pathname,const char *restrict type,FILE *restrict stream);
FILE *fdopen(int fd,const char *type);
type:15种不同的值
/*

*/
int fclose(FILE *fp);
```

fopen：文件名打开

freopen：指定一个流上打开文件

fdopen：fd 打开，一般用于管道和网络通信

ps：ISO C 并不涉及文件描述符 fd，而 POSIX.1 具有

## 读和写流

打开流有三种不同类型的非格式化 IO

1. 每次一个字符的 IO
2. 每次一行的 IO，可用 fgets 和 fputs
3. 直接 IO(别称：二进制 IO)，可用 fread 和 fwrite

```c
#include <stdio.h>
输入函数
int getc(FILE *fp);
int fgetc(FILE *fp);
int getchar(void);
/*
getchar等同于getc(stdin)
getc和fgetc：
*/
输出函数
int putc(int c,FILE *fp);
int fputc(int c,FILE *fp);
int putchar(int c);
```

3 个函数出错和到达文件尾端都是返回相同值，需要下面两个函数做区分

大多数每个流在 FILE 对象中维护两个标志

出错标志

文件结束标志

```c
#include <stdio.h>
int ferror(FILE *fp);
int feof(FILE *fp);

void clearerr(FILE *fp);

int ungets(int c,FILE *fp);//实质也是写到缓冲区
```

clearerr 可以清除上面两个标志

从流中读取数据，可以用 ungetc 将字符再压回流中

## 行 IO

```c
#include <stdio.h>
char *fgets(char *restrict buf,int n,FILE *restrict fp);//从指定流读到缓冲区
char *gets(char *buf);//从标准输入读，不推荐用了

int fput(const char *restrict str,FILE *restrict fp);//写到指定流
int puts(const char *str);//还是不用用
```

## 二进制 IO

```c
#include <stdio.h>
size_t fread(void *restrict ptr,size_t size,size_t nobj,FILE *restrict fp);
size_t fwrite(const void *restrict ptr,size_t size,size_t nobj,FILE *restrict fp);
```

## 定位流

ftell,fseek 文件位置放在一个长整型中

ftello,fseeko 使用 off_t

fgetpos,fsetpos 使用抽象数据类型 fpos_t，非 UNIX 系统可以使用

```c
#include <stdio.h>
long ftell(FILE *fp);//success:当前文件位置指示 fail:-1L
int fseek(FILE *fp,long offset,int whence);
void rewind(FILE *fp);//将流设置到文件其实位置

off_t ftello(FILE *fp);//与ftell大致相同
int fseeko(FILE *fp,off_t offset,int whence);//与fseek相同

int fgetpos(FILE *restrict fp,fpos_t *restrict pos);
int fsetpos(FILE *fp,const fpos_t *pos);

```

## 格式化 IO

```c
#include <stdio.h>
int printf
int fprintf
int dprintf
int sprintf
int snprintf

#include <stdio.h>
#include <stdarg.h>
printf变体
int vprintf
int vfprintf
int vdprintf
int vsprintf
int vsnprintf

#include <stdio.h>
int scanf
int fscanf
int sscanf

#include <stdio.h>
#include <stdarg.h>
int vscanf
int vfscanf
int vsscanf

```

## 实现

```c
#include <stdio.h>
int fileno(FILE *fp);//对一个流使用，获取这个流的fd
```

标准 IO 库最终都要调用第三章的 IO 历程

## 临时文件

```c
#inlucde <stdio.h>
char *tmpnam(char *ptr);//产生一个有效路径名字符串
FILE *tmpfile(void);//先产生一个唯一路径名，然后，用此创建一个文件，并立即unlink

#include <stdlib.h>
char *mkdtemp(char *template);//创建目录

int mkstemp(char *template);//创建名字 返回fd
```

应该使用 tmpfile 和 mkstemp

## 内存流

```c
#include <stdio.h>
FILE *fmemopen(void *restrict buf,size_t size,const char *restrict type);
#include <stdio.h>
FILE *open_memstream(char **bufp,size_t *sizep);
#include <wchar.h>
FILE *open_wmemstream(wchar_t **bufp,size_t *sizep);
```

## 标准 IO 的替代软件

快速 IO 库 fio

sfio

mmap

## 习题

标准 IO 流怎么使用 fsync

先调用 fflush( 全都送到内核)，再调用 fsync(内核写到缓冲区，然后才能写入磁盘，fd 可以通过 fileno 获取)

fgets 通常处理行缓冲，自动冲洗的
