<template>
  <div class="dark">
    <el-config-provider :locale="locale">
      <!-- <datePickerPage></datePickerPage> -->
      <!-- <flip /> -->
      <filp />
      <!-- <sidePicPreview /> -->
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
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
// import BaGua from './components/baGua/BaGua.vue'
import Loading from "./components/loading/index.vue"
import clickOutside from "./components/clickOutside/index.vue"
import { createApp, defineComponent, onMounted, h, ref, createVNode, render } from "vue";
import { ObjectDirective, FunctionDirective } from "vue"
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = ref(zhCn);

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
