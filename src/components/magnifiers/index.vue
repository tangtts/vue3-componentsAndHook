<template>

  <div>
    <!-- 改变mask 的大小，颜色，传入的图片 -->
    <el-form>

      <el-form-item label="size">
        <el-slider v-model="size" :min='100' :max='400' />
      </el-form-item>

      <el-form-item label="color">
        <el-color-picker v-model="color"></el-color-picker>
      </el-form-item>

      <el-form-item label="scale">
        <el-select v-model="scale">
          <el-option label="1.1" value="110%">

          </el-option>

          <el-option label="1.2" value="120%">

          </el-option>

          <el-option label="1.3" value="130%">

          </el-option>

        </el-select>
      </el-form-item>

    </el-form>
    <magnifiers 
    img="https://img.alicdn.com/imgextra/i3/1917047079/O1CN01lkG2pf22AEUi1owve_!!1917047079.png_430x430q90.jpg"
     :size="size+'px'" 
     :bg-color="color" 
     :scale="scale" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import magnifiers from "./magnifers.vue"
const size = ref(200)
const color = ref('#3e6fd1')
const scale = ref('110%')
</script>