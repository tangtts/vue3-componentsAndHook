<template>
  <div>
    <!-- <el-form :inline="true" ref="ruleFormRef" :model="formInline" :rules="rules" class="demo-form-inline">
      <el-form-item label="Storage Key" required prop="key">
        <el-input v-model="formInline.key" placeholder="Storage Key" />
      </el-form-item>

      <el-form-item label="Storage value" required prop="value">
        <el-input v-model="formInline.value" placeholder="Storage value" />
      </el-form-item>

      <el-form-item label="Storage expire" prop="expire">
        <el-select v-model="formInline.expire" placeholder="Storage expire">
          <el-option label="1秒" value="1" />
          <el-option label="1分钟" value="60" />
          <el-option label="1小时" value="3600" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Setting Storage</el-button>
        <el-button type="warning" @click="handleClearSelectStorage">clear Select Storage</el-button>
        <el-button  @click="handleClearStorage">clear All Storage</el-button>
      </el-form-item>
    </el-form>

    <el-table
    :header-cell-style="{textAlign: 'center'}"
    :cell-style="{ textAlign: 'center' }"	
    :data="tableData"  border @selection-change="handleSelectionChange" style="width:100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="key" label="Storage Key" />
      <el-table-column prop="value" label="Storage Value" />
      <el-table-column prop="expire" label="Expire time" />
      <el-table-column fixed="right" label="Operations">

        <template #default="scope">
          <el-button  size="small" @click="remove(scope.row)">remove</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script lang="ts" setup>
import { useStorage } from "./useStorage"
import type { StoreStorage } from "./useStorage"
import { ref, reactive, watch, computed } from "vue"
// import { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<any>()
const { getAllStorage, removeStorage, clearStorage, setStorage } = useStorage()
const formInline = reactive({
  key: '',
  value: '',
  expire: ''
})
const rules = reactive<any>({
  key: [
    {
      required: true,
      message: 'Please input Key',
      trigger: 'change',
    },
  ],
  value: [
    {
      required: true,
      message: 'Please input Key',
      trigger: 'change',
    },
  ],
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


const tableData = computed(() => format(getAllStorage.value))


const onSubmit = async (formEl: any | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage({
        message: 'A success message.',
        type: 'success',
      })
      setStorage(formInline.key, formInline.value, Number(formInline.expire))
      formEl.resetFields()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style>
table {
  margin: 0 !important
}
</style>