## commonJs规范

### 出现原因
JavaScript为了弥补在服务器端缺少模块化机制，引入commonJS规范

### 特点
1. 运行时加载，整个模块全部加载，模块可以多次加载，但是只会在第一个加载的时候运行一次，然后运行结果会被缓存，以后在加载，就直接读取缓存结果，要想让模块再次运行，必须清除缓存(require.cache)。要让模块多次执行代码，则导出函数
2. 模块加载会阻塞接下来代码的执行，需要等模块加载完成才能继续执行-- 同步加载

### 应用
nodejs模块、webpack

### 语法
1. require函数，用于导入函数
2. module.exports变量，用于导出模块，exports是对module.exports的引用，相当于var exports = module.exports
<font color="red" size="2">浏览器并不支持commonJS, 需要使用browserify来编译</font>

### nodejs中commonjs模块的实现
#### require干了啥？
1. 如果是核心模块，比如fs、http, 就直接返回模块
2. 如果是带路径的如/或者./等等，则拼接出一个绝对路径，然后先读取require.cache再读取文件，如果没有加后缀，指自动加后缀--识别  
  .js解析为javascript文件  
  .json解析为json对象  
  .node解析为二进制插件模块  
3. 首次加载后的模块会缓存在require.cache之中，多次加载require, 得到的对象是同一个
4. 在执行模块代码的时候，会将模块包装成如下模式，以便于作用域在模块范围之内
```js
(function(exports, require, module, __filename, __dirname) {
  // 模块的代码实际上在这里
});
```

```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这里。 在本例中，定义一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是 module.exports 的快捷方式，
    // 并且此模块仍然会导出空的默认对象。
    module.exports = someFunc;
    // 此时，该模块现在将导出 someFunc，
    // 而不是默认对象。
  })(module, module.exports);
  return module.exports;
}
```

#### module干了啥？
1. require之后解析路径，然后触发Module的类，新建一个module对象，然后将这个新对象放入Module缓存之中
2. 新建的module对象开始解析导入的模块内容
3. extensions 读取文件，然后准备编译
4. compile编译js

### demo
```js
let count = 0
function addCount () {
  count ++
}
module.exports = {
  count,
  addCount
}
```

参考文章列表
1. <https://juejin.cn/post/6844903685466619911>
2. <http://nodejs.cn/api/modules.html#modules_all_together>


## AMD规范
AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。其中 RequireJS 是最佳实践者。  

模块功能主要的几个命令：define、require、return和define.amd。define是全局函数，用来定义模块,define(id?, dependencies?, factory)。require命令用于输入其他模块提供的功能，return命令用于规范模块的对外接口，define.amd属性是一个对象，此属性的存在来表明函数遵循AMD规范。

```js
define(id?: String, dependencies?: String[], factory: Function|Object);
require(['a'], function(a){
  console.log(a);
});
```

## CMD规范
CMD(Common Module Definition - 通用模块定义)规范主要是Sea.js推广中形成的，一个文件就是一个模块，可以像Node.js一般书写模块代码。主要在浏览器中运行，当然也可以在Node.js中运行。

它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。


## UMD规范
UMD(Universal Module Definition - 通用模块定义)模式，该模式主要用来解决CommonJS模式和AMD模式代码不能通用的问题，并同时还支持老式的全局变量规范。
```js
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.myBundle = factory());
}(this, (function () { 'use strict';
  var main = () => {
      return 'hello world';
  };
  return main;
})));
```


## ES Module
ES6 Module是ES6中规定的模块体系，相比上面提到的规范， ES6 Module有更多的优势，有望成为浏览器和服务器通用的模块解决方案。

### ES6 Module的特点(对比CommonJS)  

1. CommonJS模块是运行时加载，ES6 Module是编译时输出接口；  
2. CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
3. CommonJS输出是值的拷贝，ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变；
4. CommonJS this指向当前模块，ES6 Module this指向undefined;

目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的export/import，会被打包为exports/require。




