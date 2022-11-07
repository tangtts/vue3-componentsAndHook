<template>
  <div class="mask" v-if="visible">
    loading...
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
  visible:Boolean,
})

</script>

<style lang="scss">
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(122, 122, 122, 0.8);
}
</style>