# New Tech

dpvs

xdp/bpf https://mp.weixin.qq.com/s/H9imUbdJnfj1NKdK9jtxEw

xdp主要动态加速在用

dpu

cxl

nvlink



ngx那个不能算真无损热升级，不仅半连接以及全连接队列里的未被accept消费的req，长链接也无法迁移，且ngx的二进制热升级还有诸多限制并不好用与实用; envoy那个是通过UDS来传递listener_fd的机制实现

后来蚂蚁金服的mosn去基本支持了长链接，我上次看他们的issuess时除了一两个反馈的case需要fix下，看上去是完整支持长链接的迁移的





hash算法

goolge的maglev

facebook的tratain



rr

wrr

https://writings.sh/post/consistent-hashing-algorithms-part-1-the-problem-and-the-concept

https://www.jianshu.com/p/5fa447c60327

https://medium.com/vimeo-engineering-blog/improving-load-balancing-with-a-new-consistent-hashing-algorithm-9f1bd75709ed

https://zhuanlan.zhihu.com/p/131285273

beamer

https://www.usenix.org/system/files/conference/nsdi18/nsdi18-olteanu.pdf