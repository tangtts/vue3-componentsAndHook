<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    function _isMobile() {
      const rect = document.body.getBoundingClientRect();
      store.commit("checkedIsMobile", rect.width);
    }
    onMounted(() => {
      _isMobile();
      window.onresize = _isMobile;
    });
  },
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
