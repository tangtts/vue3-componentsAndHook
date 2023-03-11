<template>
  <div v-my-loading="isLoading" id="loading" class="loadingContainer">
    table
  </div>

  <el-button @click="isLoading = !isLoading">{{
    isLoading ? '关闭loading' : "开启loading"
  }}</el-button>
  <el-button @click="serverLoading">使用服务</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { vMyLoading, loading } from "./loading"

const isLoading = ref(false);
const isLoadingServer = ref(false);
// 使用服务
const serverLoading = () => {
  let instance = loading({
    visible: isLoadingServer.value,
    target: document.getElementById("loading")!,
  })
  setTimeout(() => {
    instance.close()
  }, 1000)
}
</script>
<style scoped lang="scss">
.loadingContainer {
  @apply relative h-[400px] bg-white mx-auto flex mb-4 items-center justify-center text-2xl text-black;
}
</style>