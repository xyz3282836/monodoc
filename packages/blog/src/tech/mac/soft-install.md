---
title: "mac soft install skills"
date: 2023-05-25 15:10:00 +8
category: Mac
tag:
  - soft
  - install
  - codesign
---

## mac 软件问题修复

### 软件安装

```sh
sudo spctl --master-disable
```

### 证书过期

如果出现打开应用，提示无法打开，签名后可以打开

第一步，执行命令

```sh
sudo codesign --force --deep --sign - /Applications/V2rayU.app
sudo codesign --force --deep --sign - /Users/zhou/.V2rayU/V2rayUTool
```

第二步，在应用程序中找到 V2rayU，右键，显示简介，勾选覆盖恶意软件保护

### V2RayUTool 频繁要求输入密码

```sh
cd /Applications/V2rayU.app/Contents/Resources
sh cmd.sh
```
