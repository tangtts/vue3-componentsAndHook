<template>
  <div class="dark">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import axios from "axios";
const locale = ref(zhCn);

onMounted(() => {
  axios.get("/src/assets/json/dynamicRoutes.json5").then((res) => {
    console.log(res);
  });
  // fetch("./assets/json/dynamicRoutes", {
  //   method: "GET",
  //   mode: "cors", // 允许发送跨域请求
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log(res);
  //   });
});
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
