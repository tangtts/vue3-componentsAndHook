<template>
  <div>
    <Tree :data="data" v-model:selectKeys="model" selectable multiple :on-load="handleLoad">
      <template #default="{ node }">
        {{ node.label }} 123
      </template>
    </Tree>
  </div>
</template>
<script lang="ts" setup>
import Tree from "./tree.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
import { Key, TreeOption, TreeNode } from "./types";
defineOptions({
  name: 'myTree'
})


const model = ref<Key[]>(["40", "4030"])

// 懒加载
function handleLoad(node: TreeOption) {
  return new Promise<TreeOption[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          key: node.key + nextLabel(node.label),
          label: nextLabel(),
          children: [],
          isLeaf: false
        }
      ])
    }, 1000)
  })
}


const data = createData();

function createData(level = 4, baseKey = ''): TreeOption[] {
  if (!level) return []
  return Array.from({ length: level * 10 }, (_, index) => {
    const key = '' + baseKey + level + index
    const label = createLabel(level)
    return {
      label,
      key,
      children: createData(level - 1, key),
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

function nextLabel(currentLabel?: Key): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}






</script>

<style lang="scss" scoped></style>
