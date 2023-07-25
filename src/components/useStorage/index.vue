<template>
  <div>
    <el-form :model="formInline" label-width="120px" size="large">

      <el-form-item label="Storage Key">
        <el-input v-model="formInline.key" placeholder="请选择key" />
      </el-form-item>

      <el-form-item label="Storage value">
        <el-input v-model="formInline.value" placeholder="请选择value" />
      </el-form-item>

      <el-form-item label="expire Time">
        <el-select style="width:100%" v-model="formInline.expire" placeholder="请选择 过期时间">
          <el-option v-for="option in  options" :key="option.label" :label="option.label" :value="option.value" />

        </el-select>
      </el-form-item>
      <el-form-item>

        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </el-form-item>
    </el-form>


    <baseList v-model="tableData" :minusOne="remove">
      <template #default="{ item }">
        <div style="margin-bottom: 2px;font-size: medium;"> <span>key: {{ item.key }}</span>
          <span> value:{{ item.value }}</span>
        </div>
        <div style="font-size:medium;">过期时间:<span>{{ item.expire }}</span></div>
      </template>
    </baseList>

  </div>
</template>
<script lang="ts" setup>
import { useStorage } from "./useStorage"
import baseInput from "../base/input/index.vue";
import baseSelect from "../base/select/index.vue";
import baseButton from "../base/button/index.vue";
import baseList from "../base/list/index.vue"
import type { StoreStorage } from "./useStorage"
import { ref, reactive, watch, computed } from "vue";
import { IOption } from "components/base/select/types";


const options = ref<IOption[]>([
  { label: "1秒", value: "1" },
  { label: "1分钟", value: "60" },
  { label: "1小时", value: "3600" },
]);

const { getAllStorage, removeStorage, clearStorage, setStorage } = useStorage()
const formInline = reactive({
  key: '',
  value: '',
  expire: ''
})

let r: StoreStorage[] = []
const handleSelectionChange = (e: any) => {
  r = e
}
const handleClearSelectStorage = () => {
  r.forEach(i => {
    removeStorage(i.key)
  })
}
const handleClearStorage = () => {
  clearStorage()
}
const remove = (row: any) => {
  removeStorage(row.key)
}

// [{ "key": "123", "val": { "value": "123", "time": 1663226649369, "expire": 0 }}]
// 
function format(arr: StoreStorage[]) {
  return arr.map(item => {
    return {
      key: item.key,
      value: item.val.value,
      time: item.val.time,
      expire: item.val.expire,
    }
  })
}
const tableData = ref(computed(() => format(getAllStorage.value)))

const validForm = (formInline): boolean => {
  for (const key in formInline) {
    if (!formInline[key]) {
      alert(`${key} 缺少`)
      return false;
    }
  }
  return true
}


const onSubmit = async () => {

  if (validForm(formInline)) {
    setStorage(formInline.key, formInline.value, Number(formInline.expire))
  } else {
    console.log('error submit!')
  }

}
</script>
<style scoped lang="scss">
.action {
  @apply space-x-3 mt-3;
}
</style>