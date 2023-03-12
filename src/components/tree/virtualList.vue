<template>
  <div>
    <div class="wrapper" ref="wrapper" @scroll=handleScroll>
        <div 
        class="scrollBar"
          ref="scrollBar"></div>
        <div
          :style="{
            transform: `translateY(${state.offset}px)`
          }"
        >
        <div v-for="(node,index) of data" :key="index">
          <slot :node="node"></slot>
        </div>
          
        </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted,ref, computed, reactive, watch } from "vue";
import { TreeNode } from "./types";

const props = defineProps({
 
    size: {
      type: Number,
      default: 0
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array<TreeNode>,
      default: () => []
    }
})

const wrapper = ref<HTMLElement>();
    const scrollBar = ref<HTMLElement>();
    let state = reactive({
      start: 0,
      end: props.remain,
      offset: 0
    });

    // 可以预留的条数
    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    });

    const next = computed(() => {
      return Math.min(props.items.length - state.end, props.remain)
    });

    let data = computed(() => {
      const start = state.start - prev.value;
      const end = state.end + next.value;
      return props.items.slice(start, end)
    })
    
    function handleScroll() {
      state.start = Math.floor(wrapper.value!.scrollTop / props.size);
      state.end = state.start + props.remain;
      state.offset = state.start * props.size - prev.value * props.size;
    }
    watch(() => props.items, () => {
      // scrollBar.value!.style.height = props.items.length * props.size + 'px';
    })
    onMounted(() => {
      // scrollBar.value!.style.height = props.items.length * props.size + 'px';
      wrapper.value!.style.height = props.remain * props.size + 'px';
    })
</script>


<style lang="scss" scoped>
.wrapper{
  @apply overflow-y-scroll relative;
  .scrollBar{
    @apply absolute w-4 right-0 bg-red-500;
    .content{
      @apply absolute top-0 w-full
    }
  }
      }
</style>
