<template>
  <div class="date-picker">
    <header class="header">
      <div @click="addOrMinus('year', '-')">
        <img class="icon" src="./left-year.png" alt="left-month">
      </div>
      <div @click="addOrMinus('month', '-')">
        <img class="icon" src="./left-month.png" alt="left-month">
      </div> {{ years }} 年 ------ {{
        months
      }}月
      <div @click="addOrMinus('month', '+')">
        <img class="icon" src="./right-month.png" alt="left-month">
      </div>
      <div @click="addOrMinus('year', '+')">
        <img class="icon" src="./right-year.png" alt="left-month">
      </div>
    </header>
    <main>
      <header class="weekContainer">
        <div class="week" v-for="(week, index) of weeks" :key="index">
          {{ week }}</div>
      </header>
      <div class="content">
        <div v-for="(date, index) of dates" :key="index" :name="isActive(date)" :date="date"
          @click="chooseDate(years, months, date)" :class="['date', {
            'isToday': isToday(date),
            'isRange': isRange(date),
            'isActive': isActive(date),
            'isDisabled': isDisabled(date)
          }]">
          {{ date }}
          <span v-if="isToday(date)" style="font-size: 12px;">今天</span>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, PropType } from "vue";

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

const addOrMinus = (monthOryear: "month" | "year", addOrMinus: "+" | "-") => {
  let time = cteateDate.value;

  let map = new Map([])
  map.set('year+', function () {
    years.value = ++years.value;
  })
  map.set('year-', function () {
    years.value = --years.value;
  })

  map.set('month+', function () {
    let m = ++months.value;
    const c = time.setMonth(m);
    months.value = setMonth(c);
  })

  map.set('month-', function () {
    let m = --months.value;
    months.value = setMonth(time.setMonth(m));
  })

  let fn = map.get(monthOryear + addOrMinus) as Function;
  fn?.()
}

function formatTimebyValueFormat({ year, month, date }) {
  let timestamp = new Date(year, month, date)
  if (props.valueFormat == "timestamp") {
    return timestamp
  } else if (props.valueFormat == "YYYY-MM-DD") {
    return timestamp.getFullYear() + "-" + timestamp.getMonth() + "-" + timestamp.getDate()
  } else {
    return timestamp
  }
}




const emit = defineEmits({
  "update:modelValue": (args: Date | string) => args
})


const chooseDate = (year, month, date) => {
  emit("update:modelValue", formatTimebyValueFormat({ year, month, date }));
  setActiveDays(date)
}


function setMonth(month) {
  return new Date(month).getMonth() || 12;
}

const isToday = (date) => {
  const now = new Date();
  return now.getFullYear() == years.value && now.getMonth() + 1 == months.value && now.getDate() == date
};
const isRange = (date) => {
  return activeRange.value.includes(date);
};

const isActive = (date) => {
  return rangeArr.includes(date);
};
// TODO DISABLED 状态 ，选中的时候
const isDisabled = (date) => {

}



const activeRange = ref<number[]>([]);

const rangeArr: any[] = [];
const setActiveDays = (date) => {
  if (!rangeArr.length) {
    rangeArr.push(date)
  } else if (rangeArr.length == 1) {
    if (rangeArr.at(0)! > date) {
      rangeArr.unshift(date)
    } else {
      rangeArr.push(date)
    }
  } else {
    // 如果已经有两个参数了
    // 1. 当前值比最小值小
    // 2. 最大值比当前值小
    // 3. 处于两者中间 arr.pop() 
    if (rangeArr.at(0)! > date) {
      rangeArr.shift()
      rangeArr.unshift(date)
    } else {
      rangeArr.pop()
      rangeArr.push(date)
    }
  };
  activeRange.value = []
  if (rangeArr.length >= 1) {
    for (let i = rangeArr.at(0)!; i <= rangeArr.at(1)!; i++) {
      activeRange.value.push(i as number)
    }
  }
}


const cteateDate = computed(() => {
  const time = new Date(years.value, months.value);
  return time
})

function formatUserTime() {
  let time = props.modelValue;
  if (typeof time == "string") {
    time = new Date(time);
  }
  return {
    years: time.getFullYear(),
    months: time.getMonth(),
  }
}

const years = ref(formatUserTime().years)
const months = ref(formatUserTime().months)



let timeArr: number[] = []
const ONE_DAY_TIME = 24 * 60 * 60 * 1000;

let dates = computed(() => {
  timeArr = []
  let times = cteateDate.value;
  let year = times.getFullYear()
  // 找这个月的第一天是周几
  let currentMonth = times.getMonth();
  let currentMonthFirstDate = new Date(year, currentMonth - 1, 1);
  // 当前月有多少天
  let currentMonthHasDays = new Date(year, currentMonth, 0).getDate();

  let currentMonthFirstDay = currentMonthFirstDate.getDay();
  // 把上个月的最后几号放入；
  let lastTime = currentMonthFirstDate.getTime() - currentMonthFirstDay * ONE_DAY_TIME
  let lastMonthLastDay = new Date(lastTime).getDate(); // 26;


  for (let i = 0; i < currentMonthFirstDay; i++) {
    timeArr.push(i + lastMonthLastDay)
  }
  for (let i = 1; i <= currentMonthHasDays; i++) {
    timeArr.push(i)
  }
  // 这个月的最后一天是周几
  const currentMonthLastDay = new Date(year, currentMonth - 1, currentMonthHasDays).getDay();
  for (let i = 1; i < 7 - currentMonthLastDay; i++) {
    timeArr.push(i)
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
    @apply flex justify-center items-center py-2;

    .week {
      @apply flex-1 text-red-400 text-center text-lg
    }
  }

  .content {
    @apply flex items-end flex-wrap;

    .date {
      @apply text-center inline-block text-lg py-2 w-[100px] cursor-pointer rounded-md;

      &:hover {
        @apply bg-blue-400 text-white text-lg rounded-full;
      }

      &.isToday {
        @apply bg-red-400
      }



      &.isRange {
        @apply rounded-none bg-gray-200;

      }

      &.isActive {
        @apply bg-green-400 text-white text-lg rounded-full;

        &:is(.isRange) {
          @apply rounded-r-none;
        }

        &~.isActive {
          @apply rounded-r-full rounded-l-none;
        }

      }
    }

    // .isActive.isRange {
    //   @apply rounded-r-none;
    // }
  }
}
</style>
