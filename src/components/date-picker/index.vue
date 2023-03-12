<template>
  <div style="margin:20px">
    <div class="group">
      <base-switch v-model="isDateOrRange" activeText="date" inactiveText="range"></base-switch>
      <base-switch v-model="dateFormat" activeText="timestamp" inactiveText="YYYY-MM-DD"></base-switch>
    </div>
    <p class="result"> {{ isDateOrRange ? date : range }}</p>

    <date-picker :value-format="form.format" :type="form.type" v-model="date" @select-range="getRange"></date-picker>
  </div>
</template>
<script lang="ts" setup>
import baseSwitch from "../base/switch/index.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
import datePicker from "./date-picker.vue"


const isDateOrRange = ref(true);
const dateFormat = ref(true);
watch(isDateOrRange, (val) => {
  if (val) {
    form.type = "date"
  } else {
    form.type = "range"
  }
});
watch(dateFormat, (val) => {
  if (val) {
    form.format = "timestamp"
  } else {
    form.format = "YYYY-MM-DD"
  }
})


const date = ref(new Date());
const range = ref<Date[]>();
const getRange = (date: Date[]) => {
  range.value = date;
}
const form = reactive<{
  format: "YYYY-MM-DD" | 'timestamp',
  type: "date" | 'range',
}>({
  format: "YYYY-MM-DD",
  type: "date"
})
</script>

<style lang="scss" scoped>
.group {
  @apply flex items-center space-x-8;
}

.result {
  @apply font-bold text-green-500 text-xl mb-8;
}
</style>
