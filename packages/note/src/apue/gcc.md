# gcc

## **GCC 参数详解**

gcc and g++分别是 gnu 的 c & c++编译器
gcc/g++在执行编译工作的时候，总共需要 4 步

1. 预处理，生成.i 的文件

2. 将预处理后的文件转换成汇编语言，生成文件.s

3. 由汇编变为目标代码(机器代码)，生成.o 的文件

4. 连接目标代码，生成可执行程序

### 参数详解

-c
　　只激活预处理,编译,和汇编,也就是他只把程序做成 obj 文件
　　例子用法:
　　 gcc -c hello.c
　　他将生成.o 的 obj 文件
-S
　　只激活预处理和编译，就是指把文件编译成为汇编代码。
　　例子用法
　　 gcc -S hello.c
　　他将生成.s 的汇编代码，你可以用文本编辑器察看
-E
　　只激活预处理,这个不生成文件,你需要把它重定向到一个输出文件里
　　面.
　　例子用法:
　　 gcc -E hello.c > pianoapan.txt
　　 gcc -E hello.c | more
　　慢慢看吧,一个 hello word 也要与处理成 800 行的代码
-o
　　制定目标名称,缺省的时候,gcc 编译出来的文件是 a.out,很难听,如果
　　你和我有同感，改掉它,哈哈
　　例子用法
　　 gcc -o hello.exe hello.c (哦,windows 用习惯了)
　　 gcc -o hello.asm -S hello.c
-ansi
　　关闭 gnu c 中与 ansi c 不兼容的特性,激活 ansi c 的专有特性(包括禁止一些 asm inline typeof 关键字,以及 UNIX,vax 等预处理宏
-wall
　　显示警告信息
-fno-asm
　　此选项实现 ansi 选项的功能的一部分，它禁止将 asm,inline 和 typeof 用作
　　关键字
-fno-strict-prototype
　　只对 g++起作用,使用这个选项,g++将对不带参数的函数,都认为是没有显式
　　的对参数的个数和类型说明,而不是没有参数.
　　而 gcc 无论是否使用这个参数,都将对没有带参数的函数,认为城没有显式说
　　明的类型
-fthis-is-varialble
　　就是向传统 c++看齐,可以使用 this 当一般变量使用
-fcond-mismatch
　　允许条件表达式的第二和第三参数类型不匹配,表达式的值将为 void 类型
-funsigned-char
-fno-signed-char
-fsigned-char
-fno-unsigned-char
　　这四个参数是对 char 类型进行设置,决定将 char 类型设置成 unsigned char(前
　　两个参数)或者 signed char(后两个参数)
-include file
　　包含某个代码,简单来说,就是便以某个文件,需要另一个文件的时候,就可以
　　用它设定,功能就相当于在代码中使用#include
　　例子用法:
　　 gcc hello.c -include /root/pianopan.h
-imacros file
　　将 file 文件的宏,扩展到 gcc/g++的输入文件,宏定义本身并不出现在输入文件
　　中
-Dmacro
　　相当于 C 语言中的#define macro
-Dmacro=defn
　　相当于 C 语言中的#define macro=defn
-Umacro
　　相当于 C 语言中的#undef macro
-undef
　　取消对任何非标准宏的定义
-Idir
　　在你是用#include"file"的时候,gcc/g++会先在当前目录查找你所制定的头
　　文件,如果没有找到,他回到缺省的头文件目录找,如果使用-I 制定了目录,他
　　回先在你所制定的目录查找,然后再按常规的顺序去找.
　　对于#include,gcc/g++会到-I 制定的目录查找,查找不到,然后将到系
　　统的缺省的头文件目录查找
-I-
　　就是取消前一个参数的功能,所以一般在-Idir 之后使用
-idirafter dir
　　在-I 的目录里面查找失败,讲到这个目录里面查找
-iprefix prefix
-iwithprefix dir
　　一般一起使用,当-I 的目录查找失败,会到 prefix+dir 下查找
-nostdinc
　　使编译器不再系统缺省的头文件目录里面找头文件,一般和-I 联合使用,明确
　　限定头文件的位置
-nostdin C++
　　规定不在 g++指定的标准路经中搜索,但仍在其他路径中搜索,.此选项在创建
　　 libg++库使用

-C
　　在预处理的时候,不删除注释信息,一般和-E 使用,有时候分析程序，用这个很
　　方便的

-M
　　生成文件关联的信息。包含目标文件所依赖的所有源代码
　　你可以用 gcc -M hello.c 来测试一下，很简单

-MM
　　和上面的那个一样，但是它将忽略由#include 造成的依赖关系

-MD
　　和-M 相同，但是输出将导入到.d 的文件里面

-MMD
　　和-MM 相同，但是输出将导入到.d 的文件里面

-Wa,option
　　此选项传递 option 给汇编程序;如果 option 中间有逗号,就将 option 分成多个选
　　项,然后传递给会汇编程序

-Wl.option
　　此选项传递 option 给连接程序;如果 option 中间有逗号,就将 option 分成多个选
　　项,然后传递给会连接程序

-llibrary  
　　制定编译的时候使用的库
　　例子用法
　　 gcc -lcurses hello.c
　　使用 ncurses 库编译程序

-Ldir
　　制定编译的时候，搜索库的路径。比如你自己的库，可以用它制定目录，不然
　　编译器将只在标准库的目录找。这个 dir 就是目录的名称

-O0
-O1
-O2
-O3
　　编译器的优化选项的 4 个级别，-O0 表示没有优化,-O1 为缺省值，-O3 优化级别最
　　高

-g
　　只是编译器，在编译的时候，产生条是信息

-gstabs
　　此选项以 stabs 格式声称调试信息,但是不包括 gdb 调试信息
-gstabs+
　　此选项以 stabs 格式声称调试信息,并且包含仅供 gdb 使用的额外调试信息
-ggdb
　　此选项将尽可能的生成 gdb 的可以使用的调试信息
