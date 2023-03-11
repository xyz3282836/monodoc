# make apue

for i in lib intro sockets advio daemons datafiles db environ fileio filedir ipc1 ipc2 proc pty relation signals standards stdio termios threadctl threads printer exercises; do \

​ (cd $i && echo "making $i" && /Applications/Xcode.app/Contents/Developer/usr/bin/make ) || exit 1; \

​ done

making lib

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o bufargs.o bufargs.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o cliconn.o cliconn.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o clrfl.o clrfl.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o daemonize.o daemonize.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o error.o error.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o errorlog.o errorlog.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o lockreg.o lockreg.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o locktest.o locktest.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o openmax.o openmax.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o pathalloc.o pathalloc.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o popen.o popen.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o prexit.o prexit.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o prmask.o prmask.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ptyfork.o ptyfork.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ptyopen.o ptyopen.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o readn.o readn.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o recvfd.o recvfd.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o senderr.o senderr.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sendfd.o sendfd.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o servaccept.o servaccept.c

**servaccept.c:26:40:** **warning:** **sizeof on pointer operation will return size of**

​ **'char \*' instead of 'char [104]' [-Wsizeof-array-decay]**

​ if ((name = malloc(sizeof(un.sun_path + 1))) == NULL)

​ **~~~~~~~~~~~ ^**

1 warning generated.

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o servlisten.o servlisten.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o setfd.o setfd.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o setfl.o setfl.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o signal.o signal.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o signalintr.o signalintr.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleepus.o sleepus.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o spipe.o spipe.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o tellwait.o tellwait.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ttymodes.o ttymodes.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o writen.o writen.c

ar rv libapue.a bufargs.o cliconn.o clrfl.o daemonize.o error.o errorlog.o lockreg.o locktest.o openmax.o pathalloc.o popen.o prexit.o prmask.o ptyfork.o ptyopen.o readn.o recvfd.o senderr.o sendfd.o servaccept.o servlisten.o setfd.o setfl.o signal.o signalintr.o sleepus.o spipe.o tellwait.o ttymodes.o writen.o

ar: creating archive libapue.a

a - bufargs.o

a - cliconn.o

a - clrfl.o

a - daemonize.o

a - error.o

a - errorlog.o

a - lockreg.o

a - locktest.o

a - openmax.o

a - pathalloc.o

a - popen.o

a - prexit.o

a - prmask.o

a - ptyfork.o

a - ptyopen.o

a - readn.o

a - recvfd.o

a - senderr.o

a - sendfd.o

a - servaccept.o

a - servlisten.o

a - setfd.o

a - setfl.o

a - signal.o

a - signalintr.o

a - sleepus.o

a - spipe.o

a - tellwait.o

a - ttymodes.o

a - writen.o

ranlib libapue.a

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleep.o sleep.c

making intro

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getcputc.c -o getcputc -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE hello.c -o hello -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE ls1.c -o ls1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mycat.c -o mycat -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE shell1.c -o shell1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE shell2.c -o shell2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE testerror.c -o testerror -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE uidgid.c -o uidgid -L../lib -lapue

making sockets

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ruptime.o ruptime.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o clconn2.o clconn2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o ruptime ruptime.o clconn2.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ruptimed.o ruptimed.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o initsrv2.o initsrv2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o ruptimed ruptimed.o initsrv2.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ruptimed-fd.o ruptimed-fd.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o ruptimed-fd ruptimed-fd.o initsrv2.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ruptimed-dg.o ruptimed-dg.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o ruptimed-dg ruptimed-dg.o initsrv2.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE findsvc.c -L../lib -lapue -o findsvc

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE ruptime-dg.c -L../lib -lapue -o ruptime-dg

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o clconn.o clconn.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o initsrv1.o initsrv1.c

making advio

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE deadlock.c -o deadlock -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mandatory.c -o mandatory -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mcopy2.c -o mcopy2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE nonblockw.c -o nonblockw -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE rot13a.c -o rot13a -L../lib -lapue

./fixup.awk rot13a.c >xlate

