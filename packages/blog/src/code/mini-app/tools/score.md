---
date: 2020-10-09
title: 评分方法
icon: rank
category: 小程序
---

目前体验评分共有 27 条规则，共分为三类: 性能、体验、最佳实践，满足规则要求得分(100 分)，否则不得分(0 分)，最后根据各规则权重和公式计算出总得分。

<!-- more -->

![audits_formula](https://res.wx.qq.com/wxdoc/dist/assets/img/audits_formula.ba03ca01.png)

权重为 0 的规则，表示该规则不参与评分，仅作为提示项。开发者可在开发者工具中可以点击“忽略”。

各规则的得分条件也可能会随小程序的版本更新有一定的调整。

## 权重表

| 分类     | 规则                             | 权重 |
| -------- | -------------------------------- | ---- |
| 性能     | 脚本执行时间                     | 7    |
|          | 首屏时间                         | 6    |
|          | 渲染时间                         | 6    |
|          | setData 调用频率                 | 6    |
|          | setData 数据大小                 | 6    |
|          | WXML 节点数                      | 6    |
|          | 请求耗时                         | 5    |
|          | 网络请求数                       | 5    |
|          | 图片请求数                       | 5    |
|          | 图片缓存                         | 4    |
|          | 图片大小                         | 4    |
|          | 避免 setData 数据冗余            | 3    |
|          | 网络请求缓存                     | 2    |
| 体验     | 开启惯性滚动                     | 8    |
|          | 避免使用:active 伪类来实现点击态 | 8    |
|          | 保持图片大小比例                 | 4    |
|          | 可点击元素的响应区域             | 3    |
|          | iPhone X 兼容                    | 3    |
|          | 合理的颜色搭配                   | 0    |
| 最佳实践 | 避免 JS 异常                     | 3    |
|          | 避免网络请求异常                 | 3    |
|          | 废弃接口                         | 2    |
|          | 使用 HTTPS                       | 1    |
|          | 最低基础库版本                   | 0    |
|          | 移除不可访问到的页面             | 0    |
|          | WXSS 使用率                      | 0    |
|          | 及时回收定时器                   | 0    |

## 性能

1. 首屏时间

   首屏时间是指用户从打开小程序看到第一屏主要内容的时间，首屏时间太长会导致用户长时间看到的都是白屏，影响使用体验。

   优化首屏时间，可以分为以下几种情况:

   1. 首屏渲染的内容较多，需要集合多份数据进行渲染。这种情况需要开发者把内容分优先级，把优先级高的内容做优先展示，缩短白屏时间；
   1. 首屏内容依赖的数据从服务端请求的时间太长。开发者需要从服务端侧具体分析服务端数据返回的时间长的原因；
   1. 一次性渲染数据太大或依赖的计算过于复杂。减少渲染的数据量、优化渲染相关数据的算法可以解决这类问题。

   得分条件: **首屏时间不超过 5 秒**

1. 渲染时间

   渲染时间指的是首次渲染或因数据变化带来的页面结构变化的渲染花费的时间。

   渲染界面的耗时过长会让用户觉得卡顿，体验较差，出现这一情况时，需要校验下是否同时渲染的区域太大(例如列表过长)，或渲染依赖的计算是否过于复杂。

   得分条件: 渲**染时间不超过 500ms**

1. 脚本执行时间

   脚本执行时间是指 JS 脚本在一次同步执行中消耗的时间，比如生命周期回调、事件处理函数的同步执行时间。

   执行脚本的耗时过长会让用户觉得卡顿，体验较差，出现这一情况时，需要确认并优化脚本的逻辑

   得分条件: **一个执行周期内脚本运行时间不超过 1 秒**

1. `setData` 调用频率

   `setData` 接口的调用涉及逻辑层与渲染层间的线程通信，通信过于频繁可能导致处理队列阻塞，界面渲染不及时而导致卡顿，应避免无用的频繁调用。

   得分条件: **每秒调用 setData 的次数不超过 20 次**

1. `setData` 数据大小

   由于小程序运行逻辑线程与渲染线程之上，`setData` 的调用会把数据从逻辑层传到渲染层，数据太大会增加通信时间。

   得分条件: **`setData` 的数据在 JSON.stringify 后不超过 256KB**

1. 避免 `setData` 数据冗余

   `setData` 操作会引起框架处理一些渲染界面相关的工作，一个未绑定的变量意味着与界面渲染无关，传入 set`Data 会造成不必要的性能消耗。

   得分条件: **`setData` 传入的所有数据都在模板渲染中有相关依赖**

1. WXML 节点数

   建议一个页面使用少于 1000 个 WXML 节点，节点树深度少于 30 层，子节点数不大于 60 个。一个太大的 WXML 节点树会增加内存的使用，样式重排时间也会更长，影响体验。

   得分条件: **页面 WXML 节点少于 1000 个，节点树深度少于 30 层，子节点数不大于 60 个**

1. 图片缓存

   开启 HTTP 缓存控制后，下一次加载同样的图片，会直接从缓存读取，大大提升加载速度。

   得分条件: **所有图片均开启 HTTP 缓存**

1. 图片大小

   图片太大会增加下载时间和内存的消耗，应根据显示区域大小合理控制图片大小。

   得分条件: **图片宽高都不超过实际显示宽高的 3 倍**

1. 请求耗时

   请求的耗时太长会让用户一直等待甚至离开，应当优化好服务器处理时间、减小回包大小，让请求快速响应。

   得分条件: **所有网络请求都在 1 秒内返回结果**

1. 网络请求数

   短时间内发起太多请求会触发小程序并行请求数量的限制，同时太多请求也可能导致加载慢等问题，应合理控制请求数量，甚至做请求的合并等。

   得分条件: **每秒通过 wx.request 发起的请求数不超过 10 个**

1. 图片请求数

   短时间内发起太多图片请求会触发浏览器并行加载的限制，可能导致图片加载慢，用户一直处理等待。应该合理控制数量，可考虑使用雪碧图技术或在屏幕外的图片使用懒加载。

   得分条件: **每秒发起的图片请求数不超过 20 个**

1. 网络请求缓存

   发起网络请求总会让用户等待，可能造成不好的体验，应尽量避免多余的请求，比如对同样的请求进行缓存

   得分条件: **3 分钟以内同一个 URL 请求不出现两次回包大于 128KB 且一模一样的内容**

## 体验

1. 开启惯性滚动

   惯性滚动会使滚动比较顺畅，在安卓下默认有惯性滚动，而在 iOS 下需要额外设置 `-webkit-overflow-scrolling: touch` 的样式；

   得分条件: **wxss 中带有 `overflow: scroll` 的元素，在 iOS 下需要设置 `-webkit-overflow-scrolling: touch` 样式**

1. 避免使用 `:active` 伪类来实现点击态

   使用 CSS `:active` 伪类来实现点击态，很容易触发，并且滚动或滑动时点击态不会消失，体验较差。建议使用小程序内置组件的 `'hover-class'` 属性来实现

   得分条件: 不使用 `:active` 伪类，并使用 `hover-class` 替换 `:active`

1. 保持图片大小比例

   图片若没有按原图宽高比例显示，可能导致图片歪曲，不美观，甚至导致用户识别困难。可根据情况设置 image 组件的 `mode` 属性，以保持原图宽高比。

   得分条件: **显示的高/宽与原图的高/宽不超过 15%**

1. 可点击元素的响应区域

   我们应该合理地设置好可点击元素的响应区域大小，如果过小会导致用户很难点中，体验很差。

   得分条件: **可点击元素的宽高都不小于 20px**

1. iPhone X 兼容

   对于 `position: fixed` 的可交互组件，如果渲染在 iPhone X 的安全区域外，容易误触 Home Indicator，应当把可交互的部分都渲染到安全区域内。

   建议使用以下 wxss 进行兼容

   ```css
   padding-bottom: constant(safe-area-inset-bottom);
   padding-bottom: env(safe-area-inset-bottom);
   ```

   得分条件: `position: fixed` 的可交互组件渲染在安全区域内

1. 合理的颜色搭配

   文字颜色与背景色需要搭配得当，适宜的颜色对比度可以让用户更好地阅读，提升小程序的用户体验。

   由于颜色搭配的计算方法较为复杂，目前算法还在不断优化中。因此该指标仅作为评分的提醒项，不计入总分中。

   判断标准:

   1. 对于较大字体(font-size >= 24px，或同时满足 font-size >= 19px 与 font-weight >= 700)，文字颜色和背景颜色的对比度不小于 3

   1. 其他字体，文字颜色和背景颜色的对比度不小于 4.5
