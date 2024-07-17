---
title: "csrf"
date: 2024-04-07 18:06:00 +8
category: web
tag:
  - web
  - csrf
---

## CSRF错误配置漏洞修复建议

### 漏洞简介：

CSRF(Cross-site request forgery) 跨站请求伪造，是用一些欺骗的手段诱导受害者访问一个带攻击代码的第三方网站，带攻击代码的第三方网站向被攻击的网站发起跨站请求。利用受害者已经登陆的权限，进行一些需要登陆的敏感操作。

### 两种常见的 CSRF 漏洞利用：

1. #### GET方法的CSRF

   `<img src=``"https://xxx.bilibili.com/action?xxx=xxx"` `>`

   受害者访问带攻击代码的站点时，浏览器会带上 bilibili 域的 Cookie 请求 http://xxx.bilibili.com/action?xxx=xxx 域名

2. #### POST方法的CSRF

   `<form action=``"https://xxx.bilibili.com/action"` `method=POST>``  ``<input type=``"hidden"` `name=``"xxx"` `value=``"xxx"` `/>``</form>``<script> document.forms[0].submit(); </script>`

### 修复建议：

1. 敏感操作避免使用 GET 方法（目前我们有一些业务同时支持 GET、POST 两种方式请求，GET 请求无 CSRF TOKEN 的校验）
2. POST 请求增加 CSRF TOKEN 校验（第三方站点无法获取用户的Token）
3. 其他建议：也可以增加同源检测
