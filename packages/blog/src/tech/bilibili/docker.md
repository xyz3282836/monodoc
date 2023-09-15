---
title: "docker应用镜像"
date: 2023-09-13 19:46:00 +8
category: docker
tag:
  - docker
---

## golang 1.19

hub.bilibili.co/nyx-compile/bili-golang:1.19.7

```sh
FROM debian:11
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
       apt-get update && apt-get install curl wget bsdiff libpcre++-dev graphviz  gcc git make jq unzip -y

RUN cd /opt/ && wget -O go1.19.linux-amd64.tar.gz http://jssz-boss.bilibili.co/nyx-nas/maxinlin/65c2238e13216eab517fe9511e64a62a-go1.19.7.linux-amd64.tar.gz && \
    tar xf /opt/go1.19.linux-amd64.tar.gz -C /usr/local && \
    rm -fr /opt/go1.19.linux-amd64.tar.gz && \
    mkdir -p /go/src/go-common/

# update gopher
ADD http://artifactory.bilibili.co/artifactory/ops/gopher /usr/local/bin/
RUN chmod +x /usr/local/bin/gopher

ENV PATH /usr/local/go/bin:$PATH
```

1.21

```sh
FROM hub.bilibili.co/nyx-base/debian:11
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
       apt-get update && apt-get install curl wget bsdiff libpcre++-dev graphviz  gcc git make jq unzip -y

RUN cd /opt/ && wget -O go1.21.0.linux-amd64.tar.gz http://jssz-boss.bilibili.co/nyx-nas/wangjianbin03/560a1cac9e64499721b0fe84d6eb0361-go1.21.0.linux-amd64.tar.gz && \
    tar xf /opt/go1.21.0.linux-amd64.tar.gz -C /usr/local && \
    rm -fr /opt/go1.21.0.linux-amd64.tar.gz && \
    mkdir -p /go/src/go-common/

# update gopher
ADD http://artifactory.bilibili.co/artifactory/ops/gopher /usr/local/bin/
RUN chmod +x /usr/local/bin/gopher

ENV PATH /usr/local/go/bin:$PATH
```

构建脚本

```sh
# BuildWithCover = on 生成带有覆盖率统计功能的镜像
export BuildWithCover=on
set -x
#set -e
#set -o pipefail
mkdir -p /go/src/go-code
cp -rf $Code_root/* /go/src/go-code/

export GO111MODULE=on
export GOPROXY=http://goproxy.bilibili.co
/usr/local/go/bin/go env -w GOSUMDB=off
cd /go/src/go-code/

if [ -d "/go/src/go-code/app/$self_arg/cmd" ];then
cd /go/src/go-code/app/$self_arg/cmd
else
echo "不存在目录：go-code/app/" $self_arg;
exit 1;
fi

curl -o /tmp/kratos-check http://artifactory.bilibili.co/artifactory/wangxu01/kratos-check
chmod +x /tmp/kratos-check
/tmp/kratos-check /go/src/go-code/
if [ $? -ne 0 ]; then
echo "构建失败！"
exit 1;
fi
echo "版本检查通过"

/usr/local/go/bin/go build -o $App_name -ldflags "-X google.golang.org/protobuf/reflect/protoregistry.conflictPolicy=warn"
cp -f $App_name $workdir/release/$App_name/
if [ $? -ne 0 ]; then
echo "构建失败！"
exit 1;
fi


# 增加带测试覆盖率功能的包编译,生产的镜像添加后缀“-cover”
# 有疑问或问题请联系 测试中心/工程效率部/Higkoo
if [ $BuildWithCover = "on" ];then
   echo $REVISION
   mkdir cover && mkdir -p $workdir/release/cover/$App_name/
  curl -o /tmp/gopher http://uat-boss.bilibili.co/gopher/gopher
  chmod +x /tmp/gopher
   REVISION=$REVISION /tmp/gopher build . --coverpkg ../... -o cover/$App_name --add-version --ldflags '-X google.golang.org/protobuf/reflect/protoregistry.conflictPolicy=warn' --goroot /usr/local/go/
   cp -f cover/$App_name $workdir/release/cover/$App_name/
else
   echo "未构建覆盖率测试包.."
fi
echo "构建成功！";
```

运行dockerfile

```sh
FROM hub.bilibili.co/compile/bili-golang:base
RUN useradd -m -s /bin/bash qa && useradd -m -s /bin/bash rd && useradd -m -s /bin/bash gt

ARG app_name

RUN mkdir -p /data/app/${app_name} \
 && mkdir -p /data/log/${app_name} \
 && mkdir -p /data/conf/${app_name}

ADD http://bvc-nerve.bilibili.co/ipipfile/stable_v6_flagship.ipdb /data/conf/v6.ipdb
#ADD http://bvc-nerve.bilibili.co/ipipfile/stable_v4_flagship.ipdb /data/conf/v4.ipdb
RUN wget -O /data/conf/v4.ipdb http://bvc-nerve.bilibili.co/ipipfile/stable_v4_flagship.ipdb

#RUN wget -O /data/conf/v6.ipdb  http://bvc-nerve.bilibili.co/ipipfile/stable_v6_flagship.ipdb && \
#      wget -O /data/conf/v4.ipdb http://bvc-nerve.bilibili.co/ipipfile/stable_v4_flagship.ipdb

COPY release/* /data/app/${app_name}
RUN mv /background.sh /bak_background.sh

```
