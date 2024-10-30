---
title: "prometheus+granfan"
date: 2024-10-29 18:08:00 +8
category: docker
tag:
  - docker
  - prometheus
  - granfan
---

prometheus.yml

```yaml
global:
  scrape_interval: 60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: prometheus
    static_configs:
      #本地服务器加端口
      - targets: ["localhost:9090"]
        labels:
          instance: prometheus

  - job_name: localhost-node-exporter
    static_configs:
      #监控本地服务器ip+端口，因为是本地docker启动，所以ip使用host.docker.internal
      - targets: ["host.docker.internal:9100"]
        labels:
          instance: localhost-node-exporter
  - job_name: myaliyun
    static_configs:
      #监控远程服务器
      - targets: ["139.196.45.28:9100"]
        labels:
          instance: myaliyun
```
