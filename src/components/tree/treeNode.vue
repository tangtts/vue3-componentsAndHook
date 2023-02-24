<template>
  <div class="container" :style="{ paddingLeft: `${node.level * 16}px` }">

    <span @click="handleExtend(node)" 
    :class="[{ 'expanded': isExpanded && !node.isLeaf }, 'icon']"
    style="font-size: 12px;"
    >
    <Icon />
  </span>
    <span>{{ node.label }} </span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, PropType } from "vue";
import { TreeProps, TreeOptions, TreeNode } from "./types";
import Icon from "./icon"
defineProps({
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  isExpanded: {
    type: Boolean
  },
})

const emits = defineEmits({
  toggle: (node: TreeNode) => node
})
const handleExtend = (node) => {
  emits("toggle", node)
}
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  font-size: 20px;
  line-height: 40px;
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
}

.expanded {
  color: red;
  display: inline-block;
  transform: rotate(90deg);
  transform-origin:left center;
}
</style>
