<template>
  <!-- 视口 -->
  <div class="viewport" ref="viewport" @scroll="handleScroll">
    <!-- 滚动条 -->
    <div class="scroll-bar" ref="scrollBar"></div>
    <!-- 真实位置 -->
    <div class="scroll-list" :style="{top:offset+'px'}">
      <div v-for="(item,index) in visiableData" :index="item.id" :vid="item.id" ref="itemsRefNode">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, PropType, reactive, ref } from 'vue';
import { Item } from './index.vue';


const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    default: () => []
  },
  // 每一个 item 的高度
  size: {
    type: Number,
    default: 40
  },
  // 预留item个数
  remain: {
    type: Number,
    default: 0
  },
  // 是否高度可变
  variable: {
    type: Boolean,
    default: false
  }
})
const start = ref(0)
const end = ref(props.remain)
const offset = ref(0)


const visiableData = computed(() => {
  // 增大预留面积
  // 把 start 值 往前 提
  // end 值往后移动
  let _start = start.value - prevCount.value
  let _end = end.value + nextCount.value

  // return this.items.slice(this.start,this.end)
  return props.items.slice(_start, _end)
})

/**
 * @description 前景预留
 */
const prevCount = computed(() => {
  return Math.min(start.value, props.remain)
})


/**
 * @description 尾部预留
 * @description 如果 传入 的 items 的数量小于 要 预留(remain)的个数，使用 预留个数
 */
const nextCount = computed(() => {
  return Math.min(end.value, props.items.length - end.value)
})

const itemsRefNode = ref<HTMLDivElement[] | null>(null)
const scrollBar = ref<HTMLDivElement | null>(null)

let positions = reactive<any[]>([])

onUpdated(() => {
  nextTick(() => {
    let nodes = itemsRefNode.value

    nodes && nodes?.forEach((node) => {
      let { height } = node.getBoundingClientRect()
      let id = + (node.getAttribute("vid") ?? 0) - 0;

      let oldHeight = positions[id].height;
      let val = oldHeight - height
      if (val) {
        positions[id].height = height
        positions[id].bottom = positions[id].bottom - val // 顶部增加了
        // 后面所有人都需要增加高度
        for (let i = id + 1; i < positions.length; i++) {
          positions[i].top = positions[i - 1].bottom
          positions[i].bottom = positions[i].bottom - val
        }
      }
    })
    scrollBar.value!.style.height = positions[positions.length - 1].bottom + 'px'
  })
})

const getIndex = (value: number) => {

  let start = 0, end = positions.length - 1, temp: null | number = null;

/** 
 * @description 二分法比遍历循环更加高效
 */
  while (start < end) {

    let middleIndex = parseInt(String((start + end) / 2))

    let middleValue = positions[middleIndex].bottom
    if (middleValue == value) {
      return middleIndex
    } else if (middleValue < value) {
      start = middleIndex + 1
    } else {
      /**    
       *  @examle [1,2,5,6,10,20,50] value = 40 ,返回 50 
       *  
       */
      if (temp == null || temp > middleIndex) {
        temp = middleIndex  // 找到范围
      }
      end = middleIndex - 1
    }
  }
  return temp
}

const viewport = ref<HTMLDivElement | null>(null)

const handleScroll = () => {
  let scrollTop = viewport.value!.scrollTop;
  
  if (props.variable) {
    // 滚动的距离，计算需要从哪个 item 开始
    start.value = getIndex(scrollTop) || 0

    end.value = start.value + props.remain;

    offset.value = positions[start.value - prevCount.value] ? positions[start.value - prevCount.value].top : 0;

  } else {

    /**
     * @description 如果不是 变化的高度，开始的 高度
     */
    start.value = Math.floor(scrollTop / props.size)
    end.value = start.value + props.remain;
    // 需要把预留出来的偏移量 减去
    // 因为滚动的时候 start 提前了，会有一段时间重复数据
    offset.value = start.value * props.size - prevCount.value * props.size;
  }
}

const cacheList = () => {
  // 先暂时记录一个 缓存高度数组列表
  positions = props.items.map((item, index) => ({
    height: props.size,
    top: index * props.size,
    bottom: (index + 1) * props.size
  }))
}


onMounted(() => {
  // 视口高度 是  视口的items 个数 * 每一个的高度  大约值
  viewport.value!.style.height = props.remain * props.size + 'px'

  // 设置滚动条的高度，高度，这样才能滚动
  scrollBar.value!.style.height = props.items.length * props.size + 'px'
  cacheList()
})

</script>
<style lang="scss">
.viewport {
  overflow-y: scroll;
  position: relative;
}

.scroll-list {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>