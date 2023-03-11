# protoc

```
protoc-gen-gofast (在gofast一基础上， 可以导入gogoprotobuf)
protoc-gen-gogofast (在gofast一基础上， 可以导入gogoprotobuf)
protoc-gen-gogofaster (在gogofast基础上, 去掉XXX_unrecognized方法, 更少的指针字段)
protoc-gen-gogoslick (在gogofaster基础上, 辅助方法string, gostring 和 equal)
```

首先需要 cd gopath/src，在去执行下面的命令，因为不 cd 到这个目录下，他会在当前目录新建目录

```
protoc -I/Users/zhou/go/src -I/Users/zhou/go/src/git.bilibili.co/bapis -I/Users/zhou/go/src/go-live/third -I/usr/local/include --gogofast_out=plugins=grpc:. /Users/zhou/go/src/go-live/app/service/xroom/api/api.proto

protoc --bswagger_out=explicit_http=0:. --bm_out=explicit_http=0,pb_over_http=1:. --markdown_out=explict_http=0:. -I/Users/zhou/go/src -I/Users/zhou/go/src/go-live -I/Users/zhou/go/src/go-live/third -I/Users/zhou/go/src/git.bilibili.co/bapis go-live/app/service/xroom/api/api.proto
```
