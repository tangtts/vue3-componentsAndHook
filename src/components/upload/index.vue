<template>
  <div>
    <el-switch v-model="drag" active-text="拖拽上传" inactive-text="点击上传"></el-switch>
    <upload :on-success="onSuccess" :on-exceed="onExceed" :limit="3" :drag="drag" :before-upload="onBeforeLoad" multiple
      v-model:fileList="fileList">
      <el-button>选择文件</el-button>
    </upload>
  </div>
</template>
<script lang="ts" setup>
import upload from "./upload.vue"
import { ref } from 'vue';
import {Props} from "./types"
const drag = ref(true)
const props = defineProps(Props)

defineOptions({
  name: 'myUpload',
});
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
