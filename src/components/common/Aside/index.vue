<template>
  <div style="height: 100vh" class="el-menu-vertical-demo">
    <el-menu
      class="h-full overflow-hidden"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#f4f4f5"
      scroll
      router
      active-text-color="#409eff"
    >
      <el-header class="header">
        <div class="text-center text-white">
          <span class="font-sm">{{ NAME }}</span>
        </div>
      </el-header>
      <!-- 如果是多种的话是 el-sub-menu el-menu-item -->
      <!-- 单个的是 el-menu-item-->
      <div v-for="(item, key) in routes" :key="item.path">
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
          :key="item.path"
        >
          <template #title>
            <div class="flex">
              <Location />
              <span class="ml-2">{{ item.meta?.title }}</span>
            </div>
          </template>
          <div>
            <el-menu-item
              :index="child.path"
              v-for="child of item.children"
              :key="child.path"
            >
              <i :class="['iconfont', child.meta?.icon]"></i>
              {{ child.meta?.title || "" }}
            </el-menu-item>
          </div>
        </el-submenu>

        <el-menu-item :index="item.path" v-else :key="item.meta.title">
          {{ item.path }}
          <template #title>
            <div class="flex">
              <Menu /> <span class="ml-2">{{ item.meta.title }}</span>
            </div>
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { State } from "../../../store/index";
import { useStore } from "vuex";
import { routes } from "../../../router";
import { defineComponent, computed, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Menu,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const NAME = import.meta.env.VITE_ADMIN_NAME;

const store = useStore<State>();
const isCollapse = computed(() => {
  return store.state.isCollapse;
});
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
