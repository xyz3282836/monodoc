---
date: 2024-01-27
title: PowerToys
icon: tool
---

## 安装

您可以 [直接下载 exe](https://github.com/microsoft/PowerToys/releases) 进行安装。

::: info 系统要求

Win10 版本 > 1803，已安装 .NET Core 3.1 Desktop Runtime

:::

或者使用 WinGet:

```shell
WinGet install powertoys
```

## 功能

Power toys 主要功能:

- 图片取色
- 窗口布局管理
- 更多文件预览支持
- 图片尺寸调整
- 快捷键管理器
- 强大的文件重命名
- 快捷键指南
- PowerToys Run

## Color Picker

Color Picker 是一个可以在 Win10 系统全场景下使用的颜色提取工具，通过按键 `Win + Shift + C` 启动。

您可以用光标在当前桌面上任意色块提取颜色，系统会自动复制颜色的 HEX 或 RGB 值。

![取色器演示](./assets/color-picker.gif)

### FancyZones

FancyZones 是一个实用的窗口增强管理器，它能让您快速地将程序窗口按照设置好的布局来调整大小和位置排布，快捷键为 `` Win + ` ``。

FancyZones 实现了更高效地利用屏幕的面积，管理切换大量窗口而不杂乱，是大屏幕用户必备的效率工具。

当首次启动时，FancyZones 会要求您为当前显示器选择一个默认的布局。

::: tip

请注意 FancyZones 布局是基于显示器的，所以如果您有多个显示器，您需要分别设置它们。

:::

![布局选择](./assets/layout-picker.png)

如果上述布局选择不能满足您的需求，您也可以点击 "Custom" 选项卡进行自定义。

![自定义布局](./assets/custom-layout.png)

::: info

更多详情，请见 [官方 Wiki](https://github.com/microsoft/PowerToys/wiki/FancyZones-Overview)

:::

## 资源管理器插件

Preview Panel(预览窗格) 是一个轻量快速 Win10 的文件资源管理器插件，它能让您在无需打开文件的情况下，直接在文件资源管理器通过**预览窗格**预览文件内容，目前 `.svg` 与 `.md`。

![SVG 预览](./assets/svg-preview.png)

![Markdown 预览](./assets/markdown-preview.png)

::: tip

这两个文件的预览对开发者是十分有用的。

:::

## 图片尺寸调整

Image Resizer 是一个右键菜单的快速图片尺寸大小调整工具，您只需右键点击图片文件，即可选择修改一张或批量修改多张图片的大小尺寸、旋转图片方向或者转换图片格式。

![图片尺寸调整](./assets/image-resizer.gif)

软件预设了大/中/小/手机等不同的常用模版，单击确定即可一键完成图片尺寸的批量调整。您也可以点击 Settings 进入设置，按自己需求的尺寸大小、是否转换格式等来配置自己的常用“模版”。

![图片尺寸调整设置](./assets/image-resizer.png)

对于经常有多张图片的大小需要处理，而对专业性要求不高的用户来说，这款工具能替代专门的图像处理器软件。

同时，用户不仅可以导出为其他格式，也可以设置默认编码器(在不能保存为原始格式时)。

在导出时，也支持修改 PNG、JPEG 和 TIFF 的图片保存设置，与是否保留原来的最后修改日期。

## 快捷键管理器

Keyboard Manager 是一款简单而又实用的键盘键位修改小工具。

它的主要作用能帮您将键盘上的某个按键映射为另一个按键，甚至还能将一组快捷键映射为另一组。在一些特殊的情况下，它能帮您的大忙。

::: tip

Keyboard Manager 修改键位之后无需重启电脑即可立即生效。

:::

## PowerRename

PowerRename 是一个实用的右键菜单“批量重命名工具”，可以支持搜索/替换以及正则表达式匹配，可以添加文件名前缀后缀等。

为了避免出错，它在重命名之前可以让在界面上预览重命名后的结果，同时在重命名时，您可以很方便的选中全部您想要重命名的文件与文件夹，再排除指定的文件/文件夹。

::: tip 一些设置选项的解释

- **使用正则表达式**: 默认搜索框中为文字匹配，启用后将认为搜索框中为正则表达式。
- **匹配所有出现的对象**: 默认情况下只匹配项目中搜索文本的第一个实例，勾选后匹配所有。
- **枚举项**: 勾选后，会在在操作中修改的文件名后追加一个数字后缀。例如: `mrhope.jpg` -> `mrhope (1).jpg`

:::

## 快捷键指南

该工具负责提示您当前页面可用的 Windows 快捷键。(并不包含软件内的快捷键)。

长按 Windows 键即可呼出此工具。

![快捷键指南](./assets/shortcut-guide.png)

## PowerToys Run

PowerToys Run 是一款快速启动器工具，按下 `Alt + Space` 即可随时呼出输入框。

### PowerToys Run 功能

- 搜索

  直接输入名字后，它能快速找到对应的软件、搜索文件/文件夹，并回车迅速打开它们。

  ![搜索](./assets/power-toys-search.png)

- 运行软件切换

  PowerToys Run 也支持快速搜索当前正在运行的软件，并切换到它们的窗口去。

- 终端

  输入 `>` 加您需要执行的命令，即可快速调用终端执行。

  ![终端命令](./assets/shell-command.png)

- 简单计算

  您可以直接输入简单的数学表达式，PowerToys Run 会直接返回结果。

  ![简单计算](./assets/calculator.png)

### 快捷键

| 捷径                   | 行动                                                     |
| ---------------------- | -------------------------------------------------------- |
| `Alt + Space`          | 打开或隐藏 PowerToys Run                                 |
| `Esc`                  | 隐藏 PowerToys Run                                       |
| `Ctrl + Shift + Enter` | (仅适用于应用程序)以管理员身份打开所选的应用程序         |
| `Ctrl + Shift + E`     | (仅适用于应用程序和文件)在文件资源管理器中打开包含文件夹 |
| `Ctrl + C`             | (仅适用于文件夹和文件)复制路径位置                       |
| `Tab`                  | 浏览搜索结果和上下文菜单按钮                             |

### 过滤符

这些将迫使 PowerToys 只运行目标插件。

| 过滤符 | 行动            |
| ------ | --------------- |
| `=`    | 仅计算器。      |
| `?`    | 仅文件搜索。    |
| `.`    | 仅搜索安装应用  |
| `//`   | 仅网址。        |
| `<`    | 仅运行进程。    |
| `>`    | 仅 Shell 命令。 |

## 视频音频静音

使用相机时，您会在屏幕上的特定位置看到一个摄像头与麦克风开启状态的对话框，您可以通过单机或一下快捷键改变它们的启用状态。

- `Win + N`: 同时切换音频和视频
- `Win + Shift + O`: 切换视频
- `Win + Shift + A`: 切换麦克风
