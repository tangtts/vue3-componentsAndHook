# 上传
通过点击或者拖拽上传文件。
> 其实可以扩展很多，但是没必要,总体来说比较简单  
> *time:2022/11/3 4:21*
# 基础用法

<upload></upload>

<script  setup>
  import upload from "../../../src/components/upload/index.vue" 
</script>


<details>

<summary>展开查看</summary>

```vue

<template>
  <div>
    <upload :on-success="onSuccess" :on-exceed="onExceed" :limit="3" :before-upload="onBeforeLoad" multiple
      v-model:fileList="fileList">
      <el-button>选择文件</el-button>
    </upload>
  </div>
</template>
<script lang="ts" setup>
import upload from "./upload.vue"
import {ref } from 'vue';
const onSuccess = () => {
  alert("success")
}
const onExceed = () => {
  alert("超出个数限制")
}
// 初始值
const fileList = ref([])

const onBeforeLoad = (file) => {
  alert(`开始校验${file.name}`)
  return true
}
</script>
```
</details>
				
# 属性
|  属性名  |       说明        |  类型   |   可选值   | 默认值 |
| :------: | :---------------: | :-----: | :--------: | :----: |
|  on-success  |    文件上传成功时的钩子      | function  |     --     |   否   |
|  on-exceed   |  当超出限制时，执行的钩子函数   | function  |     --     |  否     |
| before-upload | 上传文件之前的钩子 | function | - | [] |
| limit | 允许上传文件的最大数量 | number | - | -  |
| file-list / v-model:file-list | 默认上传文件 | UploadUserFile[] | - | [] |

# Source

<details>

<summary>展开查看</summary>

```vue
<template>
  <div>
    <dragVue v-if="drag" @file="uploadFiles" />
    <div v-else @click="handleClick">
      <input type="file" @change="changeFileInput" :multiple="multiple" ref="inputRef" class="input">
      <slot />
    </div>
  <!-- 循序的列表 -->
    <transition-group tag="ul" class="list">
      <li v-for="file in filesRef" :key="file.uid" class="item">
        <img :src="file.url" alt="">
        <p class="name">{{ file.name }} </p>
        <div class="close" @click="deleteFile(file)">
          <p>x</p>
        </div>
      </li>
    </transition-group>

  </div>
</template>
<script lang="ts" setup>
import dragVue from './drag.vue';
import { PropType, ref, shallowRef, watch } from 'vue';

interface UploadRawFile extends File {
  uid: number
}

interface UploadFile {
  name: string
  size?: number
  uid: number
  url?: string
  raw?: UploadRawFile
}

const props = defineProps({
  onSuccess: {
    type: Function as PropType<(file: File[], fileList: UploadFile[]) => any>,
    default: (arg: any, args: any) => ({})
  },
  onExceed: {
    type: Function as PropType<(file: File[], fileList: UploadFile[]) => any>,
    default: (arg: any, args: any) => ({})
  },
  onBeforeLoad: {
    type: Function
  },
  limit: Number,
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => []
  },
  multiple: Boolean,
  drag: Boolean
});

const filesRef = ref<UploadFile[]>([])

/**
 * 
 * @param e input 选择的 file
 */
const changeFileInput = (e) => {
  const files = (e.target as HTMLInputElement).files
  // 构建自己的对象
  if (!files) return
  uploadFiles(Array.from(files))
}

/**
 * @description 删除操作
 * @param delfile 要删除的文件
 */

const deleteFile = (delfile) => {
  filesRef.value = filesRef.value.filter(file => delfile.uid !== file.uid)
  URL.revokeObjectURL(delfile.url)
}

const uploadFiles = (files: File[]) => {
  if (files.length === 0) return;
  const { limit, multiple, onExceed } = props;

  if (limit && filesRef.value.length + files.length > limit) {
    return onExceed(files, filesRef.value)
  }
  if (!multiple) {
    files = files.slice(0, 1)
  }

  for (const file of files) {
    const rawFile = file as UploadRawFile;
    /**
     * @description 开始组装
     */
    rawFile.uid = genFileId();
    handleStart(rawFile)
    // 准备上传
    upload(rawFile);
  }
}

const handleStart = (file) => {
  let uploadFile: UploadFile = {
    size: file.size,
    url: URL.createObjectURL(file),
    raw: file,
    uid: file.uid,
    name: file.name
  }
  filesRef.value = [...filesRef.value, uploadFile]
}


const upload = (rawFile) => {
  if (!props.onBeforeLoad) {
    return doUpload(rawFile)
  };
  let r = true;
  if (props.onBeforeLoad) {
    r = props.onBeforeLoad(rawFile)
    if (r) {
      doUpload(rawFile)
    }
  }
}

const doUpload = (file) => {
  // 如果是 成功态的话不用 上传
  console.log("执行上传")
  props.onSuccess(file, filesRef.value)
}

const inputRef = shallowRef<HTMLInputElement>();

const handleClick = () => {
  // 清空 input 的value 值
  inputRef.value!.value = ''
  inputRef.value!.click()
}

/**
 * @return 生成唯一 uid
 */
function genFileId() {
  return Date.now()
}

watch(() => props.fileList, (outerFiles) => {
  // 这个地方应该给一个状态，都是成功态 
  for (const file of outerFiles) {
    file.uid ||= genFileId()
  }

  filesRef.value.push(...outerFiles)
}, { immediate: true, deep: true })
</script>
<style lang="scss">
.input {
  display: none;
}

.list {
  display: flex;
  gap: 10px;

  .item {
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border: 1px dashed red;
    padding: 8px;
    position: relative;

    img {
      object-fit: contain;
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      font-size: 12px;
    }

    .close {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      font-size: 50px;
      transition: opacity .5s;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        display: none;
        cursor: pointer;
      }
    }

    &:hover {
      background-color: #cdc0c0;

      img {
        filter: blur(5px);
      }

      .name {
        opacity: 0.8;
      }

      .close {
        opacity: 1;

        p {
          display: block;
        }
      }
    }
  }
}
</style>
```
## drag 组件
```vue

<template>
  <div class="item"
        @drop.prevent="dragFile" 
        @dragleave.prevent 
        @dragover.prevent>
    <span>+</span>
  </div>
</template>

<script lang="ts" setup>
const emitter = defineEmits(["file"])
const dragFile = (e: DragEvent) => {
  emitter("file", Array.from(e.dataTransfer!.files))
}

</script>
<style lang="scss" scoped>
.item {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border: 1px dashed red;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-size: 50px;
  }
}
</style>
```



</details>






