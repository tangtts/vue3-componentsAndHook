<template>
  <div class="dark">
    <el-config-provider :locale="locale">
      <el-button type="primary">点击</el-button>
    </el-config-provider>
  </div>
</template>
<script lang="ts" setup>
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
