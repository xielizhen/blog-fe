本文仅是让自己学习一下如何实现数组原型上方法的简单实现：

### forEach
入参： fn, thisArg， 出参： 无返回值
```js
Array.prototype.myForEach = function (cb, thisArg) {
  const len = this.length
  for (let i = 0; i < len; i ++) {
    cb.call(thisArg, this[i], i, this)
  }
}
```

### map
入参： fn, thisArg, 出参： 返回新数组
```js
Array.prototype.myMap = function (cb, thisArg) {
  const len = this.length
  const arr = []
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    arr.push(res)
  }
  return arr
}
```

### filter
入参： fn, thisArg, 出参： 返回新数组
```js
Array.prototype.myFilter = function (cb, thisArg) {
  const len = this.length
  const arr = []
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    if (res) return arr.push(res)
  }
  return arr
}
```

### some
入参：fn, thisArg, 出参：boolean
```js
Array.prototype.mySome = function (cb, thisArg) {
  const len = this.length
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    if (res) return true
  }
  return false
}
```

### every
入参：fn, thisArg, 出参：boolean
```js
Array.prototype.myEvery = function (cb, thisArg) {
  const len = this.length
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    if (!res) return false
  }
  return true
}
```

### find
入参：fn, thisArg, 出参：item
```js
Array.prototype.myEvery = function (cb, thisArg) {
  const len = this.length
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    if (res) return item
  }
  return undefined
}
```

### findIndex
入参：fn, thisArg, 出参： index
```js
Array.prototype.myFindIndex = function (cb, thisArg) {
  const len = this.length
  for (let i = 0; i < len; i ++) {
    const res = cb.call(thisArg, this[i], i, this)
    if (res) return i
  }
  return -1
}
```

### includes
arr.includes(valueToFind[, fromIndex]), 返回值： boolean
```js
Array.prototype.myIncludes = function (cb, thisArgs) {
  const len = this
}
```

### pop
返回删除的元素，并且数组长度减1
```js
Array.prototype.myPop = function () {
  const remove = this[this.length - 1]
  this.length --
  return remove
}
```

### unshift







