<template>
  <div>
    {{ date }}
    <date-picker format="yyyy 年 MM 月 dd 日" value-format="timestamp" v-model="date"></date-picker>
  </div>
</template>
<script lang="ts" setup>
import DatePicker from "./date-picker.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
const date = ref(new Date())
</script>

<style lang="scss" scoped></style>
