# 毛老师推荐doc

Quick Start：
https://golang.org/doc/install
https://tour.golang.org/welcome/1

语言层面：
《Effective Go》 https://golang.org/doc/effective_go.html （我是看这个入门，官方推荐的文档，轻松易读
https://item.jd.com/12187988.html （比较详细的书籍

实战 & 规范：

《Code Review Comments》
en：https://github.com/golang/go/wiki/CodeReviewComments
cn：https://studygolang.com/articles/10960

《High Performance Go Workshop》
https://dave.cheney.net/high-performance-go-workshop/dotgo-paris.html#overview

《Practical Go: Real world advice for writing maintainable Go programs》
https://dave.cheney.net/practical-go/presentations/qcon-china.html

Runtime：
https://draveness.me/golang/ （类似书籍比较多，还有一本雨痕的可以找找

官方文档：
golang.org
godoc.org
=================

其他国内的书我看的比较少，最推荐上面的 Effective Go，另外了解下 B 站的框架：
https://github.com/bilibili/kratos

https://www.ardanlabs.com/blog/2014/01/concurrency-goroutines-and-gomaxprocs.html

goroutine
https://www.ardanlabs.com/blog/2014/01/concurrency-goroutines-and-gomaxprocs.html
https://www.ardanlabs.com/blog/2018/11/goroutine-leaks-the-forgotten-sender.html
https://www.ardanlabs.com/blog/2019/04/concurrency-trap-2-incomplete-work.html

https://github.com/go-kratos/kratos/blob/main/registry/registry.go

memory model
https://cch123.github.io/ooo/
https://blog.csdn.net/qcrao/article/details/92759907
https://blog.csdn.net/caoshangpa/article/details/78853919
https://zhuanlan.zhihu.com/p/62249692
https://golang.org/ref/mem

sync

data race
sync.atomic
errgroup
sync.pool

https://blog.golang.org/codelab-share
https://medium.com/a-journey-with-go/go-understand-the-design-of-sync-pool-2dde3024e277
https://medium.com/a-journey-with-go/go-how-are-deadlocks-triggered-2305504ac019
https://medium.com/a-journey-with-go/go-monitor-pattern-9decd26fb28
https://medium.com/a-journey-with-go/go-mutex-and-starvation-3f4f4e75ad50
https://medium.com/a-journey-with-go/go-how-to-reduce-lock-contention-with-the-atomic-package-ba3b2664b549
https://www.ardanlabs.com/blog/2013/09/detecting-race-conditions-with-go.html

chan
https://www.ardanlabs.com/blog/2017/10/the-behavior-of-channels.html
https://medium.com/a-journey-with-go/go-buffered-and-unbuffered-channels-29a107c00268
https://medium.com/a-journey-with-go/go-ordering-in-select-statements-fd0ff80fd8d6

https://www.ardanlabs.com/blog/2017/10/the-behavior-of-channels.html
https://www.ardanlabs.com/blog/2014/02/the-nature-of-channels-in-go.html
https://www.ardanlabs.com/blog/2013/10/my-channel-select-bug.html

https://blog.golang.org/io2013-talk-concurrency
https://blog.golang.org/waza-talk
https://blog.golang.org/io2012-videos
https://blog.golang.org/concurrency-timeouts
https://blog.golang.org/pipelines
https://www.ardanlabs.com/blog/2014/02/running-queries-concurrently-against.html
https://blogtitle.github.io/go-advanced-concurrency-patterns-part-3-channels/

https://www.ardanlabs.com/blog/2013/05/thread-pooling-in-go-programming.html
https://www.ardanlabs.com/blog/2013/09/pool-go-routines-to-process-task.html

context
https://medium.com/a-journey-with-go/go-context-and-cancellation-by-propagation-7a808bbc889c
https://blog.golang.org/context
https://www.ardanlabs.com/blog/2019/09/context-package-semantics-in-go.html
https://zhuanlan.zhihu.com/p/34417106?hmsr=toutiao.io
https://medium.com/@cep21/how-to-correctly-use-context-context-in-go-1-7-8f2c0fafdf39

https://dave.cheney.net/2017/01/26/context-is-for-cancelation
https://dave.cheney.net/2017/08/20/context-isnt-for-cancellation

error vs exception
https://www.infoq.cn/news/2012/11/go-error-handle/
https://golang.org/doc/faq#exceptions

