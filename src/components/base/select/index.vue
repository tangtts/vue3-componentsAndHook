<template>
  <div class="outer">
    <baseInput v-model="value" @focus="focus" @blur="blur" />

    <ul ref="ulRef" class="content">
      <li v-for="(option, index) of options" @click="choose(option.value)"
        :class="['option', { isActive: checkActive(option.value) }]" :key="index">
        {{ option.value }}
      </li>
    </ul>

  </div>
</template>
<script lang="ts" setup>
import { assetsElement } from "../../../utils/index";
import { onMounted, ref, computed, reactive, watch } from "vue";
import baseInput from "../input/index.vue"
import { selectProps, checkEmit } from "./types";
const props = defineProps(selectProps);
const emits = defineEmits(checkEmit);
const showContent = ref(false);
const ulRef = ref<HTMLUListElement | null>(null);

const checkActive = (option) => {
  return props.modelValue == option
}


watch(showContent, (newVal) => {
  assetsElement(ulRef.value)
  if (newVal) {
    ulRef.value.style.maxHeight = '999px'
  } else {
    ulRef.value.style.maxHeight = '0'
  }
})

const choose = (option) => {
  showContent.value = false;
  emits("update:modelValue", option)
}
const focus = () => {
  showContent.value = true;
}
const blur = () => {
  showContent.value = false;
}
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
.content {
  @apply bg-white max-h-0 outline p-0 outline-neutral-300 list-none mt-2 rounded-md overflow-hidden duration-500 transition-all;

  .option {
    @apply px-4 h-10 leading-10 rounded-sm cursor-pointer;

    &.isActive {
      @apply bg-blue-400 text-white
    }

  }
}

.select {
  @apply w-full border border-solid border-gray-400 rounded-md pl-2 h-[50px];

  &:focus {
    @apply outline outline-blue-500
  }
}
</style>
