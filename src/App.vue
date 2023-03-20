<template>
  <div class="dark">
    <!-- <datePickerPage></datePickerPage> -->
    <!-- <flip /> -->
    <filp />
    <!-- <sidePicPreview />
       -->


    <!-- <myUpload /> -->
    <!-- <myTree /> -->
    <!-- <virtualList /> -->
    <!-- <BaGua animationSpeed='1s' size="100"/> -->

    <!-- <preview-img img="../docs/public/logo.png" v-model="show" /> -->
    <!-- <el-button @click="show =!show" type="primary"> 打开 </el-button> -->
    <!-- <magnifiers/> -->
    <!-- <infinite-scroll/> -->

    <!-- <reverseCard /> -->
    <!-- <my-upload/> -->
    <!-- <clickOutside /> -->
    <!-- <Loading/> -->

    <!-- <Loading /> -->
    <!-- <JinCai/> -->
    <acd />
  </div>
</template>
<script lang="ts" setup>
import acd from "./components/useFetch/index.vue"
// import BaGua from './components/baGua/BaGua.vue'
import Loading from "./components/loading/index.vue"
import clickOutside from "./components/clickOutside/index.vue"
import { createApp, defineComponent, onMounted, h, ref, createVNode, render, reactive, Ref, shallowRef, toRaw, watch, isRef, ComputedRef } from "vue";

</script>

<style lang="scss">
html,
body,
#app {
  height: 100vh;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