https://www.ardanlabs.com/blog/2014/10/error-handling-in-go-part-i.html
https://www.ardanlabs.com/blog/2014/11/error-handling-in-go-part-ii.html
https://www.ardanlabs.com/blog/2017/05/design-philosophy-on-logging.html
https://medium.com/gett-engineering/error-handling-in-go-53b8a7112d04
https://medium.com/gett-engineering/error-handling-in-go-1-13-5ee6d1e0a55c
https://rauljordan.com/2020/07/06/why-go-error-handling-is-awesome.html
https://morsmachine.dk/error-handling
https://crawshaw.io/blog/xerrors
https://dave.cheney.net/2012/01/18/why-go-gets-exceptions-right
https://dave.cheney.net/2015/01/26/errors-and-exceptions-redux
https://dave.cheney.net/2014/11/04/error-handling-vs-exceptions-redux
https://dave.cheney.net/2014/12/24/inspecting-errors
https://dave.cheney.net/2016/04/07/constant-errors
https://dave.cheney.net/2019/01/27/eliminate-error-handling-by-eliminating-errors
https://dave.cheney.net/2016/06/12/stack-traces-and-the-errors-package
https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully
https://blog.golang.org/errors-are-values
https://blog.golang.org/error-handling-and-go
https://blog.golang.org/go1.13-errors
https://commandcenter.blogspot.com/2017/12/error-handling-in-upspin.html

go2
https://go.googlesource.com/proposal/+/master/design/29934-error-values.md
https://go.googlesource.com/proposal/+/master/design/go2draft-error-handling.md
https://go.googlesource.com/proposal/+/master/design/go2draft-error-handling-overview.md

Project Layout
https://www.youtube.com/watch?v=oL6JBUk6tj0
https://github.com/zitryss/go-sample
https://github.com/danceyoung/paper-code/blob/master/package-oriented-design/packageorienteddesign.md
https://medium.com/@eminetto/clean-architecture-using-golang-b63587aa5e3f
https://hackernoon.com/golang-clean-archithecture-efd6d7c43047
https://medium.com/@benbjohnson/standard-package-layout-7cdbc8391fc1
https://medium.com/wtf-dial/wtf-dial-domain-model-9655cd523182

https://hackernoon.com/golang-clean-archithecture-efd6d7c43047
https://hackernoon.com/trying-clean-architecture-on-golang-2-44d615bf8fdf
https://manuel.kiessling.net/2012/09/28/applying-the-clean-architecture-to-go-applications/
https://github.com/katzien/go-structure-examples
https://www.youtube.com/watch?v=MzTcsI6tn-0
https://www.appsdeveloperblog.com/dto-to-entity-and-entity-to-dto-conversion/
https://travisjeffery.com/b/2019/11/i-ll-take-pkg-over-internal/

https://github.com/google/wire/blob/master/docs/best-practices.md
https://github.com/google/wire/blob/master/docs/guide.md
https://blog.golang.org/wire
https://github.com/google/wire

DDD

https://zhuanlan.zhihu.com/p/30843800
https://zhuanlan.zhihu.com/p/339334933

https://zhuanlan.zhihu.com/p/105466656
https://zhuanlan.zhihu.com/p/105648986
https://zhuanlan.zhihu.com/p/106634373
https://zhuanlan.zhihu.com/p/107347593
https://zhuanlan.zhihu.com/p/109048532
https://zhuanlan.zhihu.com/p/110252394

https://zhuanlan.zhihu.com/p/141908054
https://zhuanlan.zhihu.com/p/143573649
https://zhuanlan.zhihu.com/p/145205154

https://zhuanlan.zhihu.com/p/138884686

https://www.citerus.se/go-ddd/
https://www.citerus.se/part-2-domain-driven-design-in-go/
https://www.citerus.se/part-3-domain-driven-design-in-go/

https://www.jianshu.com/p/dfa427762975
https://www.jianshu.com/p/5732b69bd1a1

https://www.cnblogs.com/qixuejia/p/10789612.html
https://www.cnblogs.com/qixuejia/p/4390086.html
https://www.cnblogs.com/qixuejia/p/10789621.html

https://zhuanlan.zhihu.com/p/107347789

https://blog.csdn.net/taobaojishu/article/details/106152641
https://mp.weixin.qq.com/s/w1zqhWGuDPsCayiOgfxk6w

https://zhuanlan.zhihu.com/p/345679681

https://kb.cnblogs.com/tag/DDD/
https://kb.cnblogs.com/page/520743/
https://kb.cnblogs.com/page/520746/

https://www.infoq.cn/article/ddd-in-practice/

https://www.jianshu.com/p/ae473acea7de
https://blog.csdn.net/maoyeqiu/article/details/112788122

阿里 DDD 系列分享
https://zhuanlan.zhihu.com/p/340911587
https://zhuanlan.zhihu.com/p/84223605
https://zhuanlan.zhihu.com/p/348706530
https://zhuanlan.zhihu.com/p/356518017
https://zhuanlan.zhihu.com/p/366395817

