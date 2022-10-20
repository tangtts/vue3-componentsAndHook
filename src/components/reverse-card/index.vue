<template>
  <el-form style="margin-top:20px">
    <el-form-item label="duration">
      <el-select v-model="duration">
        <el-option label="1s" value="1"/>
        <el-option label="fast" value="fast"/>
        <el-option label="slow" value="slow"/>
        <el-option label="normal" value="normal"/>
      </el-select>
    </el-form-item>

    <el-form-item label="size">
      <el-slider v-model="size" :min='100' :max='400' />
    </el-form-item>

    <el-form-item label="trigger">
      <el-radio-group v-model="trigger">
        <el-radio label="click" />
        <el-radio label="hover" />
      </el-radio-group>

    </el-form-item>
  </el-form>

  <reverse-card :width="size" :height="size" :trigger="trigger" :duration="duration">
    <template #front>
      <div>
        front
      </div>
    </template>
    <template #back>
      <div>
        back
      </div>
    </template>
  </reverse-card>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import reverseCard from "./reverse-card.vue"
import type { durationType, trigger as triggerType } from './reverse-card.vue'

const duration = ref<durationType>(1)
const size = ref(100)
const trigger = ref<triggerType>('click')
</script>