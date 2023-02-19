# mysql字符集

```shell
mysql> SHOW VARIABLES LIKE 'character_set_client';
+----------------------+---------+
| Variable_name        | Value   |
+----------------------+---------+
| character_set_client | utf8mb4 |
+----------------------+---------+
1 row in set, 1 warning (0.00 sec)

mysql> SHOW VARIABLES LIKE 'character_set_connection';
+--------------------------+---------+
| Variable_name            | Value   |
+--------------------------+---------+
| character_set_connection | utf8mb4 |
+--------------------------+---------+
1 row in set, 1 warning (0.00 sec)

mysql> SHOW VARIABLES LIKE 'character_set_results';
+-----------------------+---------+
| Variable_name         | Value   |
+-----------------------+---------+
| character_set_results | utf8mb4 |
+-----------------------+---------+
1 row in set, 1 warning (0.00 sec)
```

其中：

- `character_set_client`: 服务器解码请求时使用的字符集
- `character_set_connection`：服务器处理请求时将字符集转换成这个字符集处理。操作具体列时，在转换为具体列的编码。
- `character_set_results`:服务器向客户端返回数据时使用的字符集

MySQL 设计这三个编码的时候，出于以下考虑：

- 一个 MySQL，可能有多种不同语言和操作系统或者国家的客户端，所以通过设置`character_set_client`还有`character_set_results`进行兼容。
- 由于操作具体列数据的时候需要编码转换，如果`character_set_connection`和字段一致的话，就不用转换了，所以设置`character_set_connection`可以让 MySQL 用一种编码理解命令统一处理，同时设置`character_set_connection`为最常用的可以减少转换。

一般情况下，保持这三个一致就好。我们就设置好连接使用的字符集就行了。