---
title: "常用命令"
date: 2024-03-07 21:20:00 +8
category: linux
tag:
  - linux
  - shell
  - top
---

```bash
top -c -p $(pgrep -d ',' -f nginx)
```

-c 显示完整命令行

-p 指定进程ID

pgrep 查找匹配条件的进程

-d ',' 指定输出分隔符

-f 进程名称
