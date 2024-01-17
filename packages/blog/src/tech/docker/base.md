---
title: "docker基础"
date: 2024-01-17 15:35:00 +8
category: docker
tag:
  - docker
---

## 常用命令

### run

```shell
docker run \
  -it \
  --rm \
  --name=tork-web \
  -p 3000:3000 \
  -e BACKEND_URL=http://my.tork.host:8000 \
  runabol/tork-web
```

## 坑

### 命令

`COPY` param1 param2

param1 是宿主机的路径，param2是docker镜像内的路径
