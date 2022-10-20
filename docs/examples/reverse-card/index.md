# 旋转卡片
可以旋转
> 主要原理  
> 头有点疼，没有原理
# 基础用法

<reverse-card/>
<script  setup>
  import reverseCard from "../../../src/components/reverse-card/index.vue" 
</script>


<details>

<summary>展开查看</summary>

```vue
  <template>
  <el-form>
    <el-form-item label="duration">
      <el-select v-model="duration">
        <el-option label="1s" value="1"/>
        <el-option label="fast" value="fast"/>
        <el-option label="slow" value="slow"/>
        <el-option label="normal" value="normal"/>
      </el-select>
    </el-form-item>

    <el-form-item label="size">
      <el-slider v-model="size" :min='100' :max='400' />
    </el-form-item>

    <el-form-item label="trigger">
      <el-radio-group v-model="trigger">
        <el-radio label="click" />
        <el-radio label="hover" />
      </el-radio-group>

    </el-form-item>
  </el-form>

  <reverse-card :width="size" :height="size" :trigger="trigger" :duration="duration">
    <template #front>
      <div>
        front
      </div>
    </template>
    <template #back>
      <div>
        back
      </div>
    </template>
  </reverse-card>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import reverseCard from "./reverse-card.vue"
import type { durationType, trigger as triggerType } from './reverse-card.vue'

const duration = ref<durationType>(1)
const size = ref(100)
const trigger = ref<triggerType>('click')
</script>

```
</details>
				
# 属性
|  属性名   | 说明  |  类型 |  可选值 | 默认值
|  :----:  | :----:  | :----:  | :----:  | :----:  | 
| size  |  卡片大小 | number | -- | 100 |
| duration  |  旋转速度 | fast/slow/normal/string | —— | 1s |
| trigger  |  触发条件 | click/hover | —— | click |

# Source

<details>

<summary>展开查看</summary>

```vue
<template>
  <div>
    <div class="box" @click="handleClick" @mouseenter.prevent="handleMouseenter" :style="computedStyles()"
      :class="isFont&&'flipped'">
      <div class="card front">
        <slot name="front">前面</slot>

      </div>
      <div class="card back">
        <slot name="back">反面</slot>

      </div>
    </div>
  </div>
</template>
 
<script lang="ts" setup>
import { CSSProperties, ref,watch } from 'vue';

export type durationType = 'fast' | 'slow' | 'noraml' | number;
export type trigger = 'click' | 'hover'
interface Props {
  height?: string | number
  width?: string | number,
  duration?: durationType,
  trigger?: trigger
}

/**
 * @description {Boolean} [是正面 = true] 是否是正面
 */
const isFont = ref(true)

let props = withDefaults(defineProps<Props>(), {
  width: '200px',
  height: '200px',
  duration: 1,
  trigger: "click"
})

// 排除 number 类型
const defaultOption: Record<Exclude<durationType, number>, string> = {
  'fast': '.5s',
  'noraml': '1s',
  'slow': '2s',
}

const handleClick = () => {
  isFont.value = !isFont.value
}

const handleMouseenter = () => {
  // 在触发 click 之前会触发 mouseenter
  if (props.trigger == 'hover') {
    isFont.value = !isFont.value
  }
}
/**
 * @param {durationType} duration
 * @description 格式化传进来的 duration
 * @return {string}
 */
const formatPropsDuration = (duration: durationType): string => {
  if (typeof duration == 'number') {
    return duration + 's'
  }
  return defaultOption[duration]
}

/**
 * @param {number|string} - 宽度或者高度
 * @description 格式化传进来的 width/height
 * @return {string}
 */
const formatPropsSize = (size: number | string): string => {
  if (typeof size == 'number') {
    return size + 'px'
  }
  return size
}
/**
 * @return 计算 css 属性
 */
const computedStyles:()=>CSSProperties = ()=>{
  let styles = {
    'transition-duration': formatPropsDuration(props.duration),
    width: formatPropsSize(props.width),
    height: formatPropsSize(props.height),
  };
  return styles
}

watch(props, () => {
  computedStyles()
})

</script>
 
<style lang="scss" scoped>
.box {
  margin: 50px auto;
  width: 239px;
  height: 334px;
  transform-style: preserve-3d;
  transition-property: transform;
  cursor: pointer;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; //后面的藏起来, 不然会有小叠加..
  border-radius: 20px;
  padding: 20px;
  font-size: 22px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.front {
  background-color: #002ea6;
}

.back {
  transform: rotateY(180deg);
  background-color: #fcc630;
}

.flipped {
  transform: rotateY(180deg);
}
</style>
```


</details>