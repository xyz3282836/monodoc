# redis

go-common redis 使用 go-redis/v8,go-redis/v8 支持 pipeline（计算 slot，并行请求多个 node，再合并结果），但是不支持 mget 这种原生多 key（redis-cluster 模式本身不支持），go-common redis 做了特殊处理，本质就是判断出是 mget，mset，exist，del（只做了这四个的适配）让后使用 go-redis/v8 的 pipeline