API

https://netflixtechblog.com/practical-api-design-at-netflix-part-1-using-protobuf-fieldmask-35cfdc606518
https://netflixtechblog.com/practical-api-design-at-netflix-part-2-protobuf-fieldmask-for-mutation-operations-2e75e1d230e4
https://google.aip.dev/161

中文：
https://mp.weixin.qq.com/s/8r4MBXJNkL1C99MIf82Afw
https://mp.weixin.qq.com/s/La8BCftoFyUEXg5SUjxIAg

https://developers.google.com/slides/api/guides/field-masks
https://google.aip.dev/161
https://linter.aip.dev/
https://google.aip.dev/general

https://mp.weixin.qq.com/s/FiqQVIvh2mBjxfMvgX4nNg

Memory

https://www.jianshu.com/p/1ffde2de153f

Stack
https://kirk91.github.io/posts/2d571d09/
http://yangxikun.github.io/golang/2019/11/12/go-goroutine-stack.html
https://zhuanlan.zhihu.com/p/28484133
https://agis.io/post/contiguous-stacks-golang/

Pointer
https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html
https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-escape-analysis.html

Escape
https://blog.csdn.net/qq_35587463/article/details/104221280
https://www.do1618.com/archives/1328/go-%E5%86%85%E5%AD%98%E9%80%83%E9%80%B8%E8%AF%A6%E7%BB%86%E5%88%86%E6%9E%90/
https://www.jianshu.com/p/518466b4ee96

Internal
https://zhuanlan.zhihu.com/p/237870981

https://docs.google.com/document/d/13v_u3UrN2pgUtPnH4y-qfmlXwEEryikFu0SQiwk35SA/pub
https://docs.google.com/document/d/1lyPIbmsYbXnpNj57a261hgOYVpNRcgydurVQIyZOz_o/pub

https://zhuanlan.zhihu.com/p/266496735
http://dmitrysoshnikov.com/compilers/writing-a-memory-allocator/
https://studygolang.com/articles/22652?fr=sidebar
https://studygolang.com/articles/22500?fr=sidebar
https://www.cnblogs.com/unqiang/p/12052308.html
https://blog.csdn.net/weixin_33869377/article/details/89801587?utm_medium=distribute.pc_relevant.none-task-blog-title-7&spm=1001.2101.3001.4242
https://zhuanlan.zhihu.com/p/53581298
https://github.com/dgraph-io/badger/tree/master/skl
https://dgraph.io/blog/post/manual-memory-management-golang-jemalloc/
https://zhuanlan.zhihu.com/p/266496735
https://www.jianshu.com/p/1ffde2de153f

https://www.jianshu.com/p/7405b4e11ee2
https://www.jianshu.com/p/518466b4ee96
https://zhuanlan.zhihu.com/p/59125443

https://www.jianshu.com/p/ebd8b012572e

GC

https://spin.atomicobject.com/2014/09/03/visualizing-garbage-collection-algorithms/
https://zhuanlan.zhihu.com/p/245214547

https://www.jianshu.com/p/2f94e9364ec4
https://www.jianshu.com/p/ebd8b012572e

https://www.ardanlabs.com/blog/2018/12/garbage-collection-in-go-part1-semantics.html
https://segmentfault.com/a/1190000012597428

https://www.jianshu.com/p/bfc3c65c05d1

https://golang.design/under-the-hood/zh-cn/part2runtime/ch08gc/sweep/
https://zhuanlan.zhihu.com/p/74853110
https://www.jianshu.com/p/2f94e9364ec4
https://juejin.im/post/6844903917650722829
https://zhuanlan.zhihu.com/p/74853110
https://juejin.im/post/6844903917650722829

https://www.jianshu.com/p/ebd8b012572e
https://www.jianshu.com/p/2f94e9364ec4
https://www.jianshu.com/p/bfc3c65c05d1

https://zhuanlan.zhihu.com/p/92210761
https://blog.csdn.net/u010853261/article/details/102945046
https://blog.csdn.net/hello_bravo_/article/details/103840054

https://segmentfault.com/a/1190000020086769
https://blog.csdn.net/cyq6239075/article/details/106412038
https://zhuanlan.zhihu.com/p/77943973

https://www.ardanlabs.com/blog/2018/12/garbage-collection-in-go-part1-semantics.html
https://www.ardanlabs.com/blog/2019/05/garbage-collection-in-go-part2-gctraces.html
https://www.ardanlabs.com/blog/2019/07/garbage-collection-in-go-part3-gcpacing.html

https://segmentfault.com/a/1190000022030353?utm_source=sf-related
https://www.jianshu.com/p/0083a90a8f7e
