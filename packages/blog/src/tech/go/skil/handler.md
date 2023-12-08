---
title: "go技巧"
date: 2023-11-15 14:26:00 +8
category: go
tag:
  - skill
---

handler模式

```go
package mw

import (
	"context"
	"fmt"
	"math"
)

// handler 定义
// Handler responds to an HTTP request.
// 结构体 Demo 和 函数HandlerFunc 都实现了
type AppHandler interface {
	Analysis(c context.Context, app *AppData)
}

// HandlerFunc http request handler function.
type AppHandlerFunc func(c context.Context, app *AppData)

// ServeHTTP calls f(ctx).
func (f AppHandlerFunc) Analysis(c context.Context, app *AppData) {
	f(c, app)
}

// 载体定义
const (
	_abortIndex int8 = math.MaxInt8 / 2
)

// AppData
type AppData struct {
	ctx      context.Context
	index    int8
	handlers []AppHandlerFunc
}

func NewAppData() *AppData {
	return &AppData{
		index: -1,
	}
}

func (app *AppData) Next() {
	// fmt.Println(len(app.handlers))
	app.index++
	for app.index < int8(len(app.handlers)) {
		fmt.Println("next-index", app.index)
		app.handlers[app.index](app.ctx, app)
		app.index++
	}
}

func (app *AppData) Abort() {
	app.index = _abortIndex
}

func (app *AppData) Use(middleware ...AppHandler) {
	for _, m := range middleware {
		app.handlers = append(app.handlers, m.Analysis)
	}
}
func (app *AppData) UseFunc(middleware ...AppHandlerFunc) {
	app.handlers = append(app.handlers, middleware...)
}

```

实现

```go
	app := mw.NewAppData()

	a := &appsetconf.AppSetConfHandler{Name: "conf"}
	b := &appsetip.AppSetIpHandler{Name: "ip"}

	a1 := func() mw.AppHandlerFunc {
		return func(c context.Context, app *mw.AppData) string {
			return ""
		}
	}

	a2 := func() func(c context.Context, app *mw.AppData) string {
		return func(c context.Context, app *mw.AppData) string {
			return ""
		}
	}

	app.Use(a, a1())
	app.UseFunc(b.Analysis, a2())
	app.UseFunc(a.Analysis)

	app.Next()
```
