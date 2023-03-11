# Find 命令

```shell
// 常规用法

// 搜索一个目录所有文件

find ./app/archive/aegis-censor  -name "*.go" |xargs grep "panic("


// 高级用法
// 搜索一个目录，并且可以排除其他目录
// 注意 ./app/archive 为需要扫描路径
// 注意 ./app/archive/material，./app/archive/crm 为排除的路径
// 注意 ! -name "main.go" 排除main.go 文件
find ./app/archive/aegis-censor -path ./app/archive/aegis-censor/service/internal -prune -o \
-path ./app/archive/aegis-censor/service/configs -prune -o \
-name "*.go" \
! -name "main.go" \
-print|xargs grep "panic("
```
