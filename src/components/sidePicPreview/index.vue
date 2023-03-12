<template>
  <div>
    <div>
      <img class="item" title="图片" v-for="(pic, index) in pics" :key="index" :ref="setBoxRef" :src="pic"
        @click="doClick(pic, index)" />
    </div>
  </div>

  <div class="mask" ref="mask" @click="closeModal">
  </div>
</template>
<script lang="ts" setup>
import { assetsElement } from "utils/index";
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
// 遮罩层
const mask = ref<HTMLElement | null>(null)
// assets 保证不是 null，要不ts一直有提示

// 记录初始值
const originalPosition = {
  left: 0,
  top: 0
}
const closeModal = () => {

  assetsElement(sideActiveImg.value)
  sideActiveImg.value.style.opacity = '1'
  assetsElement(mask.value)
  mask.value.style.visibility = "hidden";

  changeStyle(cloneNodeRef.value!, [
    `top: ${originalPosition.top}px`,
    `left: ${originalPosition.left}px`,
    `opacity:0`
  ]);
  setTimeout(() => {
    assetsElement(mask.value)
    mask.value.innerHTML = "";

  }, 500)
}
const cloneNodeRef = ref<HTMLElement | null>(null)


const doClick = async (pic: string, index: number) => {
  const currentPic = imgRefs.value[index];
  // 后续 图片要改变 opacity
  sideActiveImg.value = currentPic;
  mask.value!.style.visibility = "visible"
  // 克隆出一个元素，可以获得当前的元素的所有信息
  const cloneNode = currentPic.cloneNode(true) as HTMLElement;
  cloneNodeRef.value = cloneNode;
  cloneNode.classList.add("innerImg")
  mask.value?.appendChild(cloneNode);


  const { offsetWidth } = currentPic
  const { left, top } = currentPic.getBoundingClientRect();
  let scale = calcScale(currentPic);

  // 记录原始值
  originalPosition.left = left;
  originalPosition.top = top;
  // 当前图片 opacity 设置为 0
  currentPic.style.opacity = "0";

  const winCenterPoint = { x: wWidth / 2, y: wHeight / 2 }

  changeStyle(cloneNode, [
    `top: ${top}px`,
    `left: ${left}px`,
  ]);
  setTimeout(() => {
    changeStyle(cloneNode, [
      `width: ${offsetWidth * scale + 'px'}`,
      `left: ${winCenterPoint.x + 'px'}`,
      `top: ${80 + 'px'}`,
      `transform: translateX(${-scale * offsetWidth / 2}px)`
    ])
  }, 100)
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
  @apply py-2 cursor-pointer w-[100px] transition-all duration-1000;
}

.mask {
  @apply fixed top-0 left-0 w-screen h-screen invisible;
  // background-color: rgba(0, 0, 0, 0.5);
}

.innerImg {
  @apply absolute transition-all duration-1000;
}
</style>
 