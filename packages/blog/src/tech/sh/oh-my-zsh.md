---
title: "oh my zsh"
date: 2023-05-25 09:00:00 +8
category: 技术
tag:
  - sh
---

## zsh

常规安装

## on my zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### plugin

#### zsh-autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

```

load zsh-autosuggestions

```bash
plugins=(
    # other plugins...
    zsh-autosuggestions
)
```

#### zsh-syntax-highlighting

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

```

load zsh-autosuggestions

```bash
plugins=(
    # other plugins...
    zsh-syntax-highlighting
)
```
