<template>
  <div class="container pointer" @click="handelSelect(node)" :style="{ paddingLeft: `${node.level * 16}px` }">
    <span @click.stop="handleExtend(node)" :class="[
      {
        expanded: isExpanded && !node.isLeaf,
      },
    ]" style="font-size: 12px">
      <LoadingIcon v-if="isLoading" />
      <TriangleIcon v-else />
    </span>
    <div :key="node.key" :class="{
      isSelected: isSelected,
      node: true
    }">
      <base-checkbox v-if="checkable" :indeterminate="indeterminate" :modelValue="checked"
        @update:modelValue="handleCheckChange">
        <TreeNodeContent :node="node" />
      </base-checkbox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import baseCheckbox from "../base/checkbox/index.vue"
import { onMounted, ref, computed, reactive, watch, PropType } from "vue";
import { TreeProps, TreeOption, TreeNode, Key } from "./types";
import TriangleIcon from "./icon.vue";
import LoadingIcon from "./loading.vue";
import TreeNodeContent from "./tree-node-content";
const props = defineProps({
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  isExpanded: {
    type: Boolean,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectKeys: {
    type: Object as PropType<Key[]>,
  },
  defaultCheckedKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  checkable: Boolean,
  cascade: Boolean,
  checked: Boolean,
  indeterminate: Boolean,
});

const handleCheckChange = val => {
  emits("check", props.node, val);
};

const isSelected = computed(() => {
  return props.selectKeys?.includes(props.node.key);
});

const emits = defineEmits({
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, val: String | Number | Boolean) => true,
});

const handelSelect = node => {
  emits("select", node);
};

const handleExtend = node => {
  emits("toggle", node);
};

const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key);
});
</script>

<style lang="scss" scoped>
$state-prefix: "is";

// @mixin when($state) {
//   @at-root {
//     .#{$state-prefix + $state} {
//       @content;
//     }
//   }
// }

// @include when(Selected) {
//   background-color: #b9b8d6;
// }



.container {
  @apply flex items-center text-lg cursor-pointer my-4;

  .isSelected {
    @apply bg-blue-200 rounded-md
  }

  .node {
    @apply px-6 py-1 font-bold
  }
}



.expanded {
  color: red;
  display: block;
  transform: rotate(90deg);
  transform-origin: left center;
}
</style>
