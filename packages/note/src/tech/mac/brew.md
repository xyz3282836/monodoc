# brew

ssl 问题

curl: (35) LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to ghcr.io:443

```bash
// Setting HOMEBREW_FORCE_BREWED_CURL should make Homebrew use brewed curl instead of system curl.
export HOMEBREW_FORCE_BREWED_CURL=1
```

## 工具集

https://github.com/sharkdp/fd

```bash
Usage: fd [OPTIONS] [pattern] [path]...

Arguments:
  [pattern]  搜索模式 (正则表达式，除非使用了 '--glob'; 可选的)
  [path]...  文件系统搜索的根目录 (可选的)

Options:
  -H, --hidden                     搜索隐藏的文件和目录
  -I, --no-ignore                  不遵从 .(git|fd)ignore 文件
  -s, --case-sensitive             区分大小写的搜索 (默认: 智能大小写)
  -i, --ignore-case                不区分大小写的搜索 (默认: 智能大小写)
  -g, --glob                       基于Glob的搜索 (默认: 正则表达式)
  -a, --absolute-path              显示绝对路径而不是相对路径
  -l, --list-details               使用带有文件元数据的长列表格式
  -L, --follow                     遵循符号链接
  -p, --full-path                  搜索完整路径 (默认: 仅文件名)
  -d, --max-depth <depth>          设置最大搜索深度 (默认: 无)
  -E, --exclude <pattern>          排除符合给定 glob 模式的条目
  -t, --type <filetype>            按类型过滤: file (f), directory (d), symlink (l),
                                   executable (x), empty (e), socket (s), pipe (p)
  -e, --extension <ext>            按文件扩展名过滤
  -S, --size <size>                根据文件的大小限制结果
      --changed-within <date|dur>  按文件修改时间过滤 (较新)
      --changed-before <date|dur>  按文件修改时间过滤 (较旧)
  -o, --owner <user:group>         按拥有文件的用户 (和/或者) 组
  -x, --exec <cmd>...              对每个搜索结果执行命令
  -X, --exec-batch <cmd>...        一次执行包含所有搜索结果的命令
  -c, --color <when>               什么时候使用颜色 [默认: auto] [可以使用的值: auto,
                                   always, never]
  -h, --help                       打印帮助信息 (使用 `--help` 获取更多细节)
  -V, --version                    打印版本信息
```

https://github.com/BurntSushi/ripgrep

https://github.com/jesseduffield/lazygit

https://github.com/abiosoft/colima

https://github.com/lima-vm/lima
