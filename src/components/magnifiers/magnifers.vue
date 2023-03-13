<template>
  <div class="container" @mouseover="boxShow = true" @mouseout="boxShow = false" @mousemove="onMouseMove" ref="boothRef">

    <img :src="props.img" />
    <!-- 遮罩层 -->
    <div class="mask" ref="maskRef" v-show="boxShow" />
    <!-- 大图片 -->
    <div class="big-img_box" ref="bigImgBoxRef" v-show="boxShow">
      <img class="big-img" ref="bigImgRef" :src="props.img" />
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";

const boothRef = ref<HTMLElement | null>(null);

const maskRef = ref<HTMLElement | null>(null);

const bigImgRef = ref<HTMLElement | null>(null);
const bigImgBoxRef = ref<HTMLElement | null>(null);
const boxShow = ref(false);
// 最外层可以mouse 的盒子
const booth = boothRef as Ref<HTMLElement>
const mask = maskRef as Ref<HTMLElement>
const bigImgBox = bigImgBoxRef as Ref<HTMLElement>
const bigImg = bigImgRef as Ref<HTMLElement>

const onMouseMove = (e: MouseEvent) => {

  //NOTE: 在 vue.express 上这个不生效，在真实页面上生效
  // let x = e.pageX - booth.value.offsetLeft;
  // let y = e.pageY - booth.value.offsetTop;
  // let maskRefX = x - mask.value.offsetWidth / 2;
  // let maskRefY = y - mask.value.offsetHeight / 2;

  let x = e.clientX - booth.value.getBoundingClientRect().left;
  let y = e.clientY - booth.value.getBoundingClientRect().top;
  // 如果不减去 1/2，鼠标在左上方
  let maskRefX = x - mask.value.offsetWidth / 2;
  let maskRefY = y - mask.value.offsetHeight / 2;

  // maskRef的x最大移动距离,只需要看 mask 的最右边 移动了多少距离
  let maskRefXMaxMove = booth.value.offsetWidth - mask.value.offsetWidth;
  let maskRefYMaxMove = booth.value.offsetHeight - mask.value.offsetHeight;

  let bigImgXMaxMove =
    bigImgBox.value.offsetWidth - bigImg.value.offsetWidth;

  let bigImgYMaxMove =
    bigImgBox.value.offsetHeight - bigImg.value.offsetHeight;


  if (maskRefX <= 0) {
    maskRefX = 0;
  } else if (maskRefX >= maskRefXMaxMove) {
    maskRefX = maskRefXMaxMove;
  }

  if (maskRefY <= 0) {
    maskRefY = 0;
  } else if (maskRefY >= maskRefYMaxMove) {
    maskRefY = maskRefYMaxMove;
  }

  mask.value.style.left = maskRefX + "px";
  mask.value.style.top = maskRefY + "px";



  // 大图片移动距离 = maskRef的移动距离*大盒子最大移动距离 / maskRef的x最大移动距离
  // 小图片的移动距离/ maskRef的x最大移动距离 = 大盒子的移动距离 / 大盒子的x最大移动距离
  let bixImgXMove = (maskRefX * bigImgXMaxMove) / maskRefXMaxMove;
  let bixImgYMove = (maskRefY * bigImgYMaxMove) / maskRefYMaxMove;


  bigImg.value.style.left = bixImgXMove + "px";
  bigImg.value.style.top = bixImgYMove + "px";
};
const props = defineProps({
  size: {
    type: String,
    default: '200'
  },
  bgColor: {
    type: String,
    defatult: "#3e6fd1"
  },
  scale: {
    type: String,
    default: "120%"
  },
  img: {
    type: String,
    required: true
  }
})

</script>
<style scoped>
.container {
  width: 430px;
  height: 430px;
  position: relative;
  border: 1px solid #cccccc;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind("props.size");
  height: v-bind("props.size");
  background-color: v-bind("props.bgColor");
  opacity: 0.5;
  cursor: move;
}

.big-img_box {
  position: absolute;
  top: 0;
  left: 530px;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #cccccc;
  overflow: hidden;
}

.big-img {
  position: absolute;
  left: 0;
  top: 0;
  max-width: inherit;
  width: v-bind("props.scale");
}
</style>
