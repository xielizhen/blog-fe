# JavaScript代码是按顺序执行的吗？

JS是单线程的语言，执行顺序肯定是顺序执行，但是JS 引擎并不是一行一行地分析和执行程序，而是一段一段地分析执行，会先进行编译阶段然后才是执行阶段，这个段如何定义呢？

接下来咱们先看段代码：

```js
showName() // 函数showName被执行
console.log(myname) // undefined
var myname = '极客时间'
function showName() {
    console.log('函数showName被执行');
}
```

```js
showName()
console.log(myname) // uncaught reference error
function showName() {
    console.log('函数showName被执行');
}
```
结论如下：
1. 在执行过程中，若使用了未声明的变量，那么 JavaScript 执行会报错。
2. 在一个变量定义之前使用它，不会出错，但是该变量的值会为 undefined，而不是定义时的值。
3. 在一个函数定义之前使用它，不会出错，且函数能正确执行。

<b>疑问：</b>  
1. 变量和函数为什么能在其定义之前使用？这似乎表明 JavaScript 代码并不是一行一行执行的。
2. 同样的方式，变量和函数的处理结果为什么不一样？比如上面的执行结果，提前使用的 showName 函数能打印出来完整结果，但是提前使用的 myname 变量值却是 undefined，而不是定义时使用的“极客时间”这个值。

## 变量提升
不过在介绍变量提升之前，我们先通过下面这段代码，来看看什么是 JavaScript 中的声明和赋值。
### 变量的声明和赋值
```js
var myname = '极客时间'
```
这段代码可以看成是两行代码组成的
```js
var myname    //声明部分
myname = '极客时间'  //赋值部分
```
### 函数的声明和赋值
```js
function foo(){
  console.log('foo')
}
var bar = function(){
  console.log('bar')
}
```
所谓的变量提升，是指在 JavaScript 代码执行过程中，JavaScript 引擎把变量的声明部分和函数的声明部分提升到代码开头的“行为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的 undefined。

下面来模拟实现第一段代码
```js

/*
* 变量提升部分
*/
// 把变量 myname提升到开头，
// 同时给myname赋值为undefined
var myname = undefined
// 把函数showName提升到开头
function showName() {
    console.log('showName被调用');
}
/*
* 可执行代码部分
*/
showName()
console.log(myname)
// 去掉var声明部分，保留赋值语句
myname = '极客时间'
```
<img :src="$withBase('/imgs/context2.webp')" alt="context">


## 执行流程
从概念的字面意义上来看，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，正如我们所模拟的那样。但，这并不准确。实际上变量和函数声明在代码里的位置是不会改变的，而且是在编译阶段被 JavaScript 引擎放入内存中。对，你没听错，一段 JavaScript 代码在执行之前需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。大致流程你可以参考下图：
<img :src="$withBase('/imgs/context3.webp')" alt="context">

### 编译阶段
编译阶段和变量提升的关系：
<img :src="$withBase('/imgs/context4.webp')" alt="context">
输入一段代码，经过编译后，会生成两部分内容：执行上下文（Execution context）和可执行代码。    
<b>执行上下文</b>：是JavaScript 执行一段代码时的运行环境, 如上节所言  
<b>可执行代码</b>：JavaScript 引擎会把声明以外的代码编译为字节码，此部分就是可执行代码  

### 执行阶段
JavaScript 引擎开始执行“可执行代码”，按照顺序一行一行地执行


## 执行上下文栈
接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？

为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：
```js
ECStack = [];
```
试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：
```js
ECStack = [
    globalContext
];
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？  
第一段代码的执行上下文：
```js
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```
第二段代码的执行上下文
```js
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

## 参考
<a href="https://github.com/mqyqingfeng/Blog/issues/4">JavaScript深入之执行上下文栈</a>  
<a href="https://time.geekbang.org/column/article/119046">变量提升：JavaScript代码是按顺序执行的吗？</a>






