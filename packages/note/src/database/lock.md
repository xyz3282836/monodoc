# 锁

- for update 仅适用于 InnoDB，并且必须开启事务，在 begin 与 commit 之间才生效。
- 要测试 for update 的锁表情况，可以利用 MySQL 的 Command Mode，开启二个视窗来做测试。
  **for update 的疑问点:**
- 当开启一个事务进行 for update 的时候，另一个事务也有 for update 的时候会一直等着，直到第一个事务结束吗？
  答：会的。除非第一个事务 commit 或者 rollback 或者断开连接，第二个事务会立马拿到锁进行后面操作。不过也可以设置锁等待超时参数 innodb_lock_wait_timeout 来解决。
- 如果没查到记录会加锁吗？
  答：会的。有主键/索引产生间隙锁，无主键/索引产生表锁表级锁。
- for update 和 for update nowait 区别（前者阻塞其他事务，后者拒绝其他事务）
  for update 锁住表或者锁住行，只允许当前事务进行操作（读写），其他事务被阻塞，直到当前事务提交或者回滚，被阻塞的事务自动执行
  for update nowait 锁住表或者锁住行，只允许当前事务进行操作（读写），其他事务被拒绝，事务占据的 statement 连接也会被断开
