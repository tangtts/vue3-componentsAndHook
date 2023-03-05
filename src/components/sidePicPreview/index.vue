<template>
  <div style="height:800px;">
    <div>
      <img class="item" title="图片" v-for="(pic, index) in pics" :key="index" :ref="setBoxRef" :src="pic"
        @click="doClick(pic, index)" />
    </div>
  </div>


  <div class="mask" ref="mask" @click="closeModal">
    <img class="innerImg" :src="src" ref="maskPic">
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, CSSProperties, Transition, Ref, nextTick } from "vue";
const pics = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8Y2F0fGVufDB8fHx8MTY2MjAyNzg3Nw&ixlib=rb-1.2.1&q=80&w=500",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8Y2F0fGVufDB8fHx8MTY2MjAyNzg3Nw&ixlib=rb-1.2.1&q=80&w=500",
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y2F0fGVufDB8fHx8MTY2MjAyNzg3Nw&ixlib=rb-1.2.1&q=80&w=500",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500",
];
// 页面的宽度和高度
let wHeight = 0, wWidth = 0;
// 侧面的选中的图片
const sideActiveImg = ref<HTMLElement | null>(null)
// mask 里面的图片
const maskPic = ref<HTMLElement | null>(null)
// 遮罩层
const mask = ref<HTMLElement | null>(null)
const src = ref("");

const originalPosition = {
  left: 0,
  top: 0
}
const closeModal = () => {
  if (sideActiveImg.value) {
    sideActiveImg.value.style.opacity = '1'
  }

  mask.value!.style.visibility = "hidden"
  changeStyle(maskPic.value!, [
    `top: ${originalPosition.top}px`,
    `left: ${originalPosition.left}px`,
    `opacity:0`
  ]);
}



const doClick = async (pic: string, index: number) => {
  const currentPic = imgRefs.value[index];
  // 后续 图片要改变 opacity
  sideActiveImg.value = currentPic;

  const { offsetWidth } = currentPic
  const { left, top } = currentPic.getBoundingClientRect();
  console.log("🚀 ~ file: index.vue:59 ~ doClick ~ top:", top);
  let scale = calcScale(currentPic);
  mask.value!.style.visibility = "visible"

  originalPosition.left = left;
  originalPosition.top = top;

  currentPic.style.opacity = "0";
  src.value = pic;
  const winCenterPoint = { x: wWidth / 2, y: wHeight / 2 }


  // mask 里面的图片
  const maskinnerPic = maskPic.value!;

  changeStyle(maskinnerPic, [
    `top: ${top}px`,
    `left: ${left}px`,
  ]);
  maskinnerPic.style.opacity = "1"





  changeStyle(maskinnerPic, [
    `width: ${offsetWidth * scale + 'px'}`,
    `left: ${winCenterPoint.x + 'px'}`,
    `top: ${80 + 'px'}`,
    `transform: translateX(${-scale * offsetWidth / 2}px)`
  ])
}

function changeStyle(el: HTMLElement, cssArr: string[]) {
  const original = el.style.cssText.split(';');
  original.pop();
  el.style.cssText = original.concat(cssArr).join(';') + ';'
}

function calcScale(element: HTMLElement) {
  // 整个页面的宽度 / 元素的宽度
  let scale = wWidth / element.offsetWidth;

  // 看高度是否满足,不能太高
  if (scale * element.offsetHeight > (wHeight - 80)) {
    scale = (wHeight - 80) / element.offsetHeight;
  }
  return scale
}

// 获取所有图片的ref
const imgRefs = ref<HTMLElement[]>([])

const setBoxRef = (el: any) => {
  if (el) {
    imgRefs.value.push(el)
  }
}


onMounted(() => {
  wHeight = window.innerHeight;
  wWidth = window.innerWidth;
})


</script>
  
<style lang="scss" scoped>
.item {
  @apply py-2 cursor-pointer;
  width: 240px;
}

.mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  visibility: hidden;
}

.innerImg {
  position: absolute;
  transform: translateZ(0);
  transition: all 1.5s;
  opacity: 0;
}
</style>
 