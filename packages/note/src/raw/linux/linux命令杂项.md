# linux 命令杂项

## linux 个人笔记

### 1.终端控制台：最多同时开六个终端控制台

Alt+F1~Alt+F6  切换控制台

运行级别：init 0123456
0：关机
1：单用户 
2：多用户无网络
3：多用户有网络（常用）
4：系统未使用保留给用户
5：图形界面
6：系统重启

3和5比较常用

启动文件放置路径 /etc/inittab

runlevel     查看运行级别
init num     切换运行级别

logout exit 注销
startx 注销重启进入5图形界面

关机：之前最好将数据同步写入硬盘  sync
init 0
shutdown -h now  关机后停止系统
shutdown -h 1   一分钟后关机 
halt

重启：
init 6
shutdown -r now 
reboot 



### 2.文件系统

目录 root boot home bin sbin mnt etc var

/：根目录
/bin：常用命令
/sbin：超级命令，需要权限

/home：普通用户相关文件 /home/root/.bash_profile  用户变量
/root：root用户相关文件

/boot：引导相关的文件

/dev：设备文件存储目录

/mnt：临时文件系统挂载点，挂载光驱、软驱 /mnt/cdrom/
/media：即插即用型存储设备的挂载点，比如U盘、CDROM/DVD

/lib：库文件和内核模块所存放的目录

/etc：配置相关文件 
/etc/profile 环境变量文件  
/etc/passwd 用户的属性记录  
/etc/inittab  系统初始化脚本  修改运行默认级别
/etc/rc.d/init.d/ 所有的服务启动文件被储存在此目录下
/etc/rc.d/rc.sysinit 系统默认配置  

/etc/sysconfig/i18n  修改linux语言环境
/etc/sysconfig/network 修改网卡信息


/usr：非常大，所有系统软件都安装在此，系统软件默认安装目录类似windows的program file
/opt：第三方软件目录

/tmp：系统的临时目录

/var：变化的文件如日志文件和用户邮件

/srv：存放一些服务启动后需要提取的数据

/swap：用来创建虚拟内存



### 3.shell命令

-h 
--help
-字母 参数是空格加参数
--单词（长命令），用=接参数

pwd 显示当前所在的目录
dir 查看所有目录

cd 切换目录
cd.
cd.. 
cd~  用户home目录
cd- 上一个目录

mkdir 目录创建
mkdir a 建立目录
mkdir -p a/b/c

touch 创建空文件和更改时间戳
touch a.txt
touch -d 20140122 

rmdir 删除空目录

mv 移动文件和改文件名
mv oldname newname
mv 文件名（可以多个） 新目录

rm 删除文件和目录
rm -rf abc  删除所有内容 r递归 f强制

cp 复制命令
cp -r dir1 dir2 递归复制，复制子目录信息
cp mysql-* /home/



tree 显示文件和目彔树
-a 不隐藏任何以.字符开始的条目
-d 只显示目录不显示文件
-f 每个文件都显示路径
-t 根据最后修改时间排序
-L n 只显示n层目录



ll 列出来的结果详细，有时间，是否可读写等信息，像windows里的 详细信息 

ls 只列出文件名或目录名，就象windows里的列表
ls -a 显示隐藏目录
ls -t 按修改时间先后显示
ls -l 排列所有目录
ls -R 
ls -S 以文件大小排序
ls -m 横向输出文件名，并以，作分格符
ls -la 混合
ls -lah

查询的结果输入到a.txt中
写入操作很灵活
ls -l > a.txt 覆盖写
ls -la >> a.txt 追加写
grep -n 'a' a.txt > b.txt
输出 a.txt < b.txt

蓝色：目录
绿色：可执行文件
红色：压缩文件
浅蓝色：链接文件
灰色：其他文件



### 4.vi 编辑器 

查看文件
vi hello.java
cat hello.java

一、首先进入命令模式
二、a i o  进入输入模式

x 删除光标后面的字符
x 删除光标后的＃个字符

X (大写 X)，删除光标前面的字符
X 删除光标前面的#个字符

dd 删除光标所在的行
dd 删除从光标所在行数的#行

yw 复制光标所在位置的一个字
yw 复制光标所在位置的#个字

yy 复制光标所在位置的一行
yy 复制从光标所在行数的#行

