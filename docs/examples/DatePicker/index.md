# 一个日历组件

1.  可以传入`type`,可选值为`date| range`,`date`智能选择一个日期，`range` 可以选择多个
2.  可以传入`format`,表示回显数据类型， 可选值为`yyyy-mm-dd| timestamp`
3.  找到这个月的1号是周几，然后回退这么多天作为初始值，遍历 42，形成一个`Array<Date>`
4.  遍历到页面上是一个一个的`Date` 的结构，包含很多信息，可以方便做后续处理
5.  是否是当前月，是否在选择日期的里面，是否是选中 都是基于`Date`的这种结构

---
   巧妙之处在于,一方面是形成 `7 * 6` 的结构，另一方面是一个`Date` 类型，包含信息较多，方便后续 
  
  <details>

   ```vue
  <template>
    <div v-for="i of 6" :key="i">
      <span v-for="j of 7" :key="j">
        {{visableData.value[(i - 1) * 7 + (j - 1)]}}
      </span>
    </div>
  </template>
  ```
  </details>

# 基础用法

<datePicker></datePicker>

<script setup>
  import datePicker from "../../../src/components/date-picker/index.vue" 
</script>

# 属性

| 属性名  |    说明    |  类型  |   可选值   |  默认值   |
| :-----: | :--------: | :----: | :--------: | :-------: |
|  type   |    类型    | string |    date    |   range   | date       |
| format  | 回显的类型 | string | yyyy-mm-dd | timestamp | yyyy-mm-dd |
| v-model |  初始数据  |  Date  |   string   |    --     | -          |
# 事件
|    事件名     |      说明       |  参数  |
| :-----------: | :-------------: | :----: |
| @select-range | range的回显数据 | Date[] |


<details>

<summary>展开查看</summary>

```vue
<template>
    <el-form size="large">
      <el-form-item label="type">
        <el-radio-group v-model="form.type">
          <el-radio label="date"></el-radio>
          <el-radio label="range"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="value-format">
        <el-radio-group v-model="form.format">
          <el-radio label="timestamp"></el-radio>
          <el-radio label="YYYY-MM-DD"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="result">
        <span class="result"> {{ form.type == "date" ? date : range }}</span>
      </el-form-item>

      <el-form-item label="date-picker">
        <date-picker :value-format="form.format" :type="form.type" v-model="date" @select-range="getRange"></date-picker>
      </el-form-item>

    </el-form>
</template>
<script lang="ts" setup>
import DatePicker from "./date-picker.vue"
import { onMounted, ref, computed, reactive, watch } from "vue";
defineOptions({
  name: "DatePickerPage"
})

const date = ref(new Date());
const range = ref<Date[]>();
const getRange = (date: Date[]) => {
  range.value = date;
}
const form = reactive<{
  format: "YYYY-MM-DD" | 'timestamp',
  type: "date" | 'range',
}>({
  format: "YYYY-MM-DD",
  type: "date"
})
</script>

<style lang="scss" scoped>
.result {
  @apply font-bold text-orange-500 text-2xl
}
</style>

```
</details>

<details>
<summary>核心逻辑</summary>

## 1. 根据用户的传入进行格式化为一个`Date[]` 进行渲染页面
> 在一般做法中，先定义数组`dateArr` 会先计算这个月的第一天是周几，然后倒退几天，`dateArr`push 这几天
> 再计算这个月有多少天，然后再`push` 这个月的所有天数
> 然后再计算这个月最后一号是周几，然后 `7 - 周几`,继续`push`这几天  
> 不采用这种方法，因为： 
> 1. 计算步骤有点多 
> 2. 这个 date-picker 高度可能是不固定的  
> 
> 目前的做法是：
> 1. 先定义数组`dateArr`, 先计算这个月的第一天是周几，然后倒退几天，把它当做初始值  
> 2. 最多有 `7 * 6 = 42`个`Date`,因为`31(天) / 7(一周) = 4.42`, 这个`0.42`可能在上 / 下，所以是 `6行`
> 3. 遍历 `42` 
```ts {11-23}
let timeArr: Date[] = []
// 一天的毫秒数
const ONE_DAY_TIME = 24 * 60 * 60 * 1000;
let visableData = computed(() => {
  // 直接循环 42 个
  timeArr = []
  let times = new Date(tempTime.year, tempTime.month, tempTime.date);
  let year = times.getFullYear()
  let currentMonth = times.getMonth();
  // 1号是周几
  let currentMonthFirstDay = new Date(year, currentMonth, 1);
  // 周日 是 0
  let currentMonthFirstDayDate = currentMonthFirstDay.getDay() ?? 7;
  // 毫秒数
  let currentMonthFirstDayTime = currentMonthFirstDay.getTime();

  // 向前推这么多天
  let frontDays = currentMonthFirstDayTime - currentMonthFirstDayDate * ONE_DAY_TIME;

  for (let i = 0; i < 42; i++) {
    timeArr.push(new Date(frontDays + i * ONE_DAY_TIME))
  }
  return timeArr
});
```

