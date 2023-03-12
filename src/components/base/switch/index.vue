<template>
  <div class="container">
    <label class="switch" :style="style">
      <input type="checkbox" class="input" ref="checkbox" @change="change">
      <span class="slider round"></span>
    </label>
    <span :class="['text', { active: modelValue }]">{{
      modelValue ? activeText : inactiveText
    }}</span>
  </div>
</template>
<script lang="ts" setup>
import { assetsElement } from "../../../utils/index";
import { onMounted, ref, computed, reactive, watch, PropType, CSSProperties } from "vue";
import { checkEmit, switchProps } from "./types";
const props = defineProps(switchProps)
console.log(props)
const emits = defineEmits(checkEmit);
const checkbox = ref<HTMLInputElement | null>(null);

onMounted(() => {
  assetsElement(checkbox.value)
  if (props.modelValue) {
    checkbox.value.checked = true;
  } else {
    checkbox.value.checked = false;
  }
})
const translateX = ref('');
if (props.size == "small") {
  translateX.value = "100%"
} else if (props.size == "default") {
  translateX.value = "100%"
} else {
  translateX.value = "120%"
}

const style = computed<CSSProperties>(() => {
  if (props.size == "small") {
    return {
      width: "40px",
      height: "22px"
    }
  } else if (props.size == "default") {
    return {
      width: "60px",
      height: "34px"
    }
  } else {
    return {
      width: "80px",
      height: "42px"
    }
  }
})

const change = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLInputElement).checked)
}



</script>

<style lang="scss" scoped>
.container {
  @apply flex items-center;

  .text {
    @apply ml-2 font-bold;

    &.active {
      @apply text-blue-500
    }
  }
}

.switch {
  @apply relative inline-block;

  .input {
    @apply invisible;

    &:checked {
      &+.slider {
        @apply bg-blue-500;

        &::before {
          transform: translateX(v-bind("translateX"));
        }
      }
    }

  }

  .slider {
    @apply absolute cursor-pointer inset-0 bg-slate-300 duration-300 flex flex-col justify-center;

    &:before {
      @apply absolute cursor-pointer aspect-square h-4/5 bg-white duration-500;
      content: "";
      left: 2px;
    }

    &.round {
      @apply rounded-full;

      &::before {
        border-radius: 50%;
      }
    }
  }
}
</style>
