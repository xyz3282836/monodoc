---
title: "mac ssh key 记忆配置"
date: 2025-10-16 17:10:00 +8
category: SSH
tag:
  - ssh-add
  - mac
  - keychain
---

## mac keychain

将ssh的密钥添加到keychain

```shell
ssh-add --apple-use-keychain ~/.ssh/rsa_*
```

配置`.ssh`目录下`config`文件

```
Host github.com
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/rsa_github


Host git.bilibili.co
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/rsa_gitlab

Host 104.160.45.229
AddKeysToAgent yes
UseKeychain yes
IdentityFile ~/.ssh/rsa_bwg
```

## AddKeysToAgent

在 SSH 配置文件（~/.ssh/config）中，AddKeysToAgent 是一个配置选项，它的作用是控制是否将私钥自动添加到 ssh-agent 中。以下是它的具体作用和相关说明：

### 作用

- **自动加载密钥**：当设置为 yes 时，ssh 命令会自动将私钥添加到 ssh-agent 中。这样，用户在使用 SSH 连接时，就不需要手动运行 ssh-add 命令来添加密钥。
- **简化操作**：避免每次使用 SSH 时都需要手动输入密钥密码，提高了使用 SSH 的便捷性。
- **安全性**：通过 ssh-agent 管理密钥，可以将密钥的解密操作限制在内存中，而不是直接暴露密钥文件，从而提高安全性。

### 可能的值

- **yes**：自动将私钥添加到 ssh-agent 中。
- **no**：不自动添加私钥到 ssh-agent 中。
- **confirm**：在每次使用密钥时，要求用户确认是否允许使用该密钥。
- **ask**：在第一次使用密钥时，提示用户是否要将其添加到 ssh-agent 中。

### 使用场景

假设你有一个私钥文件 ~/.ssh/id_rsa，并且你希望在每次使用 SSH 时自动加载该密钥，而不需要手动运行 ssh-add 命令，你可以在 ~/.ssh/config 文件中添加以下配置：

```
Host *
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_rsa
```

这样，当你使用 ssh 命令连接到远程服务器时，ssh 会自动将 ~/.ssh/id_rsa 添加到 ssh-agent 中，并且在后续的连接中不再需要手动输入密钥密码。

### 注意事项

- **安全性**：虽然 AddKeysToAgent 提高了使用 SSH 的便捷性，但也需要注意安全性。确保只有可信的用户可以访问你的 SSH 配置文件和密钥文件。
- **兼容性**：AddKeysToAgent 是 OpenSSH 7.2 及更高版本引入的特性。如果你使用的是较旧版本的 OpenSSH，可能需要手动运行 ssh-add 命令来添加密钥。

总之，AddKeysToAgent 是一个非常实用的配置选项，可以显著简化 SSH 的使用流程，同时也能在一定程度上提高安全性。

## UseKeychain

UseKeychain 是 macOS 系统中 SSH 配置文件（~/.ssh/config）的一个选项，它的作用是指示 SSH 在 macOS 的钥匙串（Keychain）中查找和存储私钥的密码。以下是它的具体作用和使用场景：

### 作用

1. **存储私钥密码**：
   - 当你使用 ssh-add --apple-use-keychain 或 ssh-add -K 将私钥添加到 ssh-agent 时，UseKeychain 选项会确保私钥的密码被存储在 macOS 的钥匙串中。
   - 这样，你不需要每次重启电脑或打开终端时手动输入私钥的密码。
2. **自动加载私钥**：
   - 当你在 ~/.ssh/config 文件中设置 UseKeychain yes 时，SSH 会自动从钥匙串中读取私钥的密码，并将其加载到 ssh-agent 中。
   - 这使得 SSH 连接更加便捷，尤其是在需要频繁使用 SSH 的场景中。
3. **提高安全性**：
   - 钥匙串是一个安全的存储系统，可以保护私钥的密码不被未授权访问。
   - 通过将私钥密码存储在钥匙串中，可以避免将密码明文存储在文件中，从而提高安全性。

