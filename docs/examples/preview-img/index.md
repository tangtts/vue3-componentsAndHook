# 预览图
无聊的时候写的一个。
> 点击左/右可以无限旋转，再点击一次可以停止
# 基础用法

<preview-img img="https://vuepress.vuejs.org/hero.png" v-model="show" />
<el-button @click="show =!show" type="primary"> 打开 </el-button>

<script setup>
  import {ref} from "vue"
  import previewImg from "../../../src/components/previewImage/index.vue"
  const show = ref(false)
</script>

<details>

<summary>展开查看</summary>

```vue
<template>
  <preview-img img="https://vuepress.vuejs.org/hero.png" v-model="show" />
  <el-button @click="show =!show" type="primary"> 打开 </el-button>
</template>
<script setup>
  import {ref} from "vue"
  import previewImg from "../../../src/components/previewImage/index.vue"
  const show = ref(false)
  </script>
```

</details>


				
# 属性

|  属性名   | 说明  |  类型 |  可选值 | 默认值
|  :----:  | :----:  | :----:  | :----:  | :----:  | 
| img  | 传入的图片 | string | --  | --- | 
| v-model / modelValue | 打开关闭 | boolean | --  | false | 

# Source

<details>

<summary>展开查看</summary>

```vue

<template>
    <div class="mask" v-if="modelValue">
     <span style="color:white;font-weight:bold"> scale:{{scale}} -- angle:{{angle}}</span>
      <el-button @click="close" type="danger" class="close-btn"> 关闭</el-button>
      <div class="imgContainer">
        <el-image :src="props.img" fit="contain" :style="imgContainerStyle" />
      </div>
      <div class="operateContainer">
        <el-button type="primary" @click="scaleHandle('up')">放大</el-button>
        <el-button type="primary" @click="scaleHandle('down')">缩小</el-button>
        <el-button type="primary" @click="rotateHandle('left')">向左旋转45°/暂停</el-button>
        <el-button type="primary" @click="rotateHandle('right')">向右旋转45°/暂停</el-button>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { CSSProperties, ref, computed } from 'vue'
const props = defineProps({
  img: {
    type: String,
    required: true
  },
  modelValue:{
    type:Boolean,
    default:false
  }
})
type scaleType = 'up' | 'down'
type rotateType = 'left' | 'right'

const scale = ref(1)
const angle = ref(0)


const defaultScale = 0.1;
const defaultRotate = 15;


const imgContainerStyle = computed<CSSProperties>(() => {
  return {
    'transform': `scale(${scale.value}) rotate(${angle.value}deg)`,
    width:"100%",
    height:"100%"
  }
})


window.addEventListener('wheel', (e:WheelEvent) => {
  
  if (e.wheelDelta > 0) {
    scale.value += defaultScale
  } else {
    scale.value -= defaultScale
  }
})



const scaleHandle = (str: scaleType) => {
  if (str == 'up') {
    scale.value += defaultScale
  } else {
    scale.value -= defaultScale
  }
}

let rotateReq:null | number = null 

const rotateFn = (str: rotateType) => {
  if (str == 'left') {
    angle.value += defaultRotate
  } else {
    angle.value -= defaultRotate
  }
  rotateReq = window.requestAnimationFrame(() => rotateFn(str))
}


const rotateHandle = (str: rotateType) => {
  if (rotateReq) {
    window.cancelAnimationFrame(rotateReq);
    rotateReq = null
  } else {
    rotateReq = window.requestAnimationFrame(() => rotateFn(str))
  }
}

const emit = defineEmits<{
  (e:'update:modelValue',payload:Boolean):void
}>()

const close = ()=>{
  emit('update:modelValue',false)
}

</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 20%;
  right: 20%;
  background-color: rgba($color: #000000, $alpha: 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  border-radius:10px;
  .close-btn{
    position: fixed;
  top: 25%;
  width: 100px;
  right: 25%;
  z-index:10
  }

  .imgContainer {
    flex: 1;
    overflow: hidden
  }

}
</style>

```


</details>






