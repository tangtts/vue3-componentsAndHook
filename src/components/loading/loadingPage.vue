<template>
  <Transition name="fade" :on-after-leave="handleAfterLeave">
    <div class="mask" v-if="visible">
      loading...
    </div>
  </Transition>
</template>
<script lang="ts" setup>
defineProps({
  visible: Boolean,
  handleAfterLeave: Function
})
</script>

<style lang="scss">
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(122, 122, 122, 0.8);
  color: white;
  font-size: 14px;
}
</style>