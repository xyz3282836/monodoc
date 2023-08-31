---
title: "grpc服务对于各个客户端host的连接数限制"
date: 2023-08-30 19:46:00 +8
category: linux
tag:
  - shell
  - netstat
---

查询client的连接数

```shell
netstat -na|grep ESTABLISHED|grep :9000 | awk '{print $5}' |awk -F: '{print $1}'| sort|uniq -c |sort -r |head -n 10
```
