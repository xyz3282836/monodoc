# b 站 kv 搜索分享

### 场景

Data intensity ：亿级稿件选 top-N

latency sensitive：500ms

OLAP：列式存储，搜推场景

OLTP：行式存储，主站场景

### kv 分类

embedded in memory kv: 语言提供的 map 存储

in memory kv srever: memcached, redis

embedded kv database: leveldb, rocksdb(基于 lsmtree)

distributed kv database: taishan, TiKV

complicated data-model: BigTable, MongoDB, Cassandra, Dynamo

data structure: B-tree, LSM-tree, hash-map

### Embedded in memory KV

业务场景：每秒查询 20 亿个 key，20 kps，随机点读，random point read，10-20G，10w kps update

高频访问，存储不大，增量远远小于存量

选型是内存数据库 kv，数据结构 hashmap

对于高频，随机，点查场景有很多数据结构可以选择，skin-list，sorted-array，hash-map，btree，rbtree

hash-map 多种实现（核心问题是解决 key 冲突）：open-addressing，separate chaining，perfect-hash，cuckoo-hash（google 布谷鸟 hash，理论复杂度最坏是 O(1)，实际生成环境不理想，建立 hash 表无限循环，建立索引失败，依赖两个 hash 函数解决冲突；另外查询冲突的 key 离的比较远，效率就低了，cache 命中率比较低，不友好）

影响 hash 的几个因素：hash 函数，更少的指令计算更加均匀的 hash；计算 hash 分桶的过程（取模太慢），小的数据规模可以使用位操作，大的数据规模可以采用高 32 位\*bucket 再去取高 32 位作为 bucket 的 index

#### 几种现在比较高效的 hash 结构

##### robin-hood hash

##### flatmap

##### flat hash map（f14）

并不适合当前业务场景，90%命中率，value 是指针 int64 地址

##### neighbor hash

采用 open-address，冲突放在最近，提高 cache 命中率

x64 架构下，64bit 地址只是使用了 48 位，用剩下的 16bit 来存放冲突的下个节点

##### epoch protection framework

![](./../img/kv/image-20221024181314427.png)

一次批量操作，只原子操作一次

### KFC

remote kv store

参考 google mesa，apache doris

batch update 吞吐大

##### nvme backend

key 存放在内存，value 存放 nvme；复用 48bit value，1bit 作为标识是否是 cache 还是 nvme

### KV in parameter Server
