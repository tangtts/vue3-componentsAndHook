<template>
  <div class="flex h-screen">
    <div
      class="w-2/5 m-auto round-md shadow-md shadow-md hover:shadow-lg transition-shadow transition-500 border-solid border-gray-200 p-5"
    >
      <el-form
        :rules="rules"
        ref="form"
        :model="user"
        @submit.prevent="handleSubmit"
        size="large"
      >
        <el-form-item prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>

        <el-form-item class="text-center">
          <el-button type="primary" native-type="submit" @submit="handleSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="tsx">
import router from "@/router";
import type { IElForm, IFormRule } from "@/types/element-plus";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
const form = ref<IElForm | null>(null);
const user = reactive({
  name: "zs",
  password: "123456",
});
const rules = ref<IFormRule>({
  name: [{ required: true, message: "请输入账号", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
const handleSubmit = async () => {
  const valid = await form.value?.validate();
  if (!valid) {
    return false;
  }
  router.push("/");
  ElMessage.success("登录成功");
};
</script>
