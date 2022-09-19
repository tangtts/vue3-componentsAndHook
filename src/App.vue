<template>
  <div class="dark">
    <el-config-provider :locale="locale">



      <!-- <myComponent as="button" type="submit">点击</myComponent> -->
      <virtualList />

    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
// import myComponent from "./components/button/index"
import virtualList from "./components/virtual/index.vue"
import { defineComponent, onMounted, ref } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import axios from "axios";
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
