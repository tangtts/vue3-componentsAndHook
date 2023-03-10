<template>
  <div class="container">
    <el-radio-group v-model="radio" size="large">
      <el-radio-button label="picFlip" />
      <el-radio-button label="cardListFlip" />
      <el-radio-button label="itemsListFlip" />
    </el-radio-group>

    <Transition mode="out-in">
      <component :is="radio" />
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, Transition } from "vue";

const radio = ref('picFlip')


</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0
}
</style>
