# 理解JavaScript中的执行上下文和执行栈

## 什么是执行上下文
简而言之，执行上下文就是JavaScript代码被解析和执行所在环境的抽象概念，JavaScript中运行任何的代码都是在执行上下文中运行的。

## 执行上下文的类型
执行上下文总共有3种类型：
- 全局执行上下文： 只有一个，全局执行上下文主要做了两件事情：1. 创建了一个全局对象，浏览器环境中就是window 2. 将this指向这个对象
- 函数执行上下文：每次函数调用的时候，都会创建一个新的执行上下文
- eval执行上下文：运行eval函数中的代码会获取自己的执行上下文


## 执行栈
执行栈，在其他语言中被叫做调用栈，具有LIFO(后进先出)的结构，用于存储在代码执行期间创建的所有执行上下文。  

当JavaScript引擎首次读取你的脚本时，它会创建一个全局执行上下文并将其推入当前的执行栈，每当调用一个函数时，引擎都会为该函数创建一个新的执行上下文并将其推到栈顶。

引擎会运行执行上下文栈顶的函数，当此函数运行完成后，其对应的执行上下文会中栈中弹出，上下文的控制权转交给下一个执行上下文。

让我们通过一段事例来理解一下：

```js
let a = 'Hello World!';

function first() {  
  console.log('Inside first function');  
  second();  
  console.log('Again inside first function');  
}

function second() {  
  console.log('Inside second function');  
}

first();  
console.log('Inside Global Execution Context');

```
<img :src="$withBase('/imgs/context1.jpeg')" alt="context">

## 执行上下文是如何被创建的
执行上下文分为两个阶段创建：1). 创建阶段 ;  2). 执行阶段   

在任意的 JavaScript 代码被执行前，执行上下文处于创建阶段。在创建阶段中总共发生了三件事情：  

1. 确定 this 的值，也被称为 This Binding。
2. LexicalEnvironment（词法环境） 组件被创建。
3. VariableEnvironment（变量环境） 组件被创建。

因此，执行上下文可以在概念上表示如下：
```js
ExecutionContext = {  
  ThisBinding = <this value>,  
  LexicalEnvironment = { ... },  
  VariableEnvironment = { ... },  
}
```
### This Binding:
1. 在全局执行上下文中，this 的值指向全局对象，在浏览器中，this 的值指向 window 对象。
2. 在函数执行上下文中，this 的值取决于函数的调用方式。如果它被一个对象引用调用，那么 this 的值被设置为该对象，否则 this 的值被设置为全局对象或 undefined（严格模式下）。

### 词法环境（Lexical Environment）
词法环境有两个组成部分
1. 环境记录是存储变量和函数声明的实际位置。
2. 对外部环境的引用意味着它可以访问其外部词法环境。

词法环境有两种类型:
- 全局环境（在全局执行上下文中）是一个没有外部环境的词法环境。全局环境的外部环境引用为 null。它拥有一个全局对象（window 对象）及其关联的方法和属性（例如数组方法）以及任何用户自定义的全局变量，this 的值指向这个全局对象。
- 函数环境，用户在函数中定义的变量被存储在环境记录中。对外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境。函数环境还包含了一个 arguments 对象，该对象包含了索引和传递给函数的参数之间的映射以及传递给函数的参数的长度（数量）
```js
GlobalExectionContext = {  
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里 
    outer: <null>  
  }  
}

FunctionExectionContext = {  
  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里 
    outer: <Global or outer function environment reference>  
  }  
}
```

### 变量环境
它也是一个词法环境，其 EnvironmentRecord 包含了由  VariableStatements 在此执行上下文创建的绑定。
如上所述，变量环境也是一个词法环境，因此它具有上面定义的词法环境的所有属性。
在 ES6 中，LexicalEnvironment 组件和 VariableEnvironment 组件的区别在于前者用于存储函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）绑定。
```js
let a = 20;  
const b = 30;  
var c;

function multiply(e, f) {  
 var g = 20;  
 return e * f * g;  
}

c = multiply(20, 30);
```
执行上下文如下：
```js
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      a: < uninitialized >,  
      b: < uninitialized >,  
      multiply: < func >  
    }  
    outer: <null>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Object",  
      // 标识符绑定在这里  
      c: undefined,  
    }  
    outer: <null>  
  }  
}

FunctionExectionContext = {  
   
  ThisBinding: <Global Object>,

  LexicalEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      Arguments: {0: 20, 1: 30, length: 2},  
    },  
    outer: <GlobalLexicalEnvironment>  
  },

  VariableEnvironment: {  
    EnvironmentRecord: {  
      Type: "Declarative",  
      // 标识符绑定在这里  
      g: undefined  
    },  
    outer: <GlobalLexicalEnvironment>  
  }  
}

变量提升的原因：在编译阶段，函数声明存储在环境中，而变量会被设置为 undefined（在 var 的情况下）或保持未初始化（在 let 和 const 的情况下）。所以这就是为什么可以在声明之前访问 var 定义的变量（尽管是 undefined ），但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。
```

## 总结
- JavaScript执行上下文： 全局执行上下文、函数执行上下文、eval执行上下文
- JavaScript的执行机制是： 先编译，在执行

## 参考
<a href="https://juejin.cn/post/6844903704466833421">理解Javascript执行上下文和执行栈</a>








