
<template>
  <el-container>
    <div v-if="isMobile">
      <el-drawer
        :with-header="false"
        v-model="openDrawer"
        direction="ltr"
        size="auto"
      >
        <my-aside> </my-aside>
      </el-drawer>
    </div>
    <div v-else>
<my-aside> </my-aside>
    </div>
    <el-container>
      <el-header>
        <el-container>
          <div style="font-size: 12px" class="text-right w-100">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex justify-content-between align-items-center">
                <span style="font-size: 25px" @click.prevent="clickCollapse">
                  <i
                    class="el-icon-s-fold"
                    style="fontsize: inherit"
                    v-show="!isCollapes"
                  ></i>
                  <i
                    class="el-icon-s-unfold"
                    v-show="isCollapes"
                    style="fontsize: inherit"
                  ></i>
                </span>
                <Breadcrumb />
              </div>

              <div>
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 15px"></i>
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
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myAside from "./common/Aside/index.vue";
import Breadcrumb from "./common/Breadcrumb/index.vue";
export default {
  components: {
    myAside,
    Breadcrumb,
  },
  data() {
    return {
      openDrawer: false,
    };
  },
  created() {
    this.openDrawer = this.isMobile
  },
  computed: {
    isMobile(){
      return this.$store.state.isMobile
    },
    isCollapes() {
      return this.$store.state.isCollapse;
    },
  },
  methods: {
    clickCollapse() {
      if(this.isMobile){
       this.openDrawer = true;
      this.$store.commit("setCollapseOpen");
      }else {
      this.$store.commit("toggleCollapse");

      }
    },
  },
};
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
