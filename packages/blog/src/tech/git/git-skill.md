---
title: "Git 清除所有历史记录"
date: 2023-12-08 13:14:00 +8
category: git
tag:
  - git
  - branch
  - orphan
---

##### 1. 进入仓库，拉一个分支比如名为 latest_branch

```bash
git checkout --orphan latest_branch
```

- –orphan 创建一个无任何历史记录的孤儿分支

##### 2. 添加所有文件到上述分支并提交一次

```bash
git add -A
git commit -am 'initial commit'
```

##### 3. 删除 master 分支

```bash
git branch -D master
```

##### 4. 更改当前分支为 master 分支

```bash
git branch -m master
```

##### 5. 将本地所有更改 push 到远程仓库

```bash
git push -f origin master
```

- -f 强制push

##### 6. 关联本地 master 到远程 master

```bash
git branch --set-upstream-to=origin/master
```

对 gitee 用户，因为 gitee 目前限制单个仓库大小为 1024 MB，清除完历史记录后，还要去项目主页 设置下做一下存储库GC