sed '/same/q' rot13c2.c.in >rot13c2.c

cat xlate >>rot13c2.c

sed '1,/same/d' rot13c2.c.in >>rot13c2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE rot13c2.c -o rot13c2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o lockfile.o lockfile.c

making daemons

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o init.o init.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o reread.o reread.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o reread2.o reread2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o single.o single.c

making datafiles

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE strftime.c -o strftime -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o getpwnam.o getpwnam.c

making db

gcc -fPIC -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c db.c

gcc -shared -Wl,-dylib -o libapue_db.so.1 -L../lib -lapue -lc db.o

ln -s libapue_db.so.1 libapue_db.so

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -I. t4.c

gcc -R. -o t4 t4.o -L../lib -L. -lapue_db -lapue

ar rsv libapue_db.a db.o

ar: creating archive libapue_db.a

a - db.o

ranlib libapue_db.a

making environ

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE doatexit.c -o doatexit -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE echoarg.c -o echoarg -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getrlimit.c -o getrlimit -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE hello1.c -o hello1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE testjmp.c -o testjmp -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o opendata.o opendata.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o scope.o scope.c

making fileio

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE fileflags.c -o fileflags -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE hole.c -o hole -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mycat.c -o mycat -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE seek.c -o seek -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o setfl.o setfl.c

making filedir

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE access.c -o access -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE cdpwd.c -o cdpwd -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE changemod.c -o changemod -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE devrdev.c -o devrdev -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE filetype.c -o filetype -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mycd.c -o mycd -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE umask.c -o umask -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE unlink.c -o unlink -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE ftw8.c -o ftw8 -L../lib -lapue

making ipc1

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE add2.c -o add2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE add2stdio.c -o add2stdio -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE devzero.c -o devzero -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE myuclc.c -o myuclc -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pipe1.c -o pipe1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pipe2.c -o pipe2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pipe4.c -o pipe4 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE popen1.c -o popen1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE popen2.c -o popen2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE tshm.c -o tshm -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o popen.o popen.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o slock.o slock.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o tellwait.o tellwait.c

making ipc2

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE bindunix.c -o bindunix -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pollmsg.c -o pollmsg -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE sendmsg.c -o sendmsg -L../lib -lapue

for i in open opend open.fe opend.fe; do \

​ (cd $i && /Applications/Xcode.app/Contents/Developer/usr/bin/make ) || exit 1; \

​ done

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o main.o main.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o open.o open.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o openclient main.o open.o -L../../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o main.o main.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o request.o request.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o cliargs.o cliargs.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o client.o client.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o loop.poll.o loop.poll.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o opend.poll main.o cliargs.o client.o request.o loop.poll.o \

​ -L../../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o loop.select.o loop.select.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o opend.select main.o cliargs.o client.o request.o loop.select.o \

​ -L../../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o main.o main.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o open.o open.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o openclient main.o open.o -L../../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o main.o main.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o request.o request.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o cliargs.o cliargs.c

gcc -ansi -I../../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o opend main.o cliargs.o request.o -L../../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

making proc

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE echoall.c -o echoall -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE exec1.c -o exec1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE exec2.c -o exec2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE fork1.c -o fork1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE fork2.c -o fork2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE nice.c -o nice -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pruids.c -o pruids -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE tellwait1.c -o tellwait1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE tellwait2.c -o tellwait2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE test1.c -o test1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE times1.c -o times1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE vfork1.c -o vfork1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE wait1.c -o wait1 -L../lib -lapue

**wait1.c:31:10:** **warning:** **division by zero is undefined [-Wdivision-by-zero]**

​ status /= 0; /\* divide by 0 g...

​ **^ ~**

1 warning generated.

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o system.o system.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o systest1.o systest1.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o systest1 systest1.o system.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o systest3.o systest3.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o systest3 systest3.o system.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -DHAS_AXSIG -DHAS_ACORE -o pracct pracct.c -L../lib -lapue

making pty

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o main.o main.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o loop.o loop.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o driver.o driver.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o pty main.o loop.o driver.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

