<template>
  <div>
    <base-switch v-model="drag" active-text="拖拽上传" inactive-text="点击上传"></base-switch>
    <upload style="margin-top: 20px;" :on-success="onSuccess" :on-exceed="onExceed" :limit="3" :drag="drag"
      :before-upload="onBeforeLoad" multiple v-model:fileList="fileList">
      <base-button size="large" style="width:200px;height:80px">选择文件</base-button>
    </upload>
  </div>
</template>
<script lang="ts" setup>
import upload from "./upload.vue"
import baseSwitch from "../base/switch/index.vue"
import baseButton from "../base/button/index.vue"
import { ref } from 'vue';
import { Props } from "./types"
const drag = ref(false)
defineProps(Props)

const onSuccess = () => {
  alert("success")
}
const onExceed = () => {
  alert("超出个数限制")
}

const fileList = ref([])

const onBeforeLoad = (file) => {
  alert(`开始校验${file.name}`)
  return true
}


</script>
