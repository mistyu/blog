---
slug: Vue3
title: 手写 Vue3 源码
date: 2023-08-26
authors: yiyue
tags: [Server, Ubuntu, Centos]
keywords: [Server, Ubuntu, Centos]
description: 记录每次搭建环境的步骤，以后直接看这个就可以啦～
---

<!-- truncate -->
## 手写 Vue3 源码
根据自己写项目时，查看文档以及看《Vue3 设计与实现》的理解，自己实现 Vue3 Api

**utils**
一些 Vue3 内置的工具
```js
const isObject = val => val !== null && typeof val === 'object'
const convert = target => isObject(target) ? reactive(target) : target
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)
```

**reactive**
```js
function reactive (target) {
  if (!isObject(target)) return target
    
  const handler = {
    get (target, key, receiver) {
      // 收集依赖
      track(track, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set (target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger()
      }
      return result
    },
    deleteProperty (target, key) {
      const hasKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hasKey && result) {
        // 触发更新
        trigger()
      }

      return result
    }
  }

  return new Proxy(target, handler)
}
```

**收集依赖的数据结构**
  1. targetMap：`new WeakMap()`
  key: 目标对象
  value: 2.

  2. depsMap：`new Map()`
  key: 对象的每一个属性
  value: 3. 

  3. dep：`new Set()` (set可以去重，这样就不会收集重复依赖) 
  value: effect函数

**effect**
```js
let activeEffect = null
function effect (callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，去收集依赖
  activeEffect = null
}
```
**track**
```js
let targetMap = new WeakMap()

export function track (target, key) {
  if (!activeEffect) return

  let depsMap = target.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}
```

**trigger**
```js
function trigger (target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}
```

**ref**
```js
function ref (raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) return
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value () {
      track(r, 'value')
      return value
    },
    set value (newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }

  return r
}
```

**toRefs**
如果自己结构响应式数据的话是会丢失响应式的，所以需要这个 api，`toRefs` 对每个属性又做了一层 Ref 然后在返回解构
```js
function toRefs (proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toRroxyRef(proxy, key)
  }

  return ret
}

function toRroxyRef (proxy, key) {
  const r = {
    __v_isRef: true,
    get value () {
      return proxy[key]
    },
    set value (newValue) {
      proxy[key] = newValue
    }
  }

  return r
}
```

**computed**
```js
function computed (getter) {
  const result = ref()

  effect(() => (result.value = getter()))

  return result
}
```

**Vuex**

1. Vuex 是如何拦截不在 moutation 中更改 state
初始化一个 `commiting = false`，同下
```js
...
console.assert(store._commiting, '错误修改 state')
...
```

2. Vuex 是如何拦截异步修改
在 mutation 之前修改 `commiting = true`，调用 mutation 会更改状态，监控当前状态变化，如果状态变化的时候 `commiting = true`则是同步更改，如果状态变化的时候 `commiting = false`则是异步更改
```js
watch(() => store._state.data, () => {
  console.assert(store._commiting, '错误修改 state')
} /* 监控 store 中数据变化，变化后就会执行回调函数 */, {
  deep: true,
  flush: 'sycn' // 同步监听
})
```