making relation

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE orphan3.c -o orphan3 -L../lib -lapue

making signals

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE critical.c -o critical -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mask.c -o mask -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE read1.c -o read1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE read2.c -o read2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE reenter.c -o reenter -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE sigtstp.c -o sigtstp -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE sigusr.c -o sigusr -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE suspend1.c -o suspend1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE suspend2.c -o suspend2 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o systest2.o systest2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o system.o system.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o systest2 systest2.o system.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o tsleep2.o tsleep2.c

**tsleep2.c:31:4:** **warning:** **variable 'k' is uninitialized when used here**

​ **[-Wuninitialized]**

​ k += i \* j;

​ **^**

**tsleep2.c:22:16: note:** initialize the variable 'k' to silence this warning

​ volatile int k;

​ **^**

​ = 0

1 warning generated.

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleep2.o sleep2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o tsleep2 tsleep2.o sleep2.o -L../lib -lapue

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o abort.o abort.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleep1.o sleep1.c

making standards

grep -v "^#" sysconf-lim.sym >sysconf.sym

grep -v "^#" pathconf-lim.sym >pathconf.sym

awk -f makeconf.awk >conf.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE conf.c -o conf -L../lib -lapue

grep -v "^#" sysconf-opt.sym >sysopt.sym

grep -v "^#" pathconf-opt.sym >pathopt.sym

awk -f makeopt.awk >options.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE options.c -o options -L../lib -lapue

making stdio

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE buf.c -o buf -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE fgetsfputs.c -o fgetsfputs -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getcharbug.c -o getcharbug -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getcputc.c -o getcputc -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE mkstemp.c -o mkstemp -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE tempfiles.c -o tempfiles -L../lib -lapue

making termios

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE csize.c -o csize -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE settty.c -o settty -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE t_getpass.c -o t_getpass -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE t_isatty.c -o t_isatty -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE t_raw.c -o t_raw -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE t_ttyname.c -o t_ttyname -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE winch.c -o winch -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ctermid.o ctermid.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o getpass.o getpass.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o isatty.o isatty.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o ttyname.o ttyname.c

making threadctl

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE atfork.c -o atfork -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE suspend.c -o suspend -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o detach.o detach.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o getenv1.o getenv1.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o getenv2.o getenv2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o getenv3.o getenv3.c

making threads

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE badexit2.c -o badexit2 -L../lib -lapue -pthread

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE cleanup.c -o cleanup -L../lib -lapue -pthread

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE exitstatus.c -o exitstatus -L../lib -lapue -pthread

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE threadid.c -o threadid -L../lib -lapue -pthread

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o condvar.o condvar.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o maketimeout.o maketimeout.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o mutex1.o mutex1.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o mutex2.o mutex2.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o mutex3.o mutex3.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o rwlock.o rwlock.c

making printer

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o print.o print.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o util.o util.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o print print.o util.o ../sockets/clconn2.o -L../lib -L../lib -lapue -pthread

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o printd.o printd.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -o printd printd.o util.o ../sockets/clconn2.o ../sockets/initsrv2.o \

​ -L../lib -L../lib -lapue -pthread

clang: **warning:** argument unused during compilation: '-ansi' [-Wunused-command-line-argument]

making exercises

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE bo.c -o bo -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE fifo1.c -o fifo1 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getlogin.c -o getlogin -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE goodexit.c -o goodexit -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE longpath.c -o longpath -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE pendlock.c -o pendlock -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE prtime.c -o prtime -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE sizepipe.c -o sizepipe -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE vfork3.c -o vfork3 -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE zombie.c -o zombie -L../lib -lapue

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o asyncsocket.o asyncsocket.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o fmemopen.o fmemopen.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o openmax.o openmax.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleep.o sleep.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleepus_poll.o sleepus_poll.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE -c -o sleepus_select.o sleepus_select.c

gcc -ansi -I../include -Wall -DMACOS -D_DARWIN_C_SOURCE getpw44bsd.c -o getpw44bsd -L../lib -lapue
