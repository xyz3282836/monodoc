# redis

go-common redis 使用 go-redis/v8,go-redis/v8支持pipeline（计算slot，并行请求多个node，再合并结果），但是不支持mget这种原生多key（redis-cluster模式本身不支持），go-common redis做了特殊处理，本质就是判断出是mget，mset，exist，del（只做了这四个的适配）让后使用go-redis/v8的pipeline