---
title: "go语言基础"
date: 2023-11-15 14:26:00 +8
category: go
tag:
  - interface
  - base
---

是否实现某个接口

```go
type User interface {
	Writer()
	Read()
}

type Student struct {
}
// 使用声明方式
var _ User = &Student{}
// 类型转换方式
var _ User = (*Student)(nil)
```

## 反射

```go
// 参数可以是struct，也可以是ptr
// type 是Type类型
type = reflect.TypeOf(param)
value = reflect.ValueOf(param)
// value Type() 可以得到上面TypeOf的type
type = value.Type()

// type,value都可以Kind(),而且相等，kind 从0-26
kind = type.Kind()==value.Kind()

// reflect.TypeOf((*<interface>)(nil)).Elem()获得接口类型。因为People是个接口不能创建实例，所以把nil强制转为*common.People类型（common.People是定义的一个interface）
typeOfPeople := reflect.TypeOf((*common.People)(nil)).Elem()

// 正常
structType.NumField()
// ！！！ panic,指针type无法获取，需要先转化成structType，通过Elem()
ptrType.NumField()
// 正常
ptrType.Elem().NumField()

// 获取index的field
field = structType.Field(index)

// 只包含值的方法
structType.NumMethod()
// 值的方法+指针的方法
ptrType.NumMethod()

// 相互转化
// 一般使用value的Elem()
// value 指针转值
structValue = ptrValue.Elem()
// value 值转指针, ptrValue.Elem().Addr() 是可以的
ptrValue = structValue.Addr()
// ！！！panic，直接refluct.ValueOf()获取的structValue调用Addr()会panic，可以通过CanAddr()判断
ptrValue = refluct.ValueOf(user{}).Addr()

// value Interface(),一般转化成目标结构
user = userValue.Interface().(common.User)

// new TypeOf struct type
// TypeOf 参数不能是指针
value = reflect.New(reflect.TypeOf(common.User{}))

// demo
buser := common.User{Age: 22, Nick: "bb"}
*value.Interface().(*common.User) = buser
```

demo，可运行

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

type Myi interface {
	ParamEmpty() int
	NoEmpty(int) int
	ReturnEmpty(int)
}

type MyimWarp struct {
	myim Myim
}

type Myim struct {
	Age int
}

func (m *Myim) ParamEmpty() int {
	return m.Age
}
func (m *Myim) NoEmpty(i int) int {
	m.Age += +i
	return m.Age
}
func (m *Myim) ReturnEmpty(i int) {
	m.Age += +i
}
func main() {
	one := Myim{Age: 18}
	deal(one)
	fmt.Println("end", one)
}

func deal(im interface{}) {
	//todo call
	// type
	vv := reflect.ValueOf(im)
	switch vv.Kind() {
	case reflect.Pointer:
		v := vv
		fmt.Println("ptr")
		myiOne, ok := v.Interface().(*Myim)
		if !ok {
			fmt.Println("assert fail")
			return
		}
		// 反射调用和下面正常调用无区别
		_ = v.MethodByName("ReturnEmpty").Call([]reflect.Value{reflect.ValueOf(4)})
		ret := v.MethodByName("ParamEmpty").Call([]reflect.Value{})
		ret0, ok := ret[0].Interface().(int)
		fmt.Println(ret0, ok)

		fmt.Printf("%#+v \n", myiOne)
		myiOne.ReturnEmpty(4)
		fmt.Println(myiOne.ParamEmpty())

	case reflect.Struct:
		// 先转成指针

		// 方式1
		// new的方式，重新构造一个struct
		// imm := im.(Myim)
		// v := reflect.New(reflect.TypeOf((*Myim)(nil)).Elem())
		// *v.Interface().(*Myim) = imm

		// 方式2
		// 和上面一样的思路，vv是 struc value
		// new vv.Type，再Elem()设置vv
		//v := reflect.New(vv.Type())
		//v.Elem().Set(vv)

		// 方式3
		// 通过im interface 接参数后，&im 并不能获取地址
		// var imm interface{} = &Myim{Age: 18}
		// v := reflect.ValueOf(imm)

		// 方式4
		// 指针转化
		newPtr := (*Myim)(unsafe.Pointer(&im))
		v := reflect.ValueOf(newPtr)

		// 错误方式，用imm interface 接非指针，&imm 并不是 &Myim{}
		//var imm interface{} = Myim{Age: 18}
		//v := reflect.ValueOf(&imm)
		// 或者 one := Myim{Age: 18}
		// vvv := interface{}(one)
		//v := reflect.ValueOf(&im)

		myiOne, ok := v.Interface().(Myi)
		if !ok {
			fmt.Println("assert fail...")
			return
		}
		fmt.Println("assert ok...")
		return
		// 反射调用和下面正常调用无区别
		_ = v.MethodByName("ReturnEmpty").Call([]reflect.Value{reflect.ValueOf(4)})
		ret := v.MethodByName("ParamEmpty").Call([]reflect.Value{})
		ret0, ok := ret[0].Interface().(int)
		fmt.Println(ret0, ok)

		fmt.Printf("%#+v \n", myiOne)
		myiOne.ReturnEmpty(4)
		fmt.Println(myiOne.ParamEmpty())

	default:
		fmt.Println("default")
	}

}

```
