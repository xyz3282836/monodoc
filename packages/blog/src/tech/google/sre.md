---
title: "Google SRE"
date: 2023-06-14 13:07:00 +8
category: architecture
tag:
  - secure
  - reliable
  - sre
---

> 100%的可用性是不现实的，需要达到这个目标的成本通常远 超于所能获得的价值，所以 Google 会针对每种产品设定一个错误预算（容错率）， 既能保证用户体验又不影响创新和部署的速度。

## SRE 方法论

### 组成

sre 的组成：

- 50%-60%标准软件工程师
- 40%-50%基本满足标准工程师（具备 85%-99%技能），同时具备一定程度`其他技术能力`的工程师。
  - unix 系统内部细节
  - 1-3 层网络知识

sre 的特点

- 对于重复性手工性的操作天然排斥
- 又能力快速开发软件系统来替代手工操作

sre 应该有个传统运维工作 50%的上限，并且随着时间推移期望全部消费这类工作，全力投入研发工作。因为整个系统应该可以自主运行，自动修复问题。

终极目标是推动整个系统趋向于无人化运行，不仅仅是自动化某些人工流程。

sre 必须将 50%精力花在真实开发工作上。

### 错误预算

不应该一味追求 100%，不是一个正确的可靠性目标。需要考虑

- 基于用户使用习惯，服务可靠性要达到什么程度用户才会满意
- 如果可靠程度不够，用户是否有其他代替选择
- 服务的可靠程度是否会影响用户对这项服务的使用模式

商业部和产品部必须由这两者建立一个合理的可靠性目标，一旦建立，1-可靠性目标就是错误预算，研发和 sre 可以在这个范围内将这个预算用于新功能或者创新等。

错误预算用途：研发团队可以上线新功能。提高新功能上线速度，常见战术策略，灰度发布，ab 测试等，这些手段都可以更合理使用错误预算。

#### 好处

解决研发和 sre 组织架构的冲突，不再是零事故，目标一致，为了保证业务可用性同时加快上线速度。

### 监控系统

sre 监控服务质量和可用性的主要手段。

三类输出

- alert，紧急警报，需要立刻介入执行操作
- ticket，工单，不影响系统，非立刻执行
- logging，日志

### 应急事件处理

评价一个团队将系统恢复到正常情况的最有效指标，MTTR。可靠性是 MTTF（平均失败时间）和 MTTR（平均恢复时间）的函数。

有预案的运维手册可以是 MTTR 降低 3 倍以上。

### 变更管理

70%事故由某种部署变更触发。

变更的最佳实践是使用自动化来完成如下：

- 渐进发布
- 可以迅速而准确检测问题发生
- 可回滚

### 预测和容量规划

需要具备这种预测和容量规划意识。

容量规划需要：

- 有个准确的自然增长的预测模型
- 规划中有准确非自然增长需求来源的统计
- 周期性压测

### 资源部署

资源部署和配置必须能够非常迅速完成。

### 效率与性能

需要关心资源利用率