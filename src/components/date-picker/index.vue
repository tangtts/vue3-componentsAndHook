<template>
  <div>
    {{ date }}
    <date-picker value-format="YYYY-MM-DD" type="range" v-model="date"></date-picker>
  </div>
</template>
<script lang="ts" setup>
import DatePicker from "./date-picker.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
defineOptions({
  name: "DatePickerPage"
})
const date = ref(new Date())
</script>

<style lang="scss" scoped></style>
