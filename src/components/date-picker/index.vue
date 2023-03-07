<template>
  <div>
    {{ date }}
    <date-picker value-format="YYYY-MM-DD" type="date" v-model="date" @select-range="getRange"></date-picker>
  </div>
</template>
<script lang="ts" setup>
import DatePicker from "./date-picker.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
defineOptions({
  name: "DatePickerPage"
})
const date = ref(new Date());
const getRange = (date: Date[]) => {
  console.log(date)
}
</script>

<style lang="scss" scoped></style>
