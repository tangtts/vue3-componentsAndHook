<template>
  <div>

    <div class="action">
      <button class="btn btn-add" @click="add">
        <span v-show="status.adding">下载中……</span>
        <span v-show="!status.adding">追加图片</span>
      </button>
      <button class="btn btn-shuffle" @click="handleShuffle">乱序图片</button>
      <button class="btn btn-reset" @click="reset">重置</button>
    </div>
    <div v-if="status.loading" class="loading">正在加载图片……</div>

    <div v-else class="wrap">
      <div class="img-wrap" v-for="src in imgs" :key="src">
        <img :ref="setImgRef" class="img" :src="src" />
        <button class="btn btn-delete" @click="deleteItem(src)" style="width: 50px">删除</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, nextTick } from "vue";
import { getSisterGenerator } from "./mock"
import { preload, shuffle } from "./utils";
let initialGetSister = getSisterGenerator();
const imgs = ref<string[]>(initialGetSister())
const status = reactive({
  loading: false,
  adding: false,
})
const initImg = initialGetSister();

async function init() {
  status.loading = true;
  await preload(initImg);
  imgs.value = initImg;
  status.loading = false;
}
init()

const add = async () => {
  if (status.adding) return;
  status.adding = true;
  const newData = initialGetSister();
  await preload(newData);
  status.adding = false;
  scheduleAnimation(() => {
    imgs.value = newData.concat(imgs.value);
  });
}
const handleShuffle = () => {
  scheduleAnimation(() => {
    imgs.value = shuffle(imgs.value);
  });
}
const reset = () => {
  initialGetSister = getSisterGenerator();
  imgs.value = initialGetSister()
}
const deleteItem = (src: string) => {
  scheduleAnimation(() => {
    imgs.value = imgs.value.filter((img) => src != img);
  });
}

async function scheduleAnimation(update: Function) {
  const prevImgs = Array.from(imgRefs.value);
  const prevSrcRectMap = createSrcRectMap(prevImgs);
  update();
  // dom 发生了变化，还没有渲染到视图上？
  await nextTick(); // dom 已经改变但是视图还未发生变化

  const currentSrcRectMap = createSrcRectMap(prevImgs);
  Object.keys(prevSrcRectMap).forEach((src) => {
    const currentRect = currentSrcRectMap[src];
    const prevRect = prevSrcRectMap[src];
    const invert = {
      left: prevRect.left - currentRect.left,
      top: prevRect.top - currentRect.top,
    };

    const keyframes = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      { transform: "translate(0, 0)" },
    ];
    const options = {
      duration: 300,
      easing: "cubic-bezier(0,0,0.32,1)",
    };
    currentRect.img.animate(keyframes, options);
  })
}


const imgRefs = ref<HTMLImageElement[]>([]);

const setImgRef = (el) => {
  if (el) {
    imgRefs.value.push(el)
  }
}

function createSrcRectMap(imgs: HTMLImageElement[]) {
  return imgs.reduce((prev, img) => {
    const rect = img.getBoundingClientRect();
    const { left, top } = rect;
    prev[img.src] = { left, top, img };
    return prev;
  }, {});
}



</script>

<style lang="scss" scoped>
.btn {
  @apply p-2 rounded-md text-white mx-2;

  &-delete {
    @apply bg-red-400 absolute bottom-2 right-0
  }

  &-add {
    @apply bg-orange-400;
  }

  &-reset {
    @apply bg-yellow-400
  }

  &-shuffle {
    @apply bg-blue-400
  }
}

.loading {
  @apply text-center m-4
}

.action {
  @apply text-center m-4
}

.wrap {
  @apply grid grid-cols-4 gap-4;

  .img-wrap {
    @apply relative
  }
}

.img {
  @apply w-full h-[200px] rounded-md object-cover
}
</style>

