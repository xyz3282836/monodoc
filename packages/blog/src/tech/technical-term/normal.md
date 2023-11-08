---
title: "常用术语"
date: 2023-11-06 16:37:00 +8
category: 术语
tag:
  - 技术概念
---

## 内容相关

诸如 PUGC、UGC 等均在指视频平台的运行模式，而 PUGC 全称 Professional Generated Content + User Generated Content，即即“专业用户生产内容”或“专家生产内容”，指在视频平台中把 UGC 和 PGC 模式结合的内容生产模式。

UGC：全称 User Generated Content，也就是`用户生成内容`，即用户原创内容。即用户把自己原创的内容通过互联网平台进行展示或者提供给其他用户。

PGC：全称 Professional Generated Content，指`专业生产内容`。用来泛指内容个性化、视角多元化、传播民主化、社会关系虚拟化。

PUGV：`专业用户制作的视频`，PUGV 介于 OGV（机构制作的视频）和 UGV（普通用户制作的视频）之间，就是视频创作者在自己的专业领域，或者是经过一段学习、研究后熟悉了一个领域，发布一系列相关、经过精心制作和剪辑的视频。

UGV：`普通用户生产的视频`，PUGV 有较高的创作门槛，要有选题、文案、剪辑能力等等，相比 UGV 就更适合所有人。

OGV：`机构制作的视频`，包括电影、电视剧、动画等。

ACG：（`漫画、动画、游戏`）即 Animation（动画）、Comics（漫画）与 Games（游戏）的首字母缩写，来源不是英语，也不是一个英语单词。

## 数据相关

### 用户数

AU：(Active User)`活跃用户数`。

PU：(Paying User)`付费用户数`。

APA：(Active Payment Account）：`活跃付费用户数`。

DAU：(Daily Active User)`日活跃用户数`。常用于反映网站、互联网应用或网络游戏的运营情况。DAU 通常统计一日（统计日）之内，登录或使用了某个产品的用户数（去除重复登录的用户），这与流量统计工具里的访客（UV）概念相似。

MAU：(Monthly Active Users)`月活跃用户数`。

PCU：(Peak Concurrent Users )`最高同时在线用户数`。

### 用户收入

ARPU：(Average Revenue Per User)`每用户平均收入`，可通过`总收入/AU`计算得出，用于衡量电信运营商和互联网公司业务收入的指标。

ARPPU： (Average Revenue Per Paying User)`每付费用户平均收入`，可通过 `总收入/APA` 计算得出。

PUR：(Pay User Rate)`付费比率`，可通过`APA/AU`计算得出。

AMPU：每用户平均利润。以纯利润而不是以总收入为基础来计算的。近年来，随着利基市场的饱和，一些电信运营商更依赖 AMPU 而不是 ARPU，来将他们的收益最大化。

### 其他

KPI：关键绩效指标法，是企业绩效考核的方法之一，其特点是考核指标 围绕关键成果领域进行选取。

MOU：(Minutesof Usage)平均每户每月通话时间。

OTT：(Over The Top)是指通过互联网向用户提供各种应用服务。这种应用和目前运营商所提供的通信业务不同，它仅利用运营商的网络，而服务由运营商之外的第三方提供。目前，典型的 OTT 业务有互联网电视业务，苹果应用商店等。

CPC：(Cost Per Click)每次点击付费广告。网络中最常见的一种广告形式。

CPM：(Cost Per Mille)广告投放过程中，听到或者看到某广告的每一人平均分担到多少广告成本。

CPA：(Cost Per Action)每行动成本，指投放按广告实际效果，即按回应的有效问卷或定单来计费，而不限广告投放量。CPA 的计价方式对于网站而言有一定的风险，但若广告投放成功，其收益也比 CPM 的计 价方式要大得多。广告主为规避广告费用风险，只有当网络用户点击旗帜广告，链接广告主网页后，才按点击次数付给广告站点费用。

CPR：(Cost Per Response)每回应成本，以浏览者的每一个回应计费。这种广告计费充分体现了网络广告“及时反应、直接互动、准确记录”的特点。但是，这个显然是属于辅助销售的广告模式，对于那些实际只要亮出名字就已经有一半满足的品牌广告要求。

## 服务

**(必须描述) High Availability／容错(超时，降级，重试，熔断，限流等)／性能／scalability(状态)等的设计考虑**

可靠性

Failover，失效切换

Failback，自动恢复

Failsafe，安全兜底

Failfast，快速失败

Circuit Breker，熔断

BulkHead，故障阈隔离

FallBack，降级

CurrentLimitting，限流

防误操作，边界判断

性能

确定服务的极限能力

扩展性

缓存

状态

**(必须描述) 可运维性(部署，升级，配置变更等)，可观测性(方便监控与数据分析)**

可维护性

/metrics 接口

标准协议

文档，注释

支持节点迁移

平台化

**(必须描述) UT 或集成测试需要覆盖的测试场景与用例**

测试用例

## reference

https://www.028honghai.com/179481.html
