<template>
  <div>
    <Tree :data="data" :label-field="'label'" 
    :key-field="'key'" 
    :defaultExpandKeys="['40', '41']" />
  </div>
</template>
<script lang="ts" setup>
import Tree from "./tree.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
import { TreeOptions } from "./types";
defineOptions({
  name: 'myTree'
})
// 找到 data 中的 为 字符串的 key 值 的联合类型

const data: TreeOptions[] = [
  {
    label: "zs", key: '40', children: [
      {
        label: "zs1", key: '41', children: [
          {
            label:'zs3',
            key:'410',
            children:[]
          }
        ]
      },
      {
        label: "zs2", key: '42', children: [
        {
            label:'zs3',
            key:'420',
            children:[]
          }
        ]
      },
    ]
  }, {
    label: 'lisi', key: '50', children: [{
      label: 'wangwu',
      key: "51",
      children: []
    }]
  }
]






</script>

<style lang="scss" scoped></style>
