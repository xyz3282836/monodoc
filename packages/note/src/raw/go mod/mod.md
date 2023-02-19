



```shell
//目标 repo 有哪些版本
go list -m -versions repo

//实际最终使用那个版本的repo
go list -m all|grep repo

// 某个repo 被依赖的list
go mod graph |grep repo

// 某个repo 被引用的链路
go mod why repo


go get [option] repo
-t flag：考虑构建测试所需的module。
-d flag：下载每个module的源代码，但不要构建或安装它们。
-v flag：提供详细输出。
./… ：在整个源代码树中执行这些操作，并且仅更新所需的依赖项。

```



参考：https://www.cnblogs.com/apocelipes/p/9537659.html



![image-20230202173900648](/Users/zhou/Nutstore Files/我的坚果云/读书笔记/img/go-mod-replace-demo.png)

```shell


go mod edit -replace=go-live=git.bilibili.co/live-dev/go-live@master

@latest 优先tag，有tag则最新tag，没有则最新commit
@master master分支的最新commit

```