p 粘贴
u 取消操作
cw 更改光标所在位置的一个字

cw 更改光标所在位置的#个字

「r」：替换光标所在处的字符。
「R」：替换光标所到之处的字符，直到按下「ESC」键为止。
「u」：如果您误执行一个命令，可以马上按下「u」，回到上一个操作。
按多次“u”可以执行多次回复。


三、esc(按键)  进入末行模式Last line mode 
: 
wq 退出保存
q！退出不保存 强退
w filename 将文章以指定的文件名 filename 保存



### 5.linux账号

u g o a
useradd ruizhou   添加用户
-u UID    用来指定UID
-g GROUP  定义用户的主要群组，GROUP必须已经存在
-G GROUP  指定用户的次要群组，可以指定多个次要群组，每个用,相连
-d HOME   指定用户的主目彔
-s SHELL  指定用户登入执行的程序
-r        建立一个系统用户的账号

passwd ruizhou 给添加用户设置密码

userdel ruizhou 删除用户
userdel -r ruizhou 删除用户及其用户主目录

高权限者root才能改变用户所在组
usermod
-u UID rz    
-g GROUP rz  
-G GROUP rz  
-d HOME rz   改变用户登入的初始目录
-s SHELL rz  
-l newname rz
-L rz
-U rz


groupadd
-g GID groupname   指定群组账号的标识符
-r groupname       指定添加的群组成为系统群组
-f groupname       强制执行

groupmod
-g GID groupname
-n newname groupname

groupdel groupname



### 6.文件管理

Linux下的文件可以分为5种不同的类型：普通文件、目录文件、链接文
件、设备文件和管道文件。

白色：普通文件
红色：压缩文件
蓝色：目录文件
浅蓝色：链接文件
黄色：设备文件（/dev）
绿色：可执行文件（/bin、/sbin）
粉红色：图片文件

cat 显示文件内容
file 显示文件类型

查找文件
find / -name hello.java


查找文件内容
more a.tex | grep -n 'abc'   abc出现以及行数
less 同上

实例：
javac hello.java  编译（会生成hello.class文件）  | gcc hello.cpp  编译（C++，生成a.out）--- 可以改进：gcc -o nwename hello.cpp  (没有.out)

java hello 运行（运行的是.class文件也就是编译后的文件）| ./a.out  (a.out 自动生成，文件名'a'也是)


head -n file
tail -n file
tail -f file 监视文件


drwxrwxrwx
d l - | c b p s
r  读（查看文件）
w  写（删建文件、重命名）
x  执行（进入目录）

文件的权限变更  操作用户：root用户和文件的所有者
chmod {u,g,o,a} {+,-,=} {r,w,x} filename
chmod {777-111} filename

chmod 755 abc  0:--- 1:--x 2:-w- 3:-wx 4:r-- 5:r-x 6:rw- 7:rwx 
chmod u=rwx,g=rx,o=rx abc
chmod u-x,g+w abc


改变文件拥有者和拥有组  操作用户：root
chown ruizhou abc
chown rz:admin abc.txt  或者 chown rz.admin abc.txt
chown ruizhou ./abc
chown -R ruizhou ./abc 包含子文件（夹）

改变文件用户组  操作用户：root用户和文件的所有者（必须是组成员）
chgrp admin abc


文件相关知识
 i-节点的信息，一个文件的i-节点信息集合叫做该文件的状态（startus）
stat a.txt

硬链接  同一个文件保存在两个地方或不同的文件名 两个文件是同一个文件，不是快捷方式 
ln /etc/inittab（目标文件） inittab（链接文件）
软链接  类似快捷方式 通过一个文件来访问目标文件
ln -s /etc/inittab inittab


find {搜索目录} {搜索条件} [动作]
-size n 文件的大小
-type 文件的类型（f普通、d目录、i软连接）
-name：按照文件名查找文件。支持统配符*和？
-user： 按照文件属主来查找文件
-group：按照文件所属的组来查找文件
-mtime n：按照文件的更改时间来查找文件
-atime n：搜索在过去n天读取过的文件
-ctime n：搜索在过去n天修改过的文件

-mtime +n ：列出在n天前(不含n天本身)被更改过内容的文件名
-mtime -n ：列出在n天内(含n天本身)被更改过内容的文件名
-print：输出搜索结果，并且打印

