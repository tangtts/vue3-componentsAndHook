#  loading 图
一个简单的 loading 图。
> 仿照了 `element-plus`中的 `loading` 图 
> 有很多属性没有用上，比如`background-color`,`text`,`svg`等
> 主要原理
 1. 使用`createApp`生成实例(loadingInstance),第一个参数为`vnode`,第二个参数为`props`
 2. 实例(loadingInstance)调用`mount`,传入`div`元素，生成 `vm`
 3.  销毁时:` vm.$el?.parentNode?.removeChild(vm.$el); loadingInstance.unmount()`;
# 基础用法

<loading></loading>

<script setup>
  import loading from "../../../src/components/loading/index.vue" 
</script>

<details>

<summary>展开查看</summary>

```vue

<template>

  <div v-my-loading="isLoading" id="loading" style="width:100px;height:100px;background:red;position: relative;"></div>

  <el-button @click="isLoading = !isLoading">切换</el-button>
  <el-button @click="serverLoading">使用服务</el-button>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import  {vMyLoading,loading} from "./loading"

const isLoading = ref(false);
const isLoading2 = ref(false);
// 使用服务
const serverLoading = () => {
  let instance = loading({
    visible: isLoading2.value,
    target: document.getElementById("loading")!,
  })
  setTimeout(() => {
    instance.close()
  }, 1000)
}
</script>

```
</details>

# 指令用法
 


<details>

<summary>指令代码展开查看</summary>

```vue
  <template>
  <div v-my-loading="isLoading" id="loading" style="width:100px;height:100px;background:red;position: relative;"></div>
</template>

<script lang="ts" setup>
import  {vMyLoading} from "./loading"

const  isLoading  = ref(true);
</script>
```

</details>

<details>

<summary>服务代码展开查看</summary>

```vue
  <template>
   <el-button @click="serverLoading">使用服务</el-button>
</template>

<script lang="ts" setup>
import  {loading} from "./loading"

const serverLoading = () => {
  let instance = loading({
    visible: isLoading2.value,
    target: document.getElementById("loading")!,
  })
  setTimeout(() => {
    instance.close()
  }, 1000)
}
</script>
```

</details>

				
# 属性
|  属性名   | 说明  |  类型 |  可选值 | 默认值
|  :----:  | :----:  | :----:  | :----:  | :----:  | 
| v-my-loading  | 是否显示动画 | boolean | --  | false | 

# Source

<details>

<summary>展开查看</summary>

```ts
import { createApp, DirectiveBinding, ObjectDirective, ref } from "vue";
import maskComponent from "./loadingPage.vue";


export type LoadingOptionsResolved = {
  visible: boolean
  target: HTMLElement
  closed?: () => void
  /**
   *
   * @type {string} 后面加上
   */
  background?:string
  text?:string | undefined
}

export type LoadingOptions = Omit<LoadingOptionsResolved, 'closed'> 

export type LoadingBinding = boolean

type LoadingInstance = ReturnType<typeof createLoadingComponent>
const INSTANCE_KEY = Symbol('ElLoading')



interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
  }
}

function createLoadingComponent(options: LoadingOptionsResolved) {

  let afterLeaveTimer: number;
  const visible = ref(true);

  // 生成实例，同时传参
  const loadingInstance = createApp(maskComponent, {
    visible: visible.value,
    handleAfterLeave: close
  });

  const vm = loadingInstance.mount(document.createElement('div'));

  // 销毁实例
  function destroySelf() {
    vm.$el?.parentNode?.removeChild(vm.$el);
    loadingInstance.unmount()
  }

  function close() {
    clearTimeout(afterLeaveTimer)
    afterLeaveTimer = window.setTimeout(destroySelf, 400)
    options.closed?.()
  }

  return {
    visible,
    close,
    vm,
    get $el(): HTMLElement {
      return vm.$el
    },
  }
}

export function loading(options: LoadingOptions): LoadingInstance {
  const instance = createLoadingComponent({
    ...options,
    closed: () => { 
      options.close()
    },
  });
  options.target.appendChild(instance.$el);

  return instance
}


function createInstance(el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) {
  const options: LoadingOptions = {
    visible: binding.value,
    target: el
  }
  el[INSTANCE_KEY] = {
    instance: loading(options),
  }
}


export const vMyLoading: ObjectDirective<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    // 如果有值，并且是 false 
    if (binding.value) {
      createInstance(el, binding)
    } else {
      instance?.instance.close()
    }
  }
}
```
</details>






