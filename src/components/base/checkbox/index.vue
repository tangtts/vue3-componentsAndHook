<template>
  <div>
    <label v-if="$slots.default || label">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </label>
    {{ label }}
    <input type="checkbox" v-model="model" class="checkbox" @change="change" ref="inputRef">
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { checkboxProps, checkEmit } from "./types";
const props = defineProps(checkboxProps)
const emits = defineEmits(checkEmit)
// defineOptions({
//   name: 'myCheckbox'
// })
const model = computed<String | Number | Boolean>({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})

const change = (e: Event) => {
  const val = (e.target as HTMLInputElement).checked
  emits("change", val)
}
const inputRef = ref<HTMLInputElement>()

function indeterminate(val: boolean) {
  inputRef.value && (inputRef.value.indeterminate = val);
}

watch(() => props.indeterminate, indeterminate)

onMounted(() => {
  indeterminate(props.indeterminate)
})
</script>


<style lang="scss" scoped></style>