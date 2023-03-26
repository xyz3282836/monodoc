# wsl2

## 脚本

```shell
#!/bin/sh
hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
wslip=$(hostname -I | awk '{print $1}')
port=10808

PROXY_HTTP="socks5://${hostip}:${port}"

set.proxy(){
  export http_proxy="${PROXY_HTTP}"
  export HTTP_PROXY="${PROXY_HTTP}"

  export https_proxy="${PROXY_HTTP}"
  export HTTPS_proxy="${PROXY_HTTP}"

  export ALL_PROXY="${PROXY_SOCKS5}"
  export all_proxy=${PROXY_SOCKS5}

  git config --global http.https://github.com.proxy ${PROXY_HTTP}
  git config --global https.https://github.com.proxy ${PROXY_HTTP}

  echo "Proxy has been opened."
}

unset.proxy(){
  unset http_proxy
  unset HTTP_PROXY
  unset https_proxy
  unset HTTPS_PROXY
  unset ALL_PROXY
  unset all_proxy
  git config --global --unset http.https://github.com.proxy
  git config --global --unset https.https://github.com.proxy

  echo "Proxy has been closed."
}

test.proxy(){
  echo "Host IP:" ${hostip}
  echo "WSL IP:" ${wslip}
  echo "Try to connect to Google..."
  resp=$(curl -I -s --connect-timeout 5 -m 5 -w "%{http_code}" -o /dev/null www.google.com)
  if [ ${resp} = 200 ]; then
    echo "Proxy setup succeeded!"
  else
    echo "Proxy setup failed!"
  fi
}

if [ "$1" = "set" ]
then
  set.proxy

elif [ "$1" = "unset" ]
then
  unset.proxy

elif [ "$1" = "test" ]
then
  test.proxy
else
  echo "Unsupported arguments."
fi
```

方式一

- `source ./proxy.sh set`：开启代理
- `source ./proxy.sh unset`：关闭代理
- `source ./proxy.sh test`：查看代理状态

方式二

将方法定义放入shrc文件中，直接shell调用

参考：[https://www.cnblogs.com/tuilk/p/16287472.html](https://www.cnblogs.com/tuilk/p/16287472.html)
