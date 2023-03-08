<template>
  <div style="margin:20px">
    <el-form size="large">
      <el-form-item label="type">
        <el-radio-group v-model="form.type">
          <el-radio label="date"></el-radio>
          <el-radio label="range"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="value-format">
        <el-radio-group v-model="form.format">
          <el-radio label="timestamp"></el-radio>
          <el-radio label="YYYY-MM-DD"></el-radio>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="result">
        <span class="result"> {{ form.type == "date" ? date : range }}</span>
      </el-form-item>
      <el-form-item label="date-picker">

        <date-picker :value-format="form.format" :type="form.type" v-model="date" @select-range="getRange"></date-picker>
      </el-form-item>

    </el-form>
  </div>
</template>
<script lang="ts" setup>
import DatePicker from "./date-picker.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";


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
.result {
  @apply font-bold text-orange-500 text-2xl
}
</style>
