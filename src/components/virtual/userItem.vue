<template>
  <!--
    固定高度 
    <div style="height:40px;border:1px solid red">
      {{ item.value}}
  </div> -->

  <div style="padding:0 10px;background-color:#ecf5ff;border:1px solid #fff;color:#409eff;height: 50px;text-align: center;line-height: 50px;">
      {{ item.value}}
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
import { Item } from './index.vue';
  const props = defineProps({
    item:{
      type:Object as  PropType<Item>,
      default:()=>[]
    }
  })

</script>
