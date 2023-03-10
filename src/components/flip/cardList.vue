<template>
  <div class="container">
    <div class="action">
      <button class="btn btn-add" @click="add">增加</button>
      <button class="btn btn-shuffle" @click="shuffle">乱序</button>
      <button class="btn btn-delete" @click="delChoose">删除</button>
    </div>
    <div class="row">
      <div v-for="card of cards" :card="'card' + card.id" :key="card.id" class="card" :ref="setCardRef">
        <div class="head" @click="card.status = !card.status">
          <ul>
            <li>name: {{ card.name }}</li>
            <li>email: {{ card.email }}</li>
            <li>address: {{ card.county }}</li>
          </ul>
          <el-checkbox v-model="card.status" />
        </div>
        <div class="content">
          <span>date:{{ card.datetime }}</span> <button @click="del(card)" class="btn btn-delete">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Mock from "mockjs";
import { onMounted, ref, computed, reactive, nextTick, VNode } from "vue";
import { shuffle as shuffleArr } from "./utils"

interface IMock extends Mock.mockOption {
  status: boolean
}

interface INode extends HTMLDivElement {
  attributes: { card: { value: number } } & HTMLDivElement['attributes']
}

function createMock(): IMock {
  let t: Mock.mockOption = {
    name: '@name',
    county: '@county(true)',
    email: '@email',
    id: '@increment(0)',
    datetime: '@datetime',
  }
  return {
    ...Mock.mock(t),
    status: false
  }
}

let m: IMock = createMock()
const cards = ref<IMock[]>([m]);
const cardRefs = ref<INode[]>([])


const add = () => {
  scheduleAnimation(() => {
    cards.value.unshift(createMock())
  })
}
const del = (c: IMock) => {
  scheduleAnimation(() => {
    cards.value = cards.value.filter(card => card != c)
  })
}

const delChoose = () => {
  scheduleAnimation(() => {
    cards.value = cards.value.filter(card => !card.status)
  })
}


const shuffle = () => {
  scheduleAnimation(() => {
    cards.value = shuffleArr(cards.value);
  });
}

async function scheduleAnimation(update: Function) {
  const prev = Array.from(cardRefs.value);
  const prevRectMap = recordPosition(prev);
  update()
  await nextTick();
  // 获取原来数据的
  const currentRectMap = recordPosition(prev);
  Object.keys(prevRectMap).forEach((node) => {
    const currentRect = currentRectMap[node];
    const prevRect = prevRectMap[node];

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
    currentRect.node?.animate(keyframes, options);
  })
}


function recordPosition(nodes: INode[]) {
  return nodes.reduce((prev, node) => {
    const rect = node.getBoundingClientRect();
    const { left, top } = rect;
    prev[node.attributes.card.value] = { left, top, node };
    return prev;
  }, [{} as any]);
}


const setCardRef = (el) => {
  el && cardRefs.value.push(el)
}


</script>

<style lang="scss" scoped>
.action {
  @apply mt-4
}

.row {
  @apply grid grid-cols-4 gap-4 mt-4
}

.card {
  @apply min-h-[180px] bg-blue-50 rounded-md flex shadow-md p-2 drop-shadow flex-col text-blue-400 font-bold transition cursor-pointer;

  &:hover {
    @apply shadow-xl
  }

  .head {
    @apply border-b-2 pb-4 border-gray-200 flex justify-between
  }

  li {
    @apply mt-2 text-orange-400
  }

  .content {
    @apply flex mt-auto justify-between items-center
  }
}

.btn {
  @apply py-1 px-2 rounded-md text-white mx-2;

  &-delete {
    @apply bg-red-400;
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
</style>
