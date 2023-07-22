## 灵魂拷问

How much confidence we can have in the complex systems that we put into production?

## 系统的弱点

1. improper fallback settings when a service is unavailable 服务不可用
2. retry storms from improperly tuned timeouts 超时不对，重试风暴
3. outages when a downstream dependency receives too much traffic 依赖不可用导致中断
4. cascading failures when a single point of failure crashes 单点不可用后大量失败

## 混动工程的由来

An empirical, systems-based approach addresses the chaos in distributed systems at scale and builds confidence in the ability of those systems to withstand realistic conditions. We learn about the behavior of a distributed system by observing it during a controlled experiment. We call this Chaos Engineering. 需要一个系统工程去承载（经验主义）

## 混沌工程的实践

1. Start by defining ‘steady state’ as some measurable output of a system that indicates normal behavior. 定义可以测量的稳态
2. Hypothesize that this steady state will continue in both the control group and the experimental group. 稳态要求
3. Introduce variables that reflect real world events like servers that crash, hard drives that malfunction, network connections that are severed, etc. 引入不同现实发生的事件
4. Try to disprove the hypothesis by looking for a difference in steady state between the control group and the experimental group. 寻稳态在实验的差异来推翻假设

## 高介原则

1. Build a Hypothesis around Steady State Behavior 围绕稳定指标的行为做假设建设

   The overall system’s throughput, error rates, latency percentiles, etc. could all be metrics of interest representing steady state behavior. 各种基础治标可以反映系统的稳态行为

2. Vary Real-world Events 改表现实事件

   Any event capable of disrupting steady state is a potential variable in a Chaos experiment. 任何扰乱稳态的事件都是潜在的变量

3. Run Experiments in Production 生产环境做实验
   To guarantee both authenticity of the way in which the system is exercised and relevance to the current deployed system, Chaos strongly prefers to experiment directly on production traffic. 确保真实性和相关性，混动工程需要线上流量来实验

4. Automate Experiments to Run Continuously 自动化建设
   Chaos Engineering builds automation into the system to drive both orchestration and analysis. 混动工程自动化来迫使编排和分析

5. Minimize Blast Radius 最小爆炸半径
   While there must be an allowance for some short-term negative impact, it is the responsibility and obligation of the Chaos Engineer to ensure the fallout from experiments are minimized and contained. 必须要有小范围的负面影响的容忍，混动工程有责任确保影响最小化和可控化
