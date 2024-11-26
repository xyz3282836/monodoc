---
title: "docker-kubelet"
date: 2024-01-17 15:35:00 +8
category: docker
tag:
  - docker
---

## k8s vs Docker

https://zhuanlan.zhihu.com/p/405991286

参考文档：https://kubernetes.io/zh/docs/concepts/overview/components/

![components-of-kubernetes](./assets/components-of-kubernetes.svg)

## 概览

k8s 不用和 docker 打交道，containerd 直接包含了 cri-plugin

![kubernetes&&docker.drawio](./assets/kubernetes&&docker.drawio.png)