find /home -size +10k
find /etc -name '*ab'
find /etc -size +500000c(字节) -and -mtime +1    

-exec command {} \ ;
-ok command {} \ ; 与-exec相同，但是提示确认没个文件的操作

find /root -name 1.txt -exec ls -l {} \;
find /root -name 1.txt -ok -exec rm {} \;

压缩文件
gzip   .gz
gzip -c file  将输出重定向到标准输出
gzip -d file  解压缩文件
gzip -r file
gzip -1...9 file

bzip   .bz
bzip -c file  将输出重定向到标准输出
bzip -d file  解压缩文件

文件归档tar    
文件归档可以把整个目录树保存在同一个文件中
tar命令用于创建、列出、抽取归档文件
归档文件通常也会一并压缩

tar [op] file
-c 创建归档文件
-x 释放文档
-v 显示详细信息
-f 文件名（可带路径）
-z 使用 gzip 压缩
-j 使用 bzip2 压缩

tar zcvf 1.tar.gz 1/   目录
tar jcvf 2.tar.bz2 2/
tar jcvf a.tar.bz2 a.txt  文件



### 7.启动流程

### 8.linux 服务

系统服务
网络服务

/etc/rc.d/init.d/里面每一个文件就是某一个服务的启劢程序文件

-start：  启动这个服务
-stop： 停止这个服务
-restart：  先停止，再启动，也就是重新启动的意思。
-reload：  重载配置文件，这个参数只有在服务已经启动的状况下才能使用
-condrestart：有条件的重新启动，这个服务必须是已经启动的，才会被
重新启动；如果这个服务尚未启动，则无须启动之
-status：  查看目前服务的启动状态
./sshd status

服务操作快捷命令
service filename action(start stop status)


守护进程
/etc/xinetd.d
service xinetd start/stop/status

服务自启动
chkconfig
chkconfig --list
chkconfig --add httpd
chkconfig --del httpd
chkconfig --list mysqld 查看mysqld在7种模式下的自启动结果
chkconfig --level 35 mysqld on 设定
chkconfig mysqld on 2345自启动

进程管理
ps
ps aux/lax
auxf 加个f，可以查看父子进程关系
ps aux 静态


top 可动态


top -d 10 10s刷新一次
top root 只看root用户的

退出top
ctrl+c


pgrep 是通过程序的名字来查询进程的工具
pgrep -l httpd
pgrep -ln httpd
pgrep -lo httpd
pgrep httpd

终止进程的工具 kill 、killall、pkill
kill pid   单独进程杀死
kill 135 或者 kill -s 135
kill -9 135
pkill/killall 正在运行的程序名



软件包管理
软件安装
rpm 参数 软件包
-i：安装。
-U：升级安装，如果不存在也安装。
-F：更新安装，如果不存在也安装。
-v：查看信息。
-h：有进度条。
--replacepkgs：强制覆盖安装。
--nodeps：不考虑相依属性。
-q <软件名>：查询。
-qa：查询所有。
-ql <软件名>：列出软件的文件清单。
-qi <软件名>：列出软件信息。
-qf <文件名>：查询文件所属软件。
-e <软件名>：删除软件。

rpm -ivh bind-9.3.6-4.P1.el5_4.2.i386.rpm#安装
rpm -Uvh/Fvh bind-9.3.6-4.P1.el5_4.2.i386.rpm #升级安装
rpm -e bind-9.3.6-4.P1.el5_4.2.i386  #删除软件包
rpm -qpi *.rpm #查看软件包里的内容
rpm -qpl *.rpm #查看软件包将会在系统里安装哪些部分
rpm –qa #列出所有被安装的 rpm 软件包

挂载
mount /mnt/cdrom/
卸载
umount /mnt/cdrom/ 

yum源制作本地源和163网络源
配置/etc/yum.repos.d/server.repo

下载方式：
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo


文件系统
查看系统分区情况
fdisk -l

查看磁盘使用情况
df -l
df -h
df -b
查看目录在哪个分区
df 目录

du -sh  统计目录（戒文件）所占磁盘空间的大小

date
date //显示当前日期

date -s //设置当前时间，只有 root 权限才能设置，其他只能查看。

date -s 20061010 //设置成 20061010，这样会把具体时间设置成空 00:00:00

