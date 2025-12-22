---
title: "logi options+ 安装问题"
date: 2023-05-25 15:10:00 +8
category: logi
tag:
  - mac
  - install
  - options+
---

## 软件问题

### A JavaScript error occurred in the main process

解决方法

默认是 drwxr-xr-x，需要都添加rw权限

```
sudo chmod 777 "/Users/zhou/Library/Application Support/LogiOptionsPlus"
```

### Backend connection problem - click here to launch backend

解决方案

以下三个必须都要登入自启动，mac自带的登入启动配置只能选择一个

![Logi-Error](/Users/zhou/sync/blog/tech/logi/assets/logi_err.png)
