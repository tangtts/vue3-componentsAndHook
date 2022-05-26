<template>
  <div style="height: 100vh" class="el-menu-vertical-demo">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>

        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "../../../router/index";
import { defineComponent, computed, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Menu,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const NAME = import.meta.env.VITE_ADMIN_NAME;
const getAllRouters = router.getRoutes();
</script>

<style scoped lang="scss">
.header {
  position: relative;
  width: 100%;
  height: 50px !important;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  vertical-align: middle;
  overflow: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
svg {
  width: 1rem;
}
</style>
