# 八卦 loading 图
一个简单的 loading 图。
> 八卦 loading 图 主要用了 绝对定位，左上角 和 右下角 的小圆都是绝对定位 
# 基础用法

<baGua></baGua>

<script setup>
  import baGua from "../../../src/components/baGua/index.vue" 

  
</script>

<details>

<summary>展开查看</summary>

```vue

<template>
  <div>
    <el-form>
      <el-form-item label="元素尺寸">
        <el-slider v-model="size" :min='100' :max='400' />
      </el-form-item>
      <el-form-item label="转动速度">
        <el-select v-model="animationSpeed">
          <el-option label="1s" value="1s" />
          <el-option label="10s" value="10s" />
          <el-option label="20s" value="20s" />
        </el-select>
      </el-form-item>
    </el-form>

    <BaGua :animationSpeed='animationSpeed' :size="size" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaGua from "./baGua.vue"
const size = ref(100)
const animationSpeed = ref<`${string}s`>('1s')
</script>

```
</details>

# 指令用法
 


<details>

<summary>指令代码展开查看</summary>

```vue
  <template>
  <div v-bagua-loading="{size:100,animationSpeed:'1s'}">
          abcd
    </div> 
</template>

<script lang="ts" setup>

const loadingInstance = createApp(BaGua)
const instance = loadingInstance.mount(document.createElement('div'))

const vBaguaLoading: ObjectDirective = {
  mounted: (el, bindings,vnode) => {
    // el 是当前绑定的元素
    // instance 是引入的虚拟 dom，只有 $el
    // 需要把 el.appendChild(instance.$el)
   
    if (bindings.value) {
       instance.$props = bindings.value
    }

    el.appendChild(instance.$el)
  },
}
</script>
```

</details>



				
# 属性
|  属性名   | 说明  |  类型 |  可选值 | 默认值
|  :----:  | :----:  | :----:  | :----:  | :----:  | 
| animationSpeed  | 转动速度 | string | --  | 10s | 
| size  |  尺寸大小 | number | -- | 400 |

# Source

<details>

<summary>展开查看</summary>

```vue

<template>
  <div id="wrapper">
    <div id="baGuaContainer" :style="baGuaContainerStyle">
      <div class="left"></div>
      <div class="right"></div>
      <div class="left-top"></div>
      <div class="right-bottom"></div>
      <div class="inner-white-ball"></div>
      <div class="inner-black-ball"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { computed, toRaw } from '@vue/reactivity';
import { CSSProperties, PropType, StyleValue } from 'vue';

const props = defineProps({
  size: {
    type: [Number, String],
    default: 400
  },
  animationSpeed: {
    type: String as PropType<`${string}s`>,
    default: '10s'
  }
})
const addUnit = (str: string | number, unit = 'px') => {
  if (Number.isNaN(str)) {
    return str
  }
  return str + unit
}

const baGuaContainerStyle = computed<CSSProperties>(() => {

  return {
    width: addUnit(props.size),
    height: addUnit(props.size),
    "animation-duration": props.animationSpeed
  }
}) as CSSProperties
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #eeeeee;
}


#baGuaContainer {
  border-radius: 200px;
  position: relative;
  overflow: hidden;
  animation: x 10s linear infinite;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);

  .left,
  .right {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0;
    background-color: black;
  }

  .right {
    right: 0;
    left: 100%;
    background-color: white;
  }

  .left-top,
  .right-bottom {
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25%;
    border-radius: 50%;
    background-color: black;
  }

  .right-bottom {
    top: 50%;
    background-color: white;
  }

  .inner-white-ball,
  .inner-black-ball {
    width: 20%;
    height: 20%;
    position: absolute;
    left: 50%;
    top: 15%;
    margin-left: -10%;
    border-radius: 50%;
    background-color: white;
  }

  .inner-black-ball {
    top: auto;
    left: 60%;
    bottom: 15%;
    background-color: black;
  }
}

@keyframes x {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>


```


</details>






