<template>
  <div class="dark">
    <el-config-provider :locale="locale">
      <!-- <myUpload /> -->
      <myTree />
      <!-- <myComponent as="button" type="submit">点击</myComponent> -->
      <!-- <virtualList /> -->
      <!-- <BaGua animationSpeed='1s' size="100"/> -->
      <!-- <div v-bagua-loading="{size:100,animationSpeed:'1s'}">
        1232131
      </div> -->

      <!-- <preview-img img="../docs/public/logo.png" v-model="show" /> -->
      <!-- <el-button @click="show =!show" type="primary"> 打开 </el-button> -->
      <!-- <magnifiers/> -->
      <!-- <infinite-scroll/> -->

      <!-- <reverseCard /> -->
      <!-- <my-upload/> -->
      <!-- <clickOutside /> -->
      <!-- <Loading/> -->

      <!-- <Loading /> -->
      <JinCai/>
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
// import myComponent from "./components/button/index"
// import virtualList from "./components/virtual/index.vue"
// import BaGua from './components/baGua/index.vue'
// import BaGua from './components/baGua/BaGua.vue'
import InfiniteScroll from './components/InfiniteScroll/index.vue'
// import previewImg from "./components/previewImage/index.vue"
import magnifiers from "./components/magnifiers/index.vue"
import reverseCard from "./components/reverse-card/index.vue"
import Loading from "./components/loading/index.vue"
import clickOutside from "./components/clickOutside/index.vue"
import JinCai from "./components/jianCaiUpload/index.vue"
import { createApp, defineComponent, onMounted, h, ref, createVNode, render } from "vue";
import { ObjectDirective, FunctionDirective } from "vue"
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import axios from "axios";
const locale = ref(zhCn);
const show = ref(false)



// const instance = loadingInstance.mount(document.createElement('div'))



// const vBaguaLoading = {
//   mounted: (el, bindings, vnode) => {
//     const loadingInstance = createVNode(BaGua)
//     let containter = document.createElement('div')
//     render(loadingInstance, containter)
//     // el 是当前绑定的元素
//     // instance 是引入的虚拟 dom，只有 $el
//     // 需要把 el.appendChild(instance.$el)
//     if (bindings.value) {
//       let f = loadingInstance.component?.props
//       f!.size = bindings.value.size
//       f!.animationSpeed = bindings.value.animationSpeed
//       //  instance.$props = bindings.value
//     }

//     // el.appendChild(instance.$el)
//     el.appendChild(containter)
//   },
// }


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
