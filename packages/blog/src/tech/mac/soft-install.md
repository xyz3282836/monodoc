---
title: "mac soft install skills"
date: 2023-05-25 15:10:00 +8
category: Mac
tag:
  - soft
  - install
---

## 软件安装

如果出现打开应用，提示无法打开，签名后可以打开

```bash
codesign --sign - --force --deep /Applications/Sublime\ Text.app
```

解除安装源限制

```bash
sudo spctl --master-disable
```

