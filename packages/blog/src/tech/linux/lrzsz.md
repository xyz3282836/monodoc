---
title: "rz sz"
date: 2023-08-31 18:14:00 +8
category: linux
tag:
  - linux
  - shell
---

## 安装

```sh
brew install lrzsz
```

## 创建文件

/usr/local/bin/iterm2-recv-zmodem.sh

/usr/local/bin/iterm2-send-zmodem.sh

参考：https://github.com/laggardkernel/iterm2-zmodem/tree/master/bin

iterm2-recv-zmodem.sh

```bash
#!/usr/bin/env bash
# vim: fdm=marker foldlevel=0 sw=2 ts=2 sts=2

FILE=`osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose folder with prompt "Choose a folder to place received files in"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`

if [[ -z "$FILE" ]]; then
  echo " Cancelled"
  # Send ZModem cancel
  echo -e \\x18\\x18\\x18\\x18\\x18
  sleep 1
  echo
  echo " # Cancelled transfer"
else
  cd "$FILE"
  "${HOMEBREW_PREFIX:-/usr/local}/bin/rz" -E -e -b
  sleep 1
  echo
  echo " # Sent -> $FILE"
fi
```

iterm2-send-zmodem.sh

```sh
#!/usr/bin/env bash
# vim: fdm=marker foldlevel=0 sw=2 ts=2 sts=2

FILE=`osascript -e 'tell application "iTerm" to activate' -e 'tell application "iTerm" to set thefile to choose file with prompt "Choose a file to send"' -e "do shell script (\"echo \"&(quoted form of POSIX path of thefile as Unicode text)&\"\")"`

if [[ -z "$FILE" ]]; then
  echo " Cancelled"
  # Send ZModem cancel
  echo -e \\x18\\x18\\x18\\x18\\x18
  sleep 1
  echo
  echo " # Cancelled transfer"
else
  "${HOMEBREW_PREFIX:-/usr/local}/bin/sz" "$FILE" -e -b
  sleep 1
  echo
  echo " # Received $FILE"
fi
```

## 授权

```sh
sudo chmod +x /usr/local/bin/iterm2*
```

打开 iterm2，打开需要配置的 `Profile` 点击 `Session`➡️`Edit Session`➡️ `Advanced` 的 tab 页 ➡️ `Triggers` ➡️ `Edit`，添加两条规则：

```markdown
Regular expression: rz waiting to receive.\*\*B0100
Action: Run Silent Coprocess
Parameters: /usr/local/bin/iterm2-send-zmodem.sh

Regular expression: \*\*B00000000000000
Action: Run Silent Coprocess
Parameters: /usr/local/bin/iterm2-recv-zmodem.sh
```
