<template>
  <el-submenu
    v-if="menuList.children && menuList.children.length > 0"
    :key="menuList.path"
    :index="menuList.path"
  >
    <template #title>
      <span>{{ menuList.meta.title }}</span>
    </template>
    <el-menu-item-group>
      <menubar-item
        v-for="v in menuList.children"
        :key="v.path"
        :index="v.path"
        :menu-list="v"
      />
    </el-menu-item-group>
  </el-submenu>

  <el-menu-item v-else :index="menuList.path">
    <template #title>
      {{ menuList.meta.title }}
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MenubarItem",
  props: {
    menuList: {
      type: Object as any,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    console.log(props.menuList);

    return {};
  },
});
</script>
