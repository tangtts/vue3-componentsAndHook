<template>
  <div>
    <!--  variable 高度不定-->
    <VirtualList :items="items" :remain="remain" :size="size" :variable="true">
      <template v-slot="{ item }">
        <UserItem :item="item" />
      </template>
    </VirtualList>
  </div>
</template>

<script lang="ts" setup >
import { ref } from 'vue';
import UserItem from "./userItem.vue"
import VirtualList from "./VirtualList.vue"


export interface Item {
  id: number,
  value: number
}

const items: Item[] = []

for (let i = 0; i < 100; i++) {
  items.push({ id: i, value: Math.floor(Math.random() * i) + i })
}

// 可见个数
const remain = ref(8)
//单个 高度
const size = ref(40)

</script>
