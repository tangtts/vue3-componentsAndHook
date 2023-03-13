<template>
  <div class="dark">
    <!-- <datePickerPage></datePickerPage> -->
    <!-- <flip /> -->
    <!-- <filp /> -->
    <!-- <sidePicPreview />
       -->

    <base-list v-model="itemsRef">
      <template #default="{ item }">
        {{ item }}
      </template>
    </base-list>
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
  </div>
</template>
<script lang="ts" setup>
// import BaGua from './components/baGua/BaGua.vue'
import Loading from "./components/loading/index.vue"
import clickOutside from "./components/clickOutside/index.vue"
import { createApp, defineComponent, onMounted, h, ref, createVNode, render, reactive } from "vue";
import { emojis } from "components/flip/mock";
import Mock from "mockjs";
const aa = ref(0);
const options = ref([
  { label: "xx", value: 0 },
  { label: "xx2", value: 1 },
  { label: "xx3", value: 1 },
])
let id = 0;
function createMock() {
  id = (++id) % emojis.length;
  return {
    ...Mock.mock({
      name: "@name",
      id: "@increment(0)"
    }),
    emoji: emojis[id]
  }
}
// 初始化数据
const itemsRef = ref([createMock()])
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
