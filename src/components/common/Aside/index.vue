
<template>
  <div style="height: 100vh">
    <el-aside :width="componentWidth" style="background: #304156;height:100vh">
      <el-menu
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#f4f4f5"
        overflow-y
        scroll
        active-text-color="#409eff"
      >
        <el-header class="header">
          <div class="text-truncate text-center text-white">
            <span style="fontsize: 14px">后台管理系统</span>
          </div>
        </el-header>
        <div v-for="(item, key) in routes" :key="item.path">
          <el-submenu :index="key + ''">
            <template #title>

              <i :class="['iconfont',item.meta?.icon]"></i>

              <span :class="[{ 'd-none': isCollapse },'ms-2']">
                {{ item.name || "" }}</span
              >
            </template>
            <el-menu-item-group
              v-for="(child, childKey) in hasChildren(item)"
              :key="childKey"
            >
              <el-menu-item :index="child.path">
                {{ child.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { routes } from "../../../router";
export default {
  computed: {
    routes() {
      return routes || [];
    },
    hasChildren() {
      return function (item) {
        return item.children || [];
      };
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    componentWidth(){
      if(this.isCollapse){
        return "fit-content"
      }else {
        return "200px"
      }
    }
  },
};
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
}
::v-deep(.el-menu) {
  border: none;
}
::v-deep(.el-menu-item) {
  background-color: #1f2d3d !important;
}
::v-deep(.el-menu-item-group__title){
  padding: 0 !important;
}
</style>