### 使用场景

假设你有一个私钥文件 ~/.ssh/id_rsa，并且你希望在每次使用 SSH 时自动加载该私钥，同时将密码存储在钥匙串中，你可以在 ~/.ssh/config 文件中添加以下配置：

```
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa
```

这样，当你使用 ssh 命令连接到远程服务器时，SSH 会自动从钥匙串中读取私钥的密码，并将其加载到 ssh-agent 中，而不需要手动输入密码。

### 注意事项

1. **仅适用于 macOS**：
   - UseKeychain 是 macOS 系统特有的功能，不适用于 Linux 或 Windows 系统。
   - 如果你在 macOS 上使用了非苹果自带的 OpenSSH 版本（例如通过 Homebrew 安装的 OpenSSH），可能需要确保该版本支持 --apple-use-keychain 和 --apple-load-keychain 选项[^9^]。
2. **配置文件格式**：
   - 如果你在配置文件中遇到 Bad configuration option: usekeychain 错误，可能是因为你的 SSH 版本不支持该选项，或者配置文件格式有误。确保你的 SSH 版本是 macOS 自带的版本，并且配置文件格式正确[^10^]。
3. **安全性**：
   - 虽然将私钥密码存储在钥匙串中可以提高便利性，但也需要注意安全性。确保只有可信的用户可以访问你的钥匙串和 SSH 配置文件。

总之，UseKeychain 是一个非常实用的配置选项，可以显著提高使用 SSH 的便捷性和安全性，特别是在 macOS 系统中。

## 疑问

即使已经将私钥存入 Keychain，IdentityFile 在 SSH 配置中仍然是有用的，甚至在某些情况下是必要的。以下是它们各自的作用和为什么两者都需要的原因：

### IdentityFile 的作用

IdentityFile 是 SSH 配置文件中的一个指令，用于指定私钥文件的路径。它的主要作用是告诉 SSH 客户端在进行身份验证时应该使用哪个私钥文件。

### UseKeychain 的作用

UseKeychain 是 macOS 特有的配置选项，用于指示 SSH 客户端从 Keychain 中读取私钥的密码。它确保私钥的密码被安全地存储在 Keychain 中，并且在需要时自动加载。

### 为什么两者都需要

1. **指定私钥文件**：
   - IdentityFile 明确指定了私钥文件的路径。即使私钥的密码已经存储在 Keychain 中，SSH 客户端仍然需要知道私钥文件的位置。
   - 如果不指定 IdentityFile，SSH 客户端会默认查找 \~/.ssh/id_rsa、\~/.ssh/id_dsa、\~/.ssh/id_ecdsa、\~/.ssh/id_ed25519 等默认私钥文件。如果私钥文件不在默认位置，SSH 客户端将无法找到正确的私钥文件。
2. **自动加载密钥**：
   - UseKeychain 确保私钥的密码被存储在 Keychain 中，并在需要时自动加载。
   - IdentityFile 指定了私钥文件的位置，SSH 客户端在加载私钥时会结合 UseKeychain 从 Keychain 中读取密码。

### 示例配置

假设你有一个私钥文件 ~/.ssh/id_rsa，并且已经将该私钥的密码存储在 Keychain 中，你的 ~/.ssh/config 文件可以这样配置：

```
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_rsa
```

- **IdentityFile ~/.ssh/id_rsa**：明确指定了私钥文件的位置。
- **UseKeychain yes**：指示 SSH 客户端从 Keychain 中读取私钥的密码。
- **AddKeysToAgent yes**：确保私钥被自动添加到 ssh-agent 中。

### 总结

- **IdentityFile**：告诉 SSH 客户端私钥文件的位置。
- **UseKeychain**：确保私钥的密码被安全地存储在 Keychain 中，并在需要时自动加载。

两者结合使用，可以确保 SSH 客户端能够正确找到并使用私钥文件，同时利用 Keychain 提供的安全性和便捷性。
