---
title: "cors"
date: 2024-04-07 18:01:00 +8
category: web
tag:
  - web
  - cors
---

## CORS错误配置漏洞修复建议

### 漏洞简介：

CORS，跨域资源共享（Cross-origin resource sharing）的本质是由服务端配置的策略指导客户端浏览器，放松同源策略限制，实现跨域资源共享。但是一旦服务器端访问控制策略配置出现错误，信任非预期域名，就会出现浏览器SOP被绕过。攻击者便可以利用CORS误配置漏洞， 从恶意网站跨域读写目标系统中的敏感信息。

### 常见的CORS错误配置：

1. #### 反射 Origin头

   最简单地动态生成访问控制策略的方法，就是在Access-Control-Allow-Origin中反射请求的Origin值。例如，下面是一个错误 Nginx 配置示例：

   ​ add_header "Access-Control-Allow-Origin" $http_origin;

   ​ add_header “Access-Control-Allow-Credentials” “true”;

   这种配置非常危险，相当于信任任意网站，给攻击者网站敞开了大门。任意攻击者网站可以直接跨域读取其资源内容。

2. #### Origin 校验错误

   校验Origin头时使用了错误的方式，如：

   - 前缀匹配：例如[www.example.com](http://www.example.com/) 想要允许[example.com](http://example.com/)访问，但是只做了前缀匹配，导致同时信任了[example.com.attack.com](http://example.com.attack.com/)的访问，而[example.com.attack.com](http://example.com.attack.com/) 是攻击者可以控制的网站。
   - 后缀匹配：例如[www.example.com](http://www.example.com/) 想要允许[example.com](http://example.com/)访问，由于后缀匹配出错，导致允许[attackexample.com](http://attackexample.com/)访问。
   - 没有转义’.’：例如，[example.com](http://example.com/)想要允许[www.example.com](http://www.example.com/) 访问时，但正则匹配没有转义’.’，导致允许[wwwaexample.com](http://wwwaexample.com/)访问。
   - 包含匹配：例如网站[www.example.com](http://www.example.com/) 想要允许 [example.com](http://example.com/)，但是Origin校验出错，出现允许[ample.com](http://ample.com/)访问。

3. #### 信任null

   ​ Access-Control-Allow-Origin: null

   ​ Access-Control-Allow-Credentials: true

4. #### Https域信任Http域

   如果HTTPS网站配置了CORS且信任HTTP域，那么中间人攻击者可以先劫持受信任HTTP域，然后通过这个域发送跨域请求到HTTPS网站，间接读取HTTPS域下的受保护内容。

5. #### 信任自身全部子域

   如果某个域配置了CORS且信任全部子域，那么攻击者可以利用其他任意子域上XSS漏洞，发送跨域请求到目标重要域网站，从而获取敏感内容。

6. #### Origin:\*与 Credentials:true 共用

   Access-Control-Allow-Origin: \*

   Access-Control-Allow-Credentials: true

### 修复建议：

1. 不要盲目反射 Origin头
2. 严格校验 Origin 头，避免出现权限泄露
3. 不要配置 Access-Control-Allow-Origin: null
4. HTTPS 网站不要信任HTTP 域
5. 不要信任全部自身子域，减少攻击面
6. 不要配置 Origin:\*和 Credentials: true
