<template>
  <div>

    <div style="margin-bottom:30px">
      <el-button @click="show = true" type="primary"> 数据动态观测 </el-button>
      <el-button @click="show = false" type="warning"> 数组变化操作 </el-button>
    </div>

    <el-form label-width="150px" size="large" v-if="!show">
      <el-form-item label="初始数组,以逗号分隔">
        <el-input v-model="arrOper.initValue" />
      </el-form-item>

      <el-row v-for="(item, index) in arrOper.items" :gutter="10">
        <el-form-item label="map / filter" style="width: 100%;">
          <el-col :span="10">
            <el-select style="width:100%" v-model="item.chooseOperator" placeholder="请选择对数组的操作">
              <el-option label="map" value="map" />
              <el-option label="filter" value="filter" />
            </el-select>
          </el-col>

          <el-col :span="10">
            <el-select v-if="item.chooseOperator == 'map'" style="width:100%" v-model="item.operator" placeholder="操作">
              <el-option label="每项 + 2" value="add" />
              <el-option label="每项 * 2" value="multi" />
            </el-select>


            <el-select v-if="item.chooseOperator == 'filter'" style="width:100%" v-model="item.operator" placeholder="操作">
              <el-option label="每项 > 2" value="gt" />
              <el-option label="每项 < 2" value="lt" />
            </el-select>
          </el-col>

          <el-col :span="4">
            <el-button-group>
              <el-button type="primary" size="small" @click="add(index)">+</el-button>
              <el-button type="danger" size="small" @click="minus(index)">-</el-button>
            </el-button-group>
          </el-col>
        </el-form-item>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmitArr">
          执行
        </el-button>
      </el-form-item>

    </el-form>


    <el-form v-if="show" :model="formInline" label-width="150px" size="large">

      <el-form-item label="增加观测者">
        <el-input v-model="formInline.key" placeholder="请选择增加观测者" />
      </el-form-item>

      <el-form-item label="终止到具体的观测者">
        <el-select style="width:100%" v-model="formInline.expire" placeholder="请选择终止到具体的观测者">
          <el-option v-for="(option, key) in  arr" :key="key" :label="option" :value="option" />

        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          执行
        </el-button>

        <el-button type="danger" @click="clear">
          清空观测者
        </el-button>
      </el-form-item>
      <el-form-item>
        <ul class="w-4/5 mx-auto">
          <li class="bg-blue-500 py-2 text-white my-2 px-4 rounded-md" v-for="(item, key) in arr" :key="key">
            {{ item }}
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { from } from './from';
import { filter } from './rxjs/filter';
import { map } from './rxjs/map';
import { Observable } from "./rxjs/Observable";

type operator = "map" | "filter"
type item = {
  operator: string,
  chooseOperator: operator
}
type arrOper = {
  data: Array<string>,
  initValue: string,
  items: Array<item>
}

const show = ref(false);

const arrOper = reactive<arrOper>({
  // 最终的结果
  data: [],
  initValue: '1,2,3,4',
  items: [
    {
      operator: 'add',
      chooseOperator: "map"
    }
  ],
});
const add = (index: number) => {
  arrOper.items.splice(index + 1, 0, {
    operator: '',
    chooseOperator: "map"
  })
}
let arr = ref<Array<string>>(['1', '2', '3']);

const minus = (index) => {
  arrOper.items.splice(index, 1)
}

let operMap = {
  add: map(val => val + 2),
  multi: map(val => val * 2),
  gt: filter(val => val > 2),
  lt: filter(val => val < 2),
}

const onSubmitArr = () => {
  let operators = arrOper.items.map(oper => operMap[oper.operator]).filter(Boolean)
  let r = arrOper.initValue.split(',').map(Number);
  let subscriber = from(r).pipe(...operators)
  subscriber.subscribe(value => alert("最终结果:" + value));
}



const formInline = reactive({
  key: '',
  expire: ''
})



const clear = () => {
  arr.value = []
  formInline.key = ''
  formInline.expire = ''
}

const onSubmit = async () => {

  if (!arr.value.includes(formInline.key) && formInline.key.trim().length !== 0) {
    arr.value.unshift(formInline.key)
  };

  let subscribe = new Observable(subscribe => {
    arr.value.forEach(str => {
      if (str == formInline.expire) {
        subscribe.complete()
      }
      subscribe.next(str)
    })
  })
  subscribe.subscribe(value =>
    alert(value)
  )
}
</script>
