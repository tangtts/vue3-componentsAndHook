# 放大镜
可以对一张图片进行放大
> 主要原理
> 移动小图片的小mask，算出移动距离到大图片上
# 基础用法


<magnifiers/>

<script  setup>
  import magnifiers from "../../../src/components/magnifiers/index.vue" 
  import { ref } from "vue";
const size = ref(200)
const color = ref('#3e6fd1')
const scale = ref('110%')
</script>


<details>

<summary>展开查看</summary>

```vue
  <template>
  <div>
    <!-- 改变mask 的大小，颜色，传入的图片 -->
    <el-form>

      <el-form-item label="size">
        <el-slider v-model="size" :min='100' :max='400' />
      </el-form-item>

      <el-form-item label="color">
        <el-color-picker v-model="color"></el-color-picker>
      </el-form-item>

      <el-form-item label="scale">
        <el-select v-model="scale">
          <el-option label="1.1" value="110%"></el-option> 
          <el-option label="1.2" value="120%"> </el-option>
          <el-option label="1.3" value="130%"> </el-option>
        </el-select>
      </el-form-item>

    </el-form>

    <magnifiers 
    img="https://img.alicdn.com/imgextra/i3/1917047079/O1CN01lkG2pf22AEUi1owve_!!1917047079.png_430x430q90.jpg"
     :size="size+'px'" 
     :bg-color="color" 
     :scale="scale" />

  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import magnifiers from "./magnifers.vue"
const size = ref(200)
const color = ref('#3e6fd1')
const scale = ref('110%')
</script>

```
</details>
				
# 属性
|  属性名   | 说明  |  类型 |  可选值 | 默认值
|  :----:  | :----:  | :----:  | :----:  | :----:  | 
| bgColor  | mask背景颜色 | string | --  | #3e6fd1 | 
| size  |  mask大小 | number | -- | 200 |
| img  |  传入的图片 | string | —— | —— |

# Source

<details>

<summary>展开查看</summary>

```vue
<template>
  <div class="container" @mouseover="boxShow=true" @mouseout="boxShow=false" @mousemove="onMouseMove" ref="boothRef">
    <img :src="props.img" />

    <div class="mask" ref="maskRef" v-show="boxShow" />

    <div class="big-img_box" ref="bigImgBoxRef" v-show="boxShow">
        <img 
        class="big-img" ref="bigImgRef"
        :src="props.img" />
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

const booth = boothRef as Ref<HTMLElement>
const mask = maskRef as Ref<HTMLElement>
const bigImgBox = bigImgBoxRef as Ref<HTMLElement>
const bigImg = bigImgRef as Ref<HTMLElement>

const onMouseMove = (e: MouseEvent) => {

  let x = e.pageX - booth.value.offsetLeft;
  let y = e.pageY - booth.value.offsetTop;

  // 如果不减去 1/2，鼠标在左上方
  let maskRefX = x - mask.value.offsetWidth / 2;
  let maskRefY = y - mask.value.offsetHeight / 2;

  // maskRef的x最大移动距离,只需要看 mask 的最右边 移动了多少距离
  let maskRefXMaxMove = booth.value.offsetWidth - mask.value.offsetWidth;
  let maskRefYMaxMove = booth.value.offsetHeight - mask.value.offsetHeight;

  // 大图最大移动距离
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
  size:{
    type:String,
    default:'200'
  },
  bgColor:{
    type:String,
    defatult:"#3e6fd1"
  },
  scale:{
    type:String,
    default:"120%"
  },
  img:{
    type:String,
    required:true
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
  background-color:v-bind("props.bgColor") ;
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

```


</details>