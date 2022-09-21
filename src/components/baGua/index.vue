
<template>
  <div>
    <el-form>
      <el-form-item label="元素尺寸">
        <el-slider v-model="size" :min='100' :max='400' />
      </el-form-item>

      <el-form-item label="转动速度">
        <el-select v-model="animationSpeed">
          <el-option label="1s" value="1s" />
          <el-option label="10s" value="10s" />
          <el-option label="20s" value="20s" />
        </el-select>
      </el-form-item>
    </el-form>

    <BaGua :animationSpeed='animationSpeed' :size="size" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaGua from "./baGua.vue"
const size = ref(100)
const animationSpeed = ref<`${string}s`>('1s')

</script>