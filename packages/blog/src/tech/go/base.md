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

## defer

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("c return:", *(c())) // 打印结果为 c return: 2
}

func c() *int {
	var i int
	defer func() {
		i++
		fmt.Println("c defer2:", i) // 打印结果为 c defer: 2
	}()

	defer func() {
		i++
		fmt.Println("c defer1:", i) // 打印结果为 c defer: 1
	}()
	fmt.Println("c exec :", i)
	return &i
}
```

Output:

```sh
c exec : 0
c defer1: 1
c defer2: 2
c return: 2
```

## channel

```
v, beforeClosed := <-ch
```

beforeClosed 代表 v 是否是信道关闭前发送的。true 代表是信道关闭前发送的，false 代表信道已经关闭。如果一个信道已经关闭，`<-ch` 将永远不会发生阻塞，但是我们可以通过第二个返回值 beforeClosed 得知信道已经关闭，作出相应的处理。

channel三种状态喝三种操作后果

| 操作     | 空值(nil) | 非空已关闭 | 非空未关闭       |
| :------- | :-------- | :--------- | :--------------- |
| 关闭     | panic     | panic      | 成功关闭         |
| 发送数据 | 永久阻塞  | panic      | 阻塞或成功发送   |
| 接收数据 | 永久阻塞  | 永不阻塞   | 阻塞或者成功接收 |

## 死码消除

死码消除(dead code elimination, DCE)是一种编译器优化技术，用处是在编译阶段去掉对程序运行结果没有任何影响的代码

死码消除有很多好处：减小程序体积，程序运行过程中避免执行无用的指令，缩短运行时间。

在声明全局变量时，如果能够确定为常量，尽量使用 const 而非 var，这样很多运算在编译器即可执行。死码消除后，既减小了二进制的体积，又可以提高运行时的效率，如果这部分代码是 `hot path`，那么对性能的提升会更加明显。

## 内存分配

go采用tcmalloc，官方文档地址：https://goog-perftools.sourceforge.net/doc/tcmalloc.html

特点

- 使用多级缓存针对对象的大小分类
- 按照类别实施不同的分配策略

即如果要分配的对象是个小对象（<= 32k），在每个线程中都会有一个无锁的小对象缓存，可以直接高效的无锁的方式进行分配

如果是个大对象（>32k），那么页堆进行分配

堆上所有的对象都会通过调用`runtime.newobject`函数分配内存，该函数会调用`runtime.mallocgc`

```go
func mallocgc(size uintptr, typ *_type, needzero bool) unsafe.Pointer {
...
  // maxSmallSize是32K
	if size <= maxSmallSize-mallocHeaderSize {
    // maxTinySize 是16bytes
		if noscan && size < maxTinySize {
      // 小于16bytes的微对象
    } else{
      // 在16bytes与32k之间的小对象
    }
  } else {
    // 大于 32 Kb的大对象
    ...
    	span = c.allocLarge(size, noscan)
    ...
  }
...
}
```

大于 32 Kb的大对象，调用`allocLarge`

```go
func (c *mcache) allocLarge(size uintptr, noscan bool) *mspan {
  // 溢出，_PageSize = 1 << _PageShift；_PageShift是8K
	if size+_PageSize < size {
		throw("out of memory")
	}
  // 高于8K的位信息表示有多少8K页，以及是否存在不足一页，存在就需要加1页
	npages := size >> _PageShift
  // _PageMask = _PageShift - 1
	if size&_PageMask != 0 {
		npages++
	}
  ...
}
```

### reference

https://www.luozhiyun.com/archives/434
