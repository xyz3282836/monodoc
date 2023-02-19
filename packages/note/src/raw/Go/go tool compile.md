# go tool compile

### 命令行

```
go tool compile [flags] file...
```

指定的文件必须是Go源文件和同一个包下的其他部分。所有目标操作系统和体系结构都使用相同的编译器。 GOOS和GOARCH环境变量设置了所需的属性。

```
-D path
	设置本地导入的相对路径。
-I dir1 -I dir2
	在dir1，dir2等文件夹搜索导入的包，
	会先查询 $GOROOT/pkg/$GOOS_$GOARCH.
-L
	在错误消息中显示完整的文件路径。
-N
	禁用优化。
-S
	将汇编列表打印到标准输出（仅限代码）。
-S -S
	将汇编列表打印到标准输出（代码和数据）。
-V
	打印编译器版本并退出。
-asmhdr file
	将汇编头写入文件。
-blockprofile file
	编写用于编译到文件的块配置文件。
-complete
	假设软件包没有非Go组件。
-cpuprofile file
	编写用于编译文件的CPU配置文件。
-dynlink
	允许引用共享库中的Go符号（实验性功能）。
-e
	移除报告错误数量限制（默认限制为10）。
-h
	在检测到第一个错误时暂停堆栈跟踪。
-importmap old=new
	在编译过程中将导入“旧”解释为导入“新”。
	该选项可以重复添加。
-installsuffix suffix
	在 $GOROOT/pkg/$GOOS_$GOARCH_suffix 查找包
	而非 $GOROOT/pkg/$GOOS_$GOARCH.
-l
	禁用内联。
-largemodel
	生成假定大内存模型的代码。
-linkobj file
	将链接器特定的对象写入文件和编译器特定的对象
    对象到通常的输出文件（由-o指定）。
	没有这个标志，-o输出是两者的组合
    链接器和编译器输入。
-memprofile file
	写入内存配置文件。
-memprofilerate rate
	设置 runtime.MemProfileRate 调整编译速度。
-msan
	将调用插入到C/C++内存清理程序。
-mutexprofile file
	编写用于编译文件的互斥量配置文件。
-nolocalimports
	禁止本地（相对）导入。
-o file
	将目标写入文件（默认file.o或与-pack，file.a）。
-p path
	为正在编译的代码设置期望的包导入路径，
	并诊断会导致循环依赖的导入。
-pack
	编写一个包（归档）文件而不是一个目标文件
-race
	编译启用竞争检测器。
-trimpath prefix
	从记录的源文件路径中删除前缀。
-u
	禁止导入未标记为安全的软件包;意味着 -nolocalimports.
```

还有一些调试标志;运行该命令时没有使用消息的参数。