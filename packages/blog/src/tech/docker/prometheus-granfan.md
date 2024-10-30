---
title: "prometheus+granfan"
date: 2024-10-29 18:08:00 +8
category: docker
tag:
  - docker
  - prometheus
  - granfan
---

### prometheus.yml

```yaml
# my global config
global:
  scrape_interval: 5s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 5s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "bwg_wode"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    scheme: "https"
    static_configs:
      - targets: ["www.ruizhou.buzz"]
```

### web-config.yml

```yaml
basic_auth_users:
  root: $2a$10$SbdVuCOUD8ax.YQ2kX69Muu8rxXAsqFZ2gtZ/43yh9BVFl12HQkhi
```

### compose.yml

```yaml
version: "1.0"
services:
  prometheus:
    restart: always
    container_name: prometheus
    image: prom/prometheus:latest
    command:
      # 配置文件
      - "--config.file=/etc/prometheus/prometheus.yml"
      # 指定web面板账号密码访问
      # - '--web.config.file=/etc/prometheus/web-config.yml'
      # 数据目录
      - "--storage.tsdb.path=/data/prometheus"
      # 数据保留时间
      - "--storage.tsdb.retention.time=30d"
      # 运行使用 curl -X POST http://localhost:9090/-/reload  重载其配置
      - "--web.enable-lifecycle"
    volumes:
      # 需要权限 mkdir prometheus_data && chown 65534 ./prometheus_data
      - ./config/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./data:/data/prometheus
      - ./config/web-config.yml:/etc/prometheus/web-config.yml
    ports:
      - 9090:9090

  grafana:
    restart: always
    container_name: grafana
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - ./grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=123456
      - GF_USERS_ALLOW_SIGN_UP=false
```

### run shell

```shell
docker run \
    -p 9090:9090 \
    -v ~/dev/promtheus/bwg_wode/config/prometheus.yml:/etc/prometheus/prometheus.yml \
    -v ~/dev/promtheus/bwg_wode/data:/etc/prometheus/data \
    prom/prometheus:latest \
	--storage.tsdb.path=/etc/prometheus/data \
	--storage.tsdb.retention.time=30d \
	--config.file=/etc/prometheus/prometheus.yml
```
