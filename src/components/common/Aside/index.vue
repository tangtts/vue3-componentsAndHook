
<template>
  <div style="height: 100vh">
    <el-aside style="background: #304156; height: 100vh" width="auto">
      <el-menu
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#f4f4f5"
        overflow-y
        scroll
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <el-header class="header">
          <div class="text-center text-white">
            <span style="fontsize: 14px">后台管理系统</span>
          </div>
        </el-header>

        <div v-for="(item, key) in router" :key="item.path">
          <el-submenu :index="key + ''">
            <template #title>
              <i :class="['iconfont', item.meta?.icon]"></i>

              <span :class="[{ 'd-none': isCollapse }, 'ms-2']">
                {{ item.meta?.title || "" }}</span
              >
            </template>
            <el-menu-item-group
              v-for="(child, childKey) in hasChildren(item)"
              :key="childKey"
            >
              <el-menu-item :index="child.path">
                {{ child.meta?.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { State } from "../../../store/index";
import { useStore } from "vuex";
import { routes, routeItem } from "../../../router";
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  setup() {
    const store = useStore<State>();
 
    const isCollapse = computed(() => {
      return store.state.isCollapse;
    });
    const hasChildren = computed(() => {
      return function (item: routeItem) {
        return item.children || [];
      };
    });

    const router = computed<routeItem[]>(() => {
      return routes.filter((item) => !item.meta.isNotSideBar);
    });



    return {
      isCollapse,
      hasChildren,
      router,
     
    };
  },
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
::v-deep(.el-menu) {
  border: none;
}
::v-deep(.el-menu-item) {
  background-color: #1f2d3d !important;
}
::v-deep(.el-menu-item-group__title) {
  padding: 0 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
