<template>
  <div>
    <!-- 改变mask 的大小，颜色，传入的图片 -->
    <magnifiers
      img="https://img.alicdn.com/imgextra/i3/1917047079/O1CN01lkG2pf22AEUi1owve_!!1917047079.png_430x430q90.jpg"
      :size="size + 'px'" :bg-color="color" :scale="scale" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import magnifiers from "./magnifers.vue"
const size = ref(200)
const color = ref('#3e6fd1')
const scale = ref('110%')
</script>