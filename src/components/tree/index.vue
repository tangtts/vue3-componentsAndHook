<template>
  <div class="container">
    <p class="msg">选中的item: <span class="data">{{ model }}</span></p>
    <p class="msg">选中的checkbox:<span class="data"> {{ defaultCheckedKeys }}</span></p>
    <Tree :data="data" v-model:selectKeys="model" selectable multiple checkable :default-checked-keys="defaultCheckedKeys"
      :on-load="handleLoad" @update:checked-keys="updateCheckedKeys">
      <!--虚拟加载 :on-load="handleLoad" -->
      <template #default="{ node }">
        {{ node.label }}
      </template>
    </Tree>
  </div>
</template>
<script lang="ts" setup>
import Tree from "./tree.vue";
import { onMounted, ref, computed, reactive, watch } from "vue";
import { Key, TreeOption, TreeNode } from "./types";
const defaultCheckedKeys = ref<Key[]>(["40"]);
const updateCheckedKeys = (node, val) => {
  defaultCheckedKeys.value = val;
};
const model = ref<Key[]>(["40"]);

// 懒加载
function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + nextLabel(node.label) + Math.random(),
          label: nextLabel(),
          children: [],
          isLeaf: false,
        },
      ]);
    }, 1000);
  });
}

const data = createData();

function createData(level = 4, baseKey = ""): TreeOption[] {
  if (!level) return [];
  return Array.from({ length: level }, (_, index) => {
    const key = "" + baseKey + level + index;
    const label = createLabel(level);
    return {
      label,
      key,
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level: number): string {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物";
  return "";
}

function nextLabel(currentLabel?: Key): string {
  if (!currentLabel) return "虚拟道生一";
  if (currentLabel === "道生一") return "一生二";
  if (currentLabel === "一生二") return "二生三";
  if (currentLabel === "二生三") {
    return "三生万物";
  }
  if (currentLabel === "三生万物") {
    return "Out of Tao, One is born";
  }
  return "";
}
</script>

<style lang="scss" scoped>
.container {
  @apply m-2 border border-solid border-blue-500 rounded-md p-4 bg-blue-50;

  .msg {
    @apply font-bold text-blue-500 mr-2;

    .data {
      @apply text-green-400
    }
  }
}
</style>
