<template>
  <div class="container">
    <div class="row">
      <button class="btn btn-add" @click="add">增加</button>
      <button class="btn btn-shuffle" @click="shuffle">乱序</button>
      <button class="btn btn-reset" @click="reset">重置</button>
    </div>
    <ul>
      <li v-for="(item, index) of itemsRef" :key="item.id" :liItem="'item' + item.id" class="list-item" :ref="setLiRefs">
        <div><span class="emoij">{{ item.emoji }} </span> <span> {{ item.name }} </span></div>
        <div class="action">
          <div class="icon" @click="addOne(index)">+</div>
          <div class="icon" @click="minusOne(item)">-</div>
          <div class="icon" @click="up(item)">↑</div>
          <div class="icon" @click="stickTop(item)">⇪</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, nextTick } from "vue";
import Mock, { mockOption } from "mockjs";
import { shuffle as shuffleArr } from "./utils"
import { emojis } from "./mock"
interface IMock extends Pick<mockOption, "name" | "id"> {
  emoji: string
}
interface INode extends HTMLLIElement {
  attributes: { liItem: { value: number } } & HTMLLIElement['attributes']
}


const add = () => {
  scheduleAnimation(() => {
    itemsRef.value.unshift(createMock())
  })
}

const shuffle = () => {
  scheduleAnimation(() => {
    itemsRef.value = shuffleArr(itemsRef.value);
  });
}

const addOne = (idx: number) => {
  scheduleAnimation(() => {
    itemsRef.value.splice(idx + 1, 0, createMock())
  })
}

const up = (emoji: IMock) => {
  scheduleAnimation(() => {
    const idx = itemsRef.value.findIndex(item => item == emoji)

    if (!idx) return;
    // 从上一项开始删除两个
    itemsRef.value.splice(idx - 1, 2, itemsRef.value[idx], itemsRef.value[idx - 1])
  })

}

const stickTop = emoji => {
  scheduleAnimation(() => {
    const idx = itemsRef.value.findIndex(item => item == emoji)
    itemsRef.value.splice(idx, 1)
    itemsRef.value.unshift(emoji)
  })
}

const minusOne = (emoji: IMock) => {
  scheduleAnimation(() => {
    itemsRef.value.splice(itemsRef.value.findIndex(item => item == emoji), 1)
  })
}

const reset = () => {
  itemsRef.value = [createMock()]
}


let id = 0;

function createMock() {
  id = (++id) % emojis.length;
  return {
    ...Mock.mock({
      name: "@name",
      id: "@increment(0)"
    }),
    emoji: emojis[id]
  }
}
// 初始化数据
const itemsRef = ref<IMock[]>([createMock()])



async function scheduleAnimation(update: Function) {
  const prev = Array.from(liRefs.value);
  const prevRectMap = recordPosition(prev);
  update()
  await nextTick();
  const currentRectMap = recordPosition(prev);

  Object.keys(prevRectMap).forEach(node => {
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

    currentRect.node.animate(keyframes, options)
  })
}

// 记录
function recordPosition(nodes: INode[]) {
  return nodes.reduce((prev, node) => {
    const rect = node.getBoundingClientRect();
    const { left, top } = rect;
    if (node.attributes.liItem.value) {
      prev[node.attributes.liItem.value] = { left, top, node };
    }
    return prev;
  }, [] as any);
}


const liRefs = ref<INode[]>([])
const setLiRefs = el => {
  el && liRefs.value.push(el)
}


</script>
<style lang="scss" scoped>
.row {
  @apply mt-4
}


.list-item {
  @apply bg-blue-300 p-4 rounded-md justify-between text-white flex items-center mt-4 shadow-md font-bold transition cursor-pointer;

  .emoij {
    @apply mr-4
  }

  &:hover {
    @apply shadow-xl drop-shadow
  }

  .action {
    @apply flex gap-2;

    .icon {
      @apply p-2 w-[40px] rounded-md select-none text-lg aspect-square bg-green-400 text-white flex items-center justify-center;

      &:hover {
        @apply shadow-xl drop-shadow bg-green-600
      }
    }
  }
}

.btn {
  @apply py-1 px-2 rounded-md text-white mx-2;

  &-add {
    @apply bg-orange-400;
  }

  &-reset {
    @apply bg-red-400
  }

  &-shuffle {
    @apply bg-blue-400
  }
}
</style>
