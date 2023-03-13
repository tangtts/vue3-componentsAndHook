<template>
  <div>
    <input :type="type" v-bind="$attrs" v-model="value" class="input">
  </div>
</template>
<script lang="ts" setup>

import { onMounted, ref, computed, reactive, watch, CSSProperties } from "vue";
import { inputProps, inputEmits } from "./type";

const props = defineProps(inputProps);
const emits = defineEmits(inputEmits);

const style = reactive<CSSProperties>({
  height: 0
});
const initStyle = () => {
  if (props.size == "default") {
    style.height = "50px"
  } else if (props.size == "large") {
    style.height = "60px"
  } else {
    style.height = "30px"
  }
}

onMounted(initStyle)


const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})

</script>

<style lang="scss" scoped>
.input {
  @apply border border-solid border-gray-400 pl-2 rounded-md w-full py-0;
  height: v-bind("style.height");

  &:focus {
    @apply outline outline-2 outline-blue-600;
  }
}
</style>
