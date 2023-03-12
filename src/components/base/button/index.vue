<template>
  <button :class="['button', activeClass]">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, PropType } from "vue";
const props = defineProps({
  type: {
    type: String as PropType<'success' | 'danger' | 'warning' | 'info'>
  }
});
const activeClass = computed(() => {
  switch (props.type) {
    case "success":
      return "success"
    case "danger":
      return "danger"
    case "warning":
      return "warning"
    case "info":
      return "info"
    default:
      break;
  }
})
</script>

<style lang="scss" scoped>
.button {
  @apply text-white border bg-blue-400 py-2 px-4 rounded-lg;

  &.info {
    @apply bg-gray-400
  }

  &.danger {
    @apply bg-red-400;
  }

  &.warning {
    @apply bg-yellow-400;
  }


  &.success {
    @apply bg-green-400;
  }
}
</style>
