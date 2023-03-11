# 执行 shell 的三种方式

./script-name (fork 方式) 运行的时候 terminal 会新开一个子 Shell 执行脚本，子 Shell 执行的时候, 父 Shell 还在。子 Shell 执行完毕后返回父 Shell。子 Shell 从父 Shell 继承环境变量，但是子 Shell 中的环境变量不会带回父 Shell。

bash ./script-name 当前 shell 启动一个子进程执行程序，不会对当前 shell 有影响

source ./script-name or . ./script-name 与 `fork` 的区别是不新开一个子 Shell 来执行被调用的脚本，而是在同一个 Shell 中执行. 所以被调用的脚本中声明的变量和环境变量, 都可以在主脚本中进行获取和使用。
