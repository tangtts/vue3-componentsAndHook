<template>
  <div class="date-picker">
    <header class="header">
      <div @click="addOrMinus('year', '-')">
        <img class="icon" src="./left-year.png" alt="left-month">
      </div>
      <div @click="addOrMinus('month', '-')">
        <img class="icon" src="./left-month.png" alt="left-month">
      </div> {{ tempTime.year }} 年 ------ {{
        tempTime.month + 1
      }}月 -- {{ tempTime.date }}
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
            isCurrentMonth: isCurrentMonth(getCurrentDate(i, j)),
            isToday: isToday(getCurrentDate(i, j)),
            isSelect: props.type.date ? isSelect(getCurrentDate(i, j)) : false,
            isRange: props.type.range ? isRange(getCurrentDate(i, j)) : false
          }]">
            {{ getCurrentDate(i, j).getDate() }}
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
  modelValue: Date | string,
  valueFormat: "timestamp" | "YYYY-MM-DD",
  type: "date" | "range",
}>(), {
  modelValue: () => new Date(),
  valueFormat: "timestamp",
  type: "date"
});
const emit = defineEmits<{
  (e: "update:modelValue", args: Date | string | number): any
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
  return min < time && time < max
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
  chooseDateArr.value.push(date.getTime())
}


const chooseDate = (date: Date) => {
  emit("update:modelValue", formatTimebyValueFormat(date));
  setChooseData(date)
}


function formatUserTime(date: Date | string) {
  if (typeof date == "string") {
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
    @apply select-none flex justify-center py-4 items-center text-gray-500 font-bold;
  }

  .icon {
    @apply w-[38px] inline-block cursor-pointer px-2;
  }

  .weekContainer {
    @apply flex justify-evenly items-center py-2;
  }

  .row {
    @apply flex justify-evenly items-center
  }

  .cell {
    @apply text-black text-center text-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer;

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
      @apply bg-blue-400 text-white
    }

    // 只有是当前月才有 hover 效果
    &:hover:is(.isCurrentMonth):not(.isSelect) {
      @apply text-blue-300;
    }

    &.isRange {
      @apply rounded-none bg-gray-200;
    }
  }
}
</style>
