---
title: "du"
date: 2023-07-29 22:09:00 +8
category: linux
tag:
  - linux
  - shell
  - su
  - sudo
---

主要参数

```bash
-h, --human-readable
    以K，M，G为单位，显示文件的大小

-s, --summarize
    只显示总计的文件大小

-S, --separate-dirs
    显示时并不含其子文件夹的大小

-d, --max-depth=N
    显示子文件夹的深度（层级）
```

常用 demo

```bash
root@room-service-1072483-68999665c8-tbc9f:/data/app# du -hs
355M    .
root@room-service-1072483-68999665c8-tbc9f:/data/app# du -hd 1
4.0K    ./env
16K     ./runtime
948K    ./zk_conf
36K     ./titans
354M    ./room-service
355M    .
```
