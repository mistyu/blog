---
slug: Vue2-to-Vue3
title: Vue2-to-Vue3
date: 2023-10-28
authors: yiyue
tags: [Vue]
keywords: [Vue]
description: 持续更新从 Vue2 过渡到 Vue3 的心得
---

 Vue3
<!-- truncate -->
## 工具
### Volar
vscode 插件，需要把Vue2插件关闭再使用

### chrome设置

### setup 语法糖
解决组件 name 的问题
1. 在写一个 `script`
```vue
<script lang="ts">
export default { name: 'CrForm' }
</script>
```

2. unplugin-vue-define-options
```ts
// npm install unplugin-vue-define-options -D

// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
     plugins: [vue(), DefineOptions()],
});
```
```vue
// xxx.vue
<template>
  <CrForm></CrForm>
</template>
 
<script lang="ts" setup>
defineOptions({
  name: 'CrForm',
  inheritAttrs: false,
})
</script>
 
<style scoped></style>
```

## API
### defineExpose
传统的写法，我们可以在父组件中，通过 ref 实例的方式去访问子组件的内容，但在 script setup 中，该方法就不能用了，setup 相当于是一个闭包，除了内部的 template模板，谁都不能访问内部的数据和方法。

如果需要对外暴露 setup 中的数据和方法，需要使用 defineExpose API
```ts
const submit = () => {}

defineExpose({
  submit
})
```

### globalProperties
将变量挂载在原型上 全局使用
```ts
app.config.globalProperties.xxx = xxx
// 在插件中可以通过传入的 app 参数获取 app.config.globalProperties.xxx
```
在组件中使用
```vue
<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
instance.appContext.config.globalProperties.xxx
</script>
```


## ref 与 shadowRef
* shadowRef 是浅响应
* ref 会通过 reactive 遍历每一层的属性做响应式处理

## readonly
只读，不可修改，但可以成为响应式数据（就很奇怪？）

##

## v-model
可以参考 [v-model 原理 demo](https://github.com/mistyu/vue3-project/src/views/VModelPage.vue)
