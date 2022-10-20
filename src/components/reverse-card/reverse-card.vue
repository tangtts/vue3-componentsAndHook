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