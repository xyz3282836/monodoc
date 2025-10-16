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

允许任何安装源

```sh
sudo spctl --master-disable
```

打开时提示：xxx.app已损坏，无法打开，您应该将它移到废纸篓，需要给文件赋予安全性设置

```sh
sudo xattr -d com.apple.quarantine /Applications/Sublime\ Text.app
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

## 鼠标滚动方向

```shell
defaults write com.apple.AppleMultitouchMouse MouseWheels -int 1
defaults write com.apple.AppleMultitouchTrackpad MouseWheels -int 0
```

这两个命令用于在Mac系统中分别设置鼠标和触控板的滚动方向，具体作用如下：

### 1. 命令的作用

- **defaults write com.apple.AppleMultitouchMouse MouseWheels -int 1**
  - 该命令将鼠标的滚动方向设置为与“自然滚动方向”相反。
  - 在Mac系统中，“自然滚动方向”是指当手指向上滑动时，页面内容也向上移动（类似于在屏幕上直接拖动页面）。设置为-int 1后，鼠标滚轮的滚动方向会与自然滚动方向相反，即手指向上滚动鼠标滚轮时，页面内容会向下移动。
- **defaults write com.apple.AppleMultitouchTrackpad MouseWheels -int 0**
  - 该命令将触控板的滚动方向保持为“自然滚动方向”。
  - 设置为-int 0后，触控板的滚动方向不会被改变，仍然保持为自然滚动方向，即手指向上滑动时，页面内容也向上移动。

### 2. 使用场景

这两个命令通常用于以下场景：

- 当用户希望鼠标和触控板的滚动方向不同，以适应不同的使用习惯。例如，一些用户可能更习惯鼠标滚轮的滚动方向与PC一致（即与自然滚动方向相反），而触控板则保持自然滚动方向。

### 3. 使用方法

- 打开终端应用程序（位于“应用程序/实用工具”文件夹中）。
- 输入上述两个命令，每条命令后按回车键执行。
- 执行完毕后，需要注销并重新登录账户，以确保设置生效。

### 4. 风险提示

- **需要注销并重新登录**：执行这些命令后，必须注销并重新登录账户，否则设置不会生效。

- **可能需要恢复默认设置**：如果用户对设置不满意，可以使用以下命令恢复默认设置

  ```
  defaults delete com.apple.AppleMultitouchMouse MouseWheels
  defaults delete com.apple.AppleMultitouchTrackpad MouseWheels
  ```

  同样需要注销并重新登录以确保恢复生效。

### 总结

这两个命令通过修改系统设置，分别调整鼠标和触控板的滚动方向，以满足用户对不同设备滚动方向的个性化需求。