## 渲染页面
因为要渲染成 `7 * 6` 排布,所以可以使用`visableData.value[(i - 1) * 7 + (j - 1)]` 
具体可以使用 `数学归纳法总结` 

```vue
<template>
  <div v-for="i of 6" :key="i">
    <span v-for="j of 7" :key="j"  @click="chooseDate(getCurrentDate(i, j))">
      {{getCurrentDate(i,j)}}
    </span>
  </div>
</template>
<script setup>
const getCurrentDate = (i, j): Date => {
  return visableData.value[(i - 1) * 7 + (j - 1)]
}
const chooseDate =(date:Date)=>{
  // xxxx
}
</script>
```

## 其他逻辑
因为 `getCurrentDate(i, j)` 里面是 `Date` 结构，里面包含了很多信息，可以方便对后续处理
</details>

<details>

<summary>完整代码</summary>

```vue
<template>
  <div class="date-picker">
    <header class="header">
      <div @click="addOrMinus('year', '-')">
        <img class="icon" src="./left-year.png" alt="left-month">
      </div>
      <div @click="addOrMinus('month', '-')">
        <img class="icon" src="./left-month.png" alt="left-month">
      </div>
      <span class="header"> {{ tempTime.year }} 年 --- {{
        tempTime.month + 1
      }}月 -- {{ tempTime.date }}</span>

      <div @click="addOrMinus('month', '+')">
        <img class="icon" src="./right-month.png" alt="left-month">
      </div>
      <div @click="addOrMinus('year', '+')">
        <img class="icon" src="./right-year.png" alt="left-month">
      </div>
    </header>
    <main>
      <header class="weekContainer">
        <div class="cell week" v-for="(week, index) of weeks" :key="index">
          {{ week }}</div>
      </header>
      <div>
        <div v-for="i of 6" :key="i" class="row">
          <span @click="chooseDate(getCurrentDate(i, j))" v-for="j of 7" :key="j" :class="['cell', {
            isRange: type == 'range' ? isRange(getCurrentDate(i, j)) : false,
            isActive: type == 'range' ? isActive(getCurrentDate(i, j)) : false,
          }]">
            <span :class="['date',
              {
                isCurrentMonth: isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isSelect: type == 'date' ? isSelect(getCurrentDate(i, j)) : false,
              }

            ]"> {{ getCurrentDate(i, j).getDate() }}</span>
          </span>
        </div>

      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, PropType, toRaw } from "vue";

const weeks = ["日", "一", "二", "三", "四", "五", "六"];
const props = withDefaults(defineProps<{
  modelValue: Date | string | number,
  valueFormat: "timestamp" | "YYYY-MM-DD",
  type: "date" | "range",
}>(), {
  modelValue: () => new Date(),
  valueFormat: "timestamp",
  type: "date",
});
const emit = defineEmits<{
  (e: "update:modelValue", args: Date | string | number): any,
  (e: "selectRange", args: Date[]): any,
}>()

const getCurrentDate = (i, j): Date => {
  return visableData.value[(i - 1) * 7 + (j - 1)]
}
const isCurrentMonth = (date: Date) => {
  return tempTime.year == date.getFullYear() && tempTime.month == date.getMonth()
}

const isToday = (date: Date) => {
  const now = new Date();
  return now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate()
};
// TODO 单选 / 多选
const isSelect = (date: Date) => {
  return tempTime.year == date.getFullYear() && tempTime.month == date.getMonth() && tempTime.date == date.getDate()
}

const isRange = (date: Date) => {
  let arr = chooseDateArr.value, min = Math.min(...arr), max = Math.max(...arr), time = date.getTime();
  return min <= time && time <= max
}
const isActive = (date: Date) => {
  let arr = chooseDateArr.value, time = date.getTime();
  return arr.includes(time)
}

const addOrMinus = (monthOryear: "month" | "year", addOrMinus: "+" | "-") => {
  let time = new Date(tempTime.year, tempTime.month, tempTime.date);

  let map = new Map([])
  map.set('year+', function () {
    tempTime.year = time.getFullYear() + 1;
  })
  map.set('year-', function () {
    tempTime.year = time.getFullYear() - 1;
  })

  map.set('month+', function () {
    let m = time.getMonth() + 1;
    const c = time.setMonth(m);
    tempTime.month = new Date(c).getMonth();
  })

  map.set('month-', function () {
    let m = time.getMonth() - 1;
    const c = time.setMonth(m);
    tempTime.month = new Date(c).getMonth();
  })

  let fn = map.get(monthOryear + addOrMinus) as Function;
  fn?.()
}
// 根据用户传入的 valueFormat 返回给他
function formatTimebyValueFormat(date: Date) {
  if (props.valueFormat == "timestamp") {
    return date.getTime()
  } else if (props.valueFormat == "YYYY-MM-DD") {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  } else {
    return date
  }
}
let chooseDateArr = ref<number[]>([])
function setChooseData(date: Date) {
  const time = date.getTime()
  if (!chooseDateArr.value.length) {
    chooseDateArr.value.push(time)
  } else if (chooseDateArr.value.length == 1) {
    let min = chooseDateArr.value.at(0)!;
    if (min < time) {
      chooseDateArr.value.push(time)
    } else {
      chooseDateArr.value.unshift(time)
    }
  } else {
    // 已经有两个值了
    let min = chooseDateArr.value.at(0)!;
    let max = chooseDateArr.value.at(1)!;
    if (time < min) {
      chooseDateArr.value.shift()
      chooseDateArr.value.unshift(time)
    } else {
      chooseDateArr.value.pop();
      chooseDateArr.value.push(time);
    }
  }
}


const chooseDate = (date: Date) => {
  setChooseData(date)
  if (props.type == "date") {
    emit("update:modelValue", formatTimebyValueFormat(date));
  } else {
    let arr = chooseDateArr.value.map(date => {
      return formatTimebyValueFormat(new Date(date))
    }) as Date[];
    emit("selectRange", arr)
  }
}


function formatUserTime(date: Date | string | number) {
  if (typeof date == "string" || typeof date == "number") {
    date = new Date(date);
  }
  // new Date(2023-2-1) month = 1
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }
};


// 创建一个不断页面切换显示的year,会一直改变
let tempTime = reactive({
  year: formatUserTime(props.modelValue).year,
  month: formatUserTime(props.modelValue).month,
  date: formatUserTime(props.modelValue).date
});

watch(() => props.modelValue, (newVal) => {
  tempTime.year = formatUserTime(newVal).year;
  tempTime.month = formatUserTime(newVal).month;
  tempTime.date = formatUserTime(newVal).date;
})


let timeArr: Date[] = []
const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

let visableData = computed(() => {
  // 直接循环 42 个
  timeArr = []
  let times = new Date(tempTime.year, tempTime.month, tempTime.date);
  let year = times.getFullYear()
  let currentMonth = times.getMonth();
  // 1号是周几
  let currentMonthFirstDay = new Date(year, currentMonth, 1)
  let currentMonthFirstDayDate = currentMonthFirstDay.getDay() ?? 7;
  let currentMonthFirstDayTime = currentMonthFirstDay.getTime();

  // 向前推这么多天
  let frontDays = currentMonthFirstDayTime - currentMonthFirstDayDate * ONE_DAY_TIME;

  for (let i = 0; i < 42; i++) {
    timeArr.push(new Date(frontDays + i * ONE_DAY_TIME))
  }
  return timeArr
});


</script>
<style lang="scss" scoped>
.date-picker {
  @apply w-[700px] m-auto shadow-md shadow-orange-500 box-border rounded-md py-4;

  .header {
    @apply select-none flex justify-center py-4 items-center text-gray-500 font-bold text-lg;
  }

  .icon {
    @apply w-[38px] inline-block cursor-pointer px-2;
  }

  .weekContainer {
    @apply flex justify-evenly items-center py-2;
  }

  .row {
    @apply flex justify-evenly items-center;
  }

  .cell {
    @apply text-black text-center text-lg flex-1 h-[40px] flex cursor-pointer justify-center items-center;

    &.isRange {
      @apply rounded-none bg-gray-200;
    }

    &.isActive {
      @apply bg-blue-200;
    }

    .date {

      @apply w-[40px] aspect-square flex items-center justify-center;

      &:not(.isCurrentMonth) {
        @apply text-gray-400;
      }

      &.week {
        @apply cursor-pointer text-black;
      }

      &.isToday {
        @apply rounded-full text-blue-500 font-bold;
      }

      &.isSelect {
        @apply bg-blue-400 text-white rounded-full;
      }

      // 只有是当前月才有 hover 效果
      &:hover:is(.isCurrentMonth):not(.isSelect) {
        @apply text-blue-300;
      }
    }
  }
}
</style>

```
</details>
