<template>

  <div v-my-loading="isLoading" id="loading" style="width:100px;height:100px;background:red;position: relative;"></div>

  <el-button @click="isLoading = !isLoading">切换</el-button>
  <el-button @click="serverLoading">使用服务</el-button>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import  {vMyLoading,loading} from "./loading"

const isLoading = ref(false);
const isLoading2 = ref(false);
// 使用服务
const serverLoading = () => {
  let instance = loading({
    visible: isLoading2.value,
    target: document.getElementById("loading")!,
  })
  setTimeout(() => {
    instance.close()
  }, 1000)
}
</script>