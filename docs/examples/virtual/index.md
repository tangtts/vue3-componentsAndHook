# 虚拟列表
使用场景 一般是用来渲染长列表，这种一般数据量较大,如果全部渲染完毕会`Dom`数据过大，影响用户体验  
可以使用虚拟列表，滚动至底部时，加载更多数据。
##  虚拟滚动的主要原理 
### 固定高度
1. 用户传递`全部数据Data`,和`remain 可见个数`,和 `size 大约每个item的高度`
2. 外侧容器的高度是<red>remain * size</red>,内部容器的高度是<red>全部数据Data.length * size</red>,所以可以发生滚动
3. 定义`start`,`end` 进行初始化切割，默认`start = 0,end = remain`
4. 页面渲染只要要对<red>全部数据Data.slice(start,end)</red>进行切割即可
5. 当发生滚动的时候，可以计算出<red> start = 滚动的高度 / size`,`end= start + remain</red>,再次进行切割
### 非固定高度
   原理是相似的，都是不断的<red >切割数据</red>，唯一不同的是，需要计算每个item的高度，滚动的时候动态的改变
   start 的值
   

----
::: tip
  能分页还是分页
:::
>

# 基础用法
>
>  

<virtualList></virtualList>

<script  setup>
  import virtualList from "../../../src/components/virtual/index.vue" 
</script>


<details>

<summary>展开查看</summary>

```vue
<template>
 <VirtualList :items="items" :remain="remain" :size="size" :variable="true">
  <template v-slot="{item}">
  <!-- 用户自己item -->
    <UserItem :item="item" />
  </template>
 </VirtualList>
</template>

<script>
import { ref } from 'vue';
import UserItem from "./userItem.vue"
import VirtualList from "./VirtualList.vue"

interface Item {
  id: number,
  value: number
}

const items: Item[] = []

for (let i = 0; i <script 100; i++) {
  items.push({ id: i, value: Math.random() * i })
}

// 可见个数
const remain = ref(8)
//单个 高度
const size = ref(40)

// 每个item 的高度是否一样
const variable = ref(true)
</script>
```
</details>
				
# 属性
|  属性名  |       说明        |  类型   |   可选值   | 默认值 |
| :------: | :---------------: | :-----: | :--------: | :----: |
|  remain  |     预留个数      | number  |     --     |   0    |
|   size   |  单个 item 高度   | number  |     --     |   40   |
| variable | item 高度是否可变 | Boolean | true/false | false  |

# Source

<details>

<summary>展开查看</summary>

```vue
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
```


</details>






