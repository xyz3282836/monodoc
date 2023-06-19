---
title: buf
---

## 前置安装

```
brew install bufbuild/buf/buf
```

## BufCli

https://buf.build/docs/tutorials/getting-started-with-buf-cli

在 proto 目录下，创建`buf.yaml`

```bash
buf mod init // proto目录执行
```

```yaml
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

check `buf`

```bash
buf build // proto目录执行
echo $?
```

在 proto 的上级目录，创建生成`buf.gen.yaml`

```bash
touch buf.gen.yaml
```

```yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/bufbuild/buf-tour/gen
plugins:
  - plugin: buf.build/protocolbuffers/go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/bufbuild/connect-go
    out: gen
    opt: paths=source_relative
```

生成 pb 文件，`buf`会读取 👆`buf.gen.yaml`

```bash
buf generate protodir // proto上层目录执行
```

lint proto

```bash
buf lint protodir [--error-format=config-ignore-yaml] // proto目录执行
// or
cd protodir && but lint [--error-format=config-ignore-yaml] // proto上层目录执行
```

lint 规则修改

```yaml
 version: v1
 breaking:
   use:
     - FILE
 lint:
   use:
     - DEFAULT

+  ignore:
+    - google/type/datetime.proto
```

grpc 请求工具

```bash
buf curl \
--schema proto/pet/v1/pet.proto \
--data '{"pet_type": "PET_TYPE_SNAKE", "name": "Ekans"}' \
http://localhost:8080/pet.v1.PetStoreService/PutPet
```

## BSR

https://buf.build/docs/tutorials/getting-started-with-bsr

去除本地 copy，改成远程依赖引用

```yaml
version: v1
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
+deps:
+- buf.build/googleapis/googleapis
```

`buf build`会报错，需要 buf 更新依赖

原理是`buf` 可以解析 `buf.yaml`中的依赖，并从 BSR 中获取相关依赖来构建你的 module

```bash
buf mod update // proto目录执行
```