date -s 12:23:23 //设置具体时间，丌会对日期做更改

date -s “12:12:23 2006-10-10″ //这样可以设置全部时间

hwclock –w 把当前系统时间写入到 cmos 芯片

网络时间协议 ntp
ntpdate 服务器地址
vi /etc/ntp/ntpservers 直接写入服务器即可


设置语言
locale  查看目前语言系统环境
$HOME/.i18n 更改用户自己的语言环境

查看目前使用的环境变量：shell
env

切换shell
chsh -s /bin/csh



man 指令 
找帮助  /p  查找帮助中的关键字，然后键盘n就是向下翻



lamp环境搭建
环境开发包



.bin
./*.bin

.tar.gz
.tar.bz
tar -zxvf ****.tar.gz
tar -jxvf ****.tar.bz
./configure --prefix=/opt
make
make install
查询安装软件的信息
rpm -qa | more
rpm -qa | grep xxx

rpm -q mysql
rpm -q xinetd
rpm -q foo
rpm -q xinetd file bash

rpm -qi file

rpm -ql file
rpm -ql jdk

rpm -qf 文件全路径名
rpm -qp 包文件名

rpm -ivh  包全路径名
install 安装 verbose 提示  hash 进度条

rpm -e rpm包名称
强制卸载
rpm -e --nodeps prm包名称

安装samba


设置samba
smbpasswd -a 已存在的linux用户名


加所有用户加入samba服务器中
cat /etc/passwd | mksmbpasswd.sh > /etc/smb/smbpasswd （.sh为脚本可执行）
smbpasswd -s 已存在的linux用户名 (或者去掉'-s')

启动
service smb start/stop/restart



软件装好后启动
到该软件安装目录下，找到可执行文件 如 .ini
./eclipse &  以后台方式启动，释放控制台给用户


最近执行的5个命令
history 5

历史执行命令列表的快捷执行
!480 执行编号为480的历史执行命令
!ls  执行最近一次以ls开头的命令


设置网络三种方法
1 图形操作
setup

需要 /etc/rc.d/init.d/network restart

2 立即生效，注销后会恢复之前的设置
ifconfig eth0 address x.x.x.x netmask x.x.x.x 
或者 ifconfig eth0 x.x.x.x 只配ip

3 根源文件修改
 /etc/sysconfig/network-scripts/ifcfg-eth0

需要 /etc/rc.d/init.d/network restart



任务调度
crontab -e
M h D m d program
*为每一
终止任务调度
crontab -r
列出当前有哪些任务调度
crontab -l
////////////////////////////////////

!/bin/bash

extdir='/home/mysql/backup/';
extbase='auto_databasename_'`date '+%F'`;echo $extbase;
extfile='auto_databasename_'`date '+%F'`'.sql';echo $extfile;

echo "开始备份数据..."
cd $extdir
mysqldump --opt databasename -u username -ppassword | gzip > $extdir$extfile.gz
echo "删除本地7天前的备份数据..."
old_file='auto_databasename_'`date '+%F' --date='7 days ago'`'.*'
echo $old_file
rm -rf $extdir$old_file

* 3 * * * /usr/share/jetty6/cron/mysql_databasename_backup.sh > /usr/share/jetty6/cron/mysql_autoback_cron_log.txt

crontab mysql_autoback_cron.sh



netstat -an
-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态

-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令。
提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到


进入mysql
cd bin
./mysql -u root -p  
退出mysql 
quit或者exit

备份恢复都不要在mysql> 下进行
备份 多库 d1,d2,d3
多表 d1.tab,d1.user
退出，在bin目录下执行，如有环境变量设置过，则任意目录


ssh

netstat -anp    多一个p可以显示pid进程id




.bashrc配置 


临时加入一个路径
export PATH=$PATH:/root/


显示系统当前所有定义的alias
alias

定义alias
alias cl='ls -l /home'



压缩

zip a.zip 文件名
zip a.zip 文件1 文件2
zip -r a.zip 文件夹名路径

参数 -m 删除原文件（夹）
-r
下面用的很少
-j 忽略子目录内容
-n 将已压缩或者没有必要压缩的文件去掉
zip -n .mpg: .jpg: .gif



解压
unzip 文件名

查看压缩包
unzip -Z 压缩文件名

chkconfig

chkconfig networkmange off