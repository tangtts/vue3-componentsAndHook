<template>
  <div class="container">
    <div class="action">
      <baseButton @click="changePage('picFlip')"> 图片动画</baseButton>
      <baseButton type="success" @click="changePage('cardListFlip')"> card 动画</baseButton>
      <baseButton type="danger" @click="changePage('itemsListFlip')"> 列表动画</baseButton>
      <p class="tip">当前页面: <span class="name"> {{ PageName }} </span></p>
    </div>

    <TransitionGroup mode="out-in">
      <!-- <component :is="radio" /> -->
      <picFlip v-show="whichPageShow.picFlip" key="picFlip" />
      <cardListFlip v-show="whichPageShow.cardListFlip" key="cardListFlip" />
      <itemsListFlip v-show="whichPageShow.itemsListFlip" key="itemsListFlip" />
    </TransitionGroup>
  </div>
</template>
<script lang="ts" setup>
import picFlip from "./pic.vue"
import cardListFlip from "./cardList.vue"
import itemsListFlip from "./liList.vue";
import baseButton from "../base/button/index.vue"
import { onMounted, ref, computed, reactive, watch, Transition } from "vue";

type PageName = "picFlip" | 'cardListFlip' | 'itemsListFlip'

const radio = ref('picFlip')
const whichPageShow = reactive<Record<PageName, boolean>>({
  picFlip: true,
  cardListFlip: false,
  itemsListFlip: false
})
const changePage = (PageName: PageName) => {
  radio.value = PageName
  for (const key in whichPageShow) {
    if (key == PageName) {
      whichPageShow[key] = true
    } else {
      whichPageShow[key] = false
    }
  }
}
const PageName = computed(() => {
  return whichPageShow.picFlip ? '图片动画' : whichPageShow.cardListFlip ? 'card 动画' : '列表动画'
})

</script>
<style lang="scss" scoped>
.container {
  @apply my-8
}

.action {
  @apply space-x-4 border-solid border-blue-400 p-2 bg-slate-100 rounded-md;

  .tip {
    @apply inline-block font-bold text-gray-600;

    .name {
      @apply text-blue-500 font-bold border-2 border-blue-300 p-2 bg-white rounded-md cursor-pointer border-solid;

      &:hover {
        @apply bg-blue-500 text-white border-white
      }
    }
  }

}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0
}
</style>
