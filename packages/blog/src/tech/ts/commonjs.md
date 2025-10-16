---
title: "commons"
date: 2025-08-07 22:26:00 +8
category: js
tag:
  - commonsjs
---

### require本质

require(xxx) 返回一个对象

xxx.js

```ts
this = exports = module.exports;
// 上下文实际是个函数环境，在函数中存在以上三个参数，都是指向同一个对象
// 最终返回的是module.exports
```

require 寻找逻辑

```
require('./a')

```
