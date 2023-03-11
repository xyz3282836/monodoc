# CA

```
CA方 ca的私钥
openssl genrsa -des3 -out ca.key 2048

CA方 生成自签名证书(ca) -x509
openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -config openssl.cnf
ca.crt很重要

server 生成私钥
openssl genrsa -out server.key 2048

server 生成需要签名的证书
openssl req -new -key server.key -out server.csr -config openssl.cnf
将server.csr 传给ca签名

CA 签名server的证书
openssl ca -in server.csr -cert ca.crt -keyfile ca.key -out server.crt -config openssl.cnf

将server.crt传给server
```

生成不加密的 RSA 公钥和私钥

```
openssl x509 -in ca.crt -inform PEM -out ca.der -outform DER
显示公钥跟证书信息：
openssl x509 -in ca.crt -pubkey

生成rsa密钥
openssl genrsa -des3 -out prikey.pem
去除掉密钥文件保护密码
openssl rsa -in prikey.pem -out prikey.pem
分离出公钥
openssl rsa -in prikey.pem -pubout -out pubkey.pem(获取证书中的公钥 openssl req -in myreq.pem  -out -pubkey.pem)
对文件进行签名
open rsautl -sign -inkey prikey.pem -in a.txt -out sig.dat
验证签名
openssl rsautl -verify -inkey prikey.pem -in sig.dat
用公钥对文件加密
openssl rsautl -encrypt -pubin -inkey pubkey.pem -in a.text -out b.text
用私钥解密
openssl rsautl -decrypt -inkey prikey.pem -in b.text
用证书中的公钥加密
opensll rsautl -encrypt -certin -inkey cert1.pem -in a.txt

或者
生成一个没有加密的ca私钥
openssl genrsa -out ca.key.pem 1024
生成ca对应的csr文件
openssl req -new -key ca.key.pem -out ca.csr
自签名
openssl x509 -in ca.csr -out ca.cer -req -signkey ca.key.pem -days 7300 -extensions v3_ca
生成DER格式的私钥
openssl pkcs8 -topk8 -inform PEM -outform DER -in ca.key.pem -out ca.private.der -nocrypt
读取证书的内容,显示在屏幕上
openssl x509 -in server.cer -noout -subject  -nameopt RFC2253
将der格式的证书转成pem格式
openssl  x509  -inform PEM  -outform DER -in server.der -out server.pem
```
