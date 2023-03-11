# net http

## http client

创建连接会初始化两个 channel

go writeLoop

从 writech 读取 wr，wr 包含 \*Request，请求的一些信息

往 bufio.Writer (tcp 连接) 写入请求数据，结果 err 通过 writeRequest(wr) 中的 ch 发送

go readLoop

从 reqch 读取 rc，为了获取 req 的信息和可以发送 resp 的 ch

从 bufio.Reader (tcp 连接中) 读取 resp 的数据，copy req 部分数据来封装 resp，再把 resp 通过 requestAndChan(rc) 中的 ch 发送

roundTrip

获取到连接后

请求数据 writeRequest 发送到 writech (go writeLoop 处理)，writeRequest 包含一个 ch

然后把部分请求数据 封装到用于接受响应的 requestAndChan，requestAndChan 包含一个 ch

## http server
