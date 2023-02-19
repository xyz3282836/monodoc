# gcc

**GCC参数详解**

[介绍] 
gcc and g++分别是gnu的c & c++编译器 
gcc/g++在执行编译工作的时候，总共需要4步 
1.预处理，生成.i的文件 
2.将预处理后的文件转换成汇编语言，生成文件.s 
3.由汇编变为目标代码(机器代码)，生成.o的文件 
4.连接目标代码，生成可执行程序 

[参数详解] 
-c  
　　只激活预处理,编译,和汇编,也就是他只把程序做成obj文件 
　　例子用法: 
　　gcc -c hello.c 
　　他将生成.o的obj文件  
-S 
　　只激活预处理和编译，就是指把文件编译成为汇编代码。 
　　例子用法 
　　gcc -S hello.c 
　　他将生成.s的汇编代码，你可以用文本编辑器察看 
-E 
　　只激活预处理,这个不生成文件,你需要把它重定向到一个输出文件里 
　　面. 
　　例子用法: 
　　gcc -E hello.c > pianoapan.txt 
　　gcc -E hello.c | more 
　　慢慢看吧,一个hello word 也要与处理成800行的代码 
-o 
　　制定目标名称,缺省的时候,gcc 编译出来的文件是a.out,很难听,如果 
　　你和我有同感，改掉它,哈哈 
　　例子用法 
　　gcc -o hello.exe hello.c (哦,windows用习惯了) 
　　gcc -o hello.asm -S hello.c 
-ansi 
　　关闭gnu c中与ansi c不兼容的特性,激活ansi c的专有特性(包括禁止一些asm inline typeof关键字,以及UNIX,vax等预处理宏, 

-wall

​      显示警告信息
-fno-asm 
　　此选项实现ansi选项的功能的一部分，它禁止将asm,inline和typeof用作 
　　关键字。 
-fno-strict-prototype 
　　只对g++起作用,使用这个选项,g++将对不带参数的函数,都认为是没有显式 
　　的对参数的个数和类型说明,而不是没有参数. 
　　而gcc无论是否使用这个参数,都将对没有带参数的函数,认为城没有显式说 
　　明的类型 
-fthis-is-varialble 
　　就是向传统c++看齐,可以使用this当一般变量使用. 
-fcond-mismatch 
　　允许条件表达式的第二和第三参数类型不匹配,表达式的值将为void类型 
-funsigned-char 
-fno-signed-char 
-fsigned-char 
-fno-unsigned-char 
　　这四个参数是对char类型进行设置,决定将char类型设置成unsigned char(前 
　　两个参数)或者 signed char(后两个参数) 

-include file 
　　包含某个代码,简单来说,就是便以某个文件,需要另一个文件的时候,就可以 
　　用它设定,功能就相当于在代码中使用#include 
　　例子用法: 
　　gcc hello.c -include /root/pianopan.h 
-imacros file 
　　将file文件的宏,扩展到gcc/g++的输入文件,宏定义本身并不出现在输入文件 
　　中 
-Dmacro 
　　相当于C语言中的#define macro 
-Dmacro=defn 
　　相当于C语言中的#define macro=defn 
-Umacro 
　　相当于C语言中的#undef macro 
-undef 
　　取消对任何非标准宏的定义 
-Idir 
　　在你是用#include"file"的时候,gcc/g++会先在当前目录查找你所制定的头 
　　文件,如果没有找到,他回到缺省的头文件目录找,如果使用-I制定了目录,他 
　　回先在你所制定的目录查找,然后再按常规的顺序去找. 
　　对于#include,gcc/g++会到-I制定的目录查找,查找不到,然后将到系 
　　统的缺省的头文件目录查找 
-I- 
　　就是取消前一个参数的功能,所以一般在-Idir之后使用 
-idirafter dir 
　　在-I的目录里面查找失败,讲到这个目录里面查找. 
-iprefix prefix 
-iwithprefix dir 
　　一般一起使用,当-I的目录查找失败,会到prefix+dir下查找 
-nostdinc 
　　使编译器不再系统缺省的头文件目录里面找头文件,一般和-I联合使用,明确 
　　限定头文件的位置 
-nostdin C++ 
　　规定不在g++指定的标准路经中搜索,但仍在其他路径中搜索,.此选项在创建 
　　libg++库使用 
-C 
　　在预处理的时候,不删除注释信息,一般和-E使用,有时候分析程序，用这个很 
　　方便的 
-M 
　　生成文件关联的信息。包含目标文件所依赖的所有源代码 
　　你可以用gcc -M hello.c来测试一下，很简单。 
-MM 
　　和上面的那个一样，但是它将忽略由#include造成的依赖关系。 
-MD 
　　和-M相同，但是输出将导入到.d的文件里面 
-MMD 
　　和-MM相同，但是输出将导入到.d的文件里面 
-Wa,option 
　　此选项传递option给汇编程序;如果option中间有逗号,就将option分成多个选 
　　项,然后传递给会汇编程序 
-Wl.option 
　　此选项传递option给连接程序;如果option中间有逗号,就将option分成多个选 
　　项,然后传递给会连接程序. 
-llibrary  
　　制定编译的时候使用的库 
　　例子用法 
　　gcc -lcurses hello.c 
　　使用ncurses库编译程序 
-Ldir 
　　制定编译的时候，搜索库的路径。比如你自己的库，可以用它制定目录，不然 
　　编译器将只在标准库的目录找。这个dir就是目录的名称。 
-O0 
-O1 
-O2 
-O3 
　　编译器的优化选项的4个级别，-O0表示没有优化,-O1为缺省值，-O3优化级别最 
　　高　　 
-g 
　　只是编译器，在编译的时候，产生条是信息。 
-gstabs 
　　此选项以stabs格式声称调试信息,但是不包括gdb调试信息. 
-gstabs+ 
　　此选项以stabs格式声称调试信息,并且包含仅供gdb使用的额外调试信息. 
-ggdb 
　　此选项将尽可能的生成gdb的可以使用的调试信息. 