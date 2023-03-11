<template>
  <!--
    固定高度 
    <div style="height:40px;border:1px solid red">
      {{ item.value}}
  </div> -->

  <div class="item">
    item: {{ item.value }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Item } from './index.vue';
const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    default: () => []
  }
})

</script>
<style lang="scss" scoped>
.item {
  @apply bg-blue-400 py-4 text-white h-[50px] flex font-bold my-2 justify-center items-center
}
</style>
