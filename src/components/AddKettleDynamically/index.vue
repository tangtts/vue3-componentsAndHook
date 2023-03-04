<template>
  <div class="flex-col  flex-center bg" style="height:800px;">
    <div class="title">喝水目标:{{ totalCup }} ml</div>

    <div class="container">
      <div class="remind" :style="computedStyle">
        <span class="cup-container">还剩:{{ last }}ml</span>
      </div>
      <div v-if="percent !== 0" class="drank">喝了{{ percent }}%</div>
    </div>

    <h3 class="now">目前为止喝了几杯</h3>
    <div>
      <div class="gridContainer">
        <div :class="['cup', { 'active': cup <= activeCupIndex }]" @click="chooseCup(cup)" v-for="cup of cups" :key="cup">
          {{ oneCup }} ml </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, CSSProperties } from "vue";
const cups = ref(8)
const oneCup = 250;
const totalCup = 2000;
// 选择的容量
const choosenCups = ref(0);
const activeCupIndex = ref(-1)
const chooseCup = (idx: number) => {
  activeCupIndex.value = idx;
  choosenCups.value = oneCup * idx;
}
const percent = computed(() => {
  return choosenCups.value / totalCup * 100
});

const last = computed(() => {
  return totalCup - choosenCups.value
});


const computedStyle = computed<CSSProperties>(() => {
  console.log(percent.value)
  return {
    height: (100 - percent.value) + '%',
  }
})
</script>
  
<style lang="scss" scoped>
.title {
  @apply mb-4 text-2xl text-white space-x-4
}

.now {
  @apply text-white text-xl my-3 mt-10 mb-4
}

.flex-col {
  flex-direction: column;
}

.drank {
  @apply percent flex-1
}

.bg {
  background: linear-gradient(12deg, #2396ef, #4470ef);
}

.flex-center {
  @apply justify-center items-center flex;
}

.gridContainer {
  @apply grid-cols-4 grid-rows-2 grid gap-[10px];
}

.container {
  @apply bg-white text-blue-200 overflow-hidden w-[150px] h-[350px] flex-col;
  @extend .outside, .flex-center;

}

.outside {
  @apply border-4 border-blue-900 rounded-b-[20px]
}


.percent,
.remind {
  @apply text-blue-500 bg-blue-100 text-lg w-full;
  @extend .flex-center;
  transition: all 0.3s linear;
}

.remind {
  @apply text-red-500 bg-red-200;
}

.cup {
  @extend .flex-center;
  @apply text-center bg-white cursor-pointer text-blue-400 w-[50px] h-[100px] mx-2;
  @extend .outside;
  transition: all 0.3s linear;
}

.cup.active {
  @apply text-white bg-blue-400;
}
</style>
 