<template>
  <el-container>
    <div>
      <el-drawer
        :with-header="false"
        v-model="openDrawer"
        direction="ltr"
        size="auto"
      >
        <my-aside> </my-aside>
      </el-drawer>
    </div>
    <!-- <div v-else>
      <my-aside> </my-aside>
    </div> -->
    <el-container class="bg-white dark:bg-black">
      <el-header>
        <el-container>
          <div class="w-full">
            <div class="flex justify-between items-center">
              <div class="flex justify-between items-center">
                <span style="font-size: 25px" @click.prevent="clickCollapse">
                  <i class="el-icon-s-fold" v-show="!isCollapes"></i>
                  <i class="el-icon-s-unfold" v-show="isCollapes"></i>
                </span>
                <Breadcrumb />
              </div>
              <div>
                <el-dropdown>
                  <setting style="width: 1em; height: 1em; margin-right: 8px" />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <span>王小虎</span>
              </div>
            </div>
          </div>
        </el-container>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import myAside from "./common/Aside/index.vue";
import Breadcrumb from "./common/Breadcrumb/index.vue";
import { Setting, Edit } from "@element-plus/icons-vue";
let openDrawer = ref(false);
const clickCollapse = () => {};
</script>

<style scoped lang="scss">
.el-container {
  height: 100vh;
}
.el-header {
  color: #333;
  line-height: 60px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.el-main {
  background-color: #dfe6ec;
}
</style>
