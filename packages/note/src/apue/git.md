# git

## clean

```
# 删除 untracked files
git clean -f
```

```
# 连 untracked 的目录也一起删掉
git clean -fd
```

```
# 连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
git clean -xfd
```

```
# 在用上述 git clean 前，墙裂建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
git clean -nxfd
git clean -nf
git clean -nfd
```

## stash

```bash
NAME
       git-stash - Stash the changes in a dirty working directory away

SYNOPSIS
       git stash list [<log-options>]
       git stash show [-u | --include-untracked | --only-untracked] [<diff-options>] [<stash>]
       git stash drop [-q | --quiet] [<stash>]
       git stash pop [--index] [-q | --quiet] [<stash>]
       git stash apply [--index] [-q | --quiet] [<stash>]
       git stash branch <branchname> [<stash>]
       git stash [push [-p | --patch] [-S | --staged] [-k | --[no-]keep-index] [-q | --quiet]
                    [-u | --include-untracked] [-a | --all] [(-m | --message) <message>]
                    [--pathspec-from-file=<file> [--pathspec-file-nul]]
                    [--] [<pathspec>...]]
       git stash save [-p | --patch] [-S | --staged] [-k | --[no-]keep-index] [-q | --quiet]
                    [-u | --include-untracked] [-a | --all] [<message>]
       git stash clear
       git stash create [<message>]
       git stash store [(-m | --message) <message>] [-q | --quiet] <commit>
```

#### push

```bash
用法：git stash [push [-p | --patch] [-S | --staged] [-k | --[no-]keep-index] [-q | --quiet]
                   [-u | --include-untracked] [-a | --all] [(-m | --message <消息>]
                   [--pathspec-from-file=<文件> [--pathspec-file-nul]]
                   [--] [<路径规格>...]]

    -k, --keep-index      保持索引
    -S, --staged          只贮藏暂存的变更
    -p, --patch           以补丁模式贮藏
    -q, --quiet           静默模式
    -u, --include-untracked
                          贮藏中包含未跟踪文件
    -a, --all             包含忽略的文件
    -m, --message <说明>  贮藏说明
    --pathspec-from-file <文件>
                          从文件读取路径表达式
    --pathspec-file-nul   使用 --pathspec-from-file，路径表达式用空字符分隔
```

#### 未暂存（没有 commit）

```
git stash push -u -m s1
```

#### 暂存

```bash
git stash push -m s2
```

#### 列出所有 stash

```bash
git stash list
```

#### apply/drop

```bash
// apply/drop 最近的
git stash apply/drop
// 按照list现实的{num}
git stash apply/drop 1

// 删除所有stash
git stash clear
```
