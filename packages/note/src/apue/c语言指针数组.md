# c 语言指针数组

```c
int a = 3;
int *p;//此时p已经有内存地址
*p = a;//这个操作是指针p指向的值 进行更新

int a = 3;
int *p = &a; //此时指针p的值为a的内存地址

int c[3];
int c1[3];
...
c本身是个指针，但是不可重新修改地址，而且c会自动转化为值，所以gdb p c打印出的是值，而 p &c打印出地址
int *p = c;//此操作就是地址赋值，但是 int *p = &c (报错：从不兼容的指针类型初始化，当然只是warning)，数组c进行指针赋值，那么c就不能当成值来处理，和gdb 将c作值处理不一样的；

int c[3];
int *p;
数组本质是指针常量，可以修改值，但是不可重新修改地址，在低地址段
p++
c++就是错的

p = c
c = c1 错的

```

```c
#include <stdio.h>

int main(int argc, char const *argv[])
{
    char a[] = "hello";
    char a1[] = "hello";
    char *b;
    //a = a1; 这是不可以的，数组是指针常量，也就是指针和数组的区别，数据段低地址不可更改，栈段高地址可以更改
    b = a;

    printf("a %p\n", a);
    printf("a %s\n", a);
    printf("b %p\n", b);
    printf("b %s\n", b);

    printf("a[1] %s\n", &a[1]);
    printf("a[1] %c\n", a[1]);
    printf("*a[1] %p\n", &a[1]);

    printf("b[1] %s\n", &b[1]);
    printf("b[1] %c\n", b[1]);
    printf("*b[1] %p\n", &b[1]);

    printf("------------\n");



    // int c[]={1,2};
    // int *d = &c;

    return 0;
}
```
