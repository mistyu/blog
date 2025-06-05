---
slug: Vue2
title: Vue2 核心源码
date: 2023-07-08
authors: yiyue
tags: [Vue]
keywords: [Vue]
description: 复习下 Vue2 的原理
---

<!-- truncate -->
**响应式**
```js
function observe (value, asRootData) {
  // ...
  const ob = new Observer(value)
  // ...
  return ob
}

function def (obj, key, val, /* ...args */) {
  Object.defineProperty(obj, key, {
    value: val,
    // ...
  })
}

class Observer {
  // ...
  constructor (value) {
    // ...
    // 依赖，ob.dep
    this.dep = new Dep()
    // 将实例挂载到观察对象的 __ob__ 属性
    def(value, '__ob__', this)
    // 数据响应式处理
    if (Array.isArray(value)) {
      if (hasProto) {
        // 将会改变原数组的方法重写到 __proto__ 上
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 为数组中的每一个对象创建一个 observer
      this.observerArray(value)
    } else {
      // 遍历对象中的每一个属性转换成 setter/getter
      this.walk(value)
    }
  }
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  observerArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  // 为当前这个 key 收集依赖
  const dep = new Dep()
  // ...
  val = obj[key]
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val // 如果用户传入了 getter 就用用户传入的
      // 如果存在当前依赖目标，即 watcher，则建立依赖
      if (Dep.target) {
        dep.depend()
        // 如果子观察目标存在，也要建立依赖关系
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : obj[key]
      // 新值等于旧值或新值旧值为 NaN 则不执行
      if (newVal === value || (newVal !== newVal&& value !== value)) {
        return
      }
      // ...
      val = newVal
      // 如果新值是对象，继续做响应式处理
      childOb = !shallow && observe(newVal)
      // 派发更新
      dep.notify()
    }
  })
}

let uid = 0
class Dep {
  // watcher 对象，会在调用 $mount 挂载组件时 new Watcher 将 vm(当前组件) 赋值给 target
  static target
  id
  // dep 实例对应的 watcher 对象、订阅者数组
  subs

  constructor() {
    id = uid++
    this.subs = []
  }

  // 添加新的订阅者 watcher
  addSub (sub) {
    this.subs.push(sub)
  }
  // 移除订阅者
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 将观察对象和 watcher 建立依赖
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 派发更新
  notify () {
    const subs = this.subs.slice()
    // 排序为了保证 watcher 的执行顺序
    subs.sort((a, b) => a.id - b.id)
    // sub 就是每一个 watcher
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

class Watcher {
  // noop 用户 watcher
  constructor (vm, expOrFn /* updateComponet */, cb, options, isRenderWatcher) {
    this.vm = vm
    // 渲染 watcher
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // 所有的 watcher
    vm._watchers.push(this)

    // options.lazy 是否延迟执行, computed 是 true
    // options.dirty // 是否使用上次缓存的结果 computed

    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
  }
  // ...
  // 添加依赖
  addDep (dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push((dep))
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  // ...
  update () {
    if (this.lazy)  {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // 将 watcher 放入wathcer队列中
      queueWatcher(this)
    }
  }
  // 更新视图, computed, watch, 组件更新完毕之后会调用用 activated 和 updeted
  run() {
    // ...
    if (this.user) {
      try {
        this.cb.call(this.vm, value, oldValue)
      } catch (error) {
        
      }
    } else {
      this.cb.call(this.vm, value, oldValue)
    }
  } 
}

// 数组的响应式处理
function protoAugment(target, src) {
  target.__proto__ = src
}
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
// 修改原数组的方法，让这些方法可以进行响应式处理
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(method => {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 执行数组的原始方法
    const result = original.apply(this, args)
    // 获取数组对象的 ob 对象 
    // this 就是响应式数组
    const ob = this.__ob__

    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对插入的新元素设置为响应式数据
    if (inserted) ob.observeArray(inserted)
    // 派发更新
    ob.dep.notify()

    return result
  })
})

```

**nextTick**
```js
// 所有的更新都是通过 nextTick 方法

let isUsingMicroTask = false
let timerFunc
// 优先以 Promise 微任务的方式执行
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]') {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (type setImmediate !== 'undefined' && isNative(setImmediate)) {
  // setImmediate 只有 IE 和 Node 支持, 性能比 setTimeout 好
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    // setTimeout 至少会在 400ms 执行，即使这是成 0
    setTimeout(flushCallbacks, 0)
  }
}

let callbacks = []
let pending = false
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

function nextTick (cb, ctx) {
  let _resolve
  // 把 cb 加上异常处理存入 callbacks 数组中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (error) {
        handlerError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 队列是否在处理
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```

**set**
```js
function set (target, key, avl) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    // 已经是重写了 splice 之后的
    target.splice(key, 1, val)
    return val
  }
  // 如果 key 已经存在了
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 提取 target 中的 observer
  const ob = target.__ob__
  // 如果 target 是 Vue 实例或者 $data
  if (target._isVue || (ob && ob.vmCount)) {
    return val
  }
  // 如果 ob 不存在，则说明 target 不是响应式数据
  if (!ob) {
    target[key] = val
    return val
  }
  // 把 key 设置成响应式
  defineReactive(ob.value, key, val)
  // 发送通知
  ob.dep.notify()

  return nval
}
```

**delete**
```js
function delete (target, key) {
  if (Array.isArray(target)) {
    // 已经是重写了 splice 之后的
    target.splice(key, 1)
    return
  }
  const ob = target.__ob__
  // 如果 target 中不存在 key
  if (!hasOwn(target, key)) {
    return
  }
  // 删除属性
  delete target[key]
  if (!ob) {
    return
  }
  // 派发更新
  ob.dep.notify()
}

```

**use**
```js
// Vue.use
// 接收一个 plugin 必须是一个函数或者对象(有 install 方法)
Vue.use = function (plugin) {
  // 记录已安装的插件
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }
  // 把第个参数 plugin 去掉
  const args = toArray(arguments, 1)
  // 把 this 插入第一个参数
  args.unshift(this)

  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installedPlugins.push(plugin)

  return this
}
```