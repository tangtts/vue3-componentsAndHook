<template>
  <div>
    <ul>
      <li :style="compStyle" v-for="(item, index) of itemsRef" :key="item.id" :liItem="'item' + item.id" class="list-item"
        :ref="setLiRefs">
        <div>
          <slot v-if="$slots.default" :item="item" />
          <div v-else>
            <span class="emoij">{{ item.emoji }} </span>
            <span> {{ item.name }} </span>
          </div>
        </div>
        <div class="action">
          <div class="icon" @click="addOne(item)">+</div>
          <div class="icon" @click="minusOne(item)">-</div>
          <div class="icon" @click="up(item)">↑</div>
          <div class="icon" @click="stickTop(item)">⇪</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch, nextTick, CSSProperties } from "vue";
import { checkEmit, listProps } from "./types";
import type { IList } from "./types"

interface INode extends HTMLLIElement {
  attributes: { liItem: { value: number } } & HTMLLIElement['attributes']
}
const props = defineProps(listProps)

const itemsRef = ref(props.modelValue);
let id = 0;
watch(() => props.modelValue, (newVal) => {
  newVal && (itemsRef.value = newVal.map(item => {
    if (!item.id) {
      item.id = id++
    }
    return item
  }))
}, {
  immediate: true
})

const emits = defineEmits(checkEmit);
const addOne = (emoji: IList) => {
  scheduleAnimation(() => {
    const idx = itemsRef.value.findIndex(item => item == emoji)
    itemsRef.value.splice(idx + 1, 0, emoji)
  })
  emits("update:modelValue", itemsRef.value)
}

const up = (emoji: IList) => {
  scheduleAnimation(() => {
    const idx = itemsRef.value.findIndex(item => item == emoji)
    if (!idx) return;
    itemsRef.value.splice(idx - 1, 2, itemsRef.value[idx], itemsRef.value[idx - 1]);
  })
  emits("update:modelValue", itemsRef.value)

}

const stickTop = (emoji: IList) => {
  scheduleAnimation(() => {
    const idx = itemsRef.value.findIndex(item => item == emoji)
    itemsRef.value.splice(idx, 1)
    itemsRef.value.unshift(emoji)
  })
  emits("update:modelValue", itemsRef.value)
}

const minusOne = (emoji) => {
  scheduleAnimation(() => {
    itemsRef.value.splice(itemsRef.value.findIndex(item => item == emoji), 1)
    setTimeout(() => {
      props.minusOne(emoji)
    }, 500)
  })
}

const liRefs = ref<INode[]>([])
const setLiRefs = el => {
  el && liRefs.value.push(el)
}


const compStyle = computed<CSSProperties>(() => {
  if (props.size == "small") {
    return {
      padding: '4px'
    }
  } else if (props.size == "default") {
    return {
      padding: '8px'
    }
  } else {
    return {
      padding: "10px"
    }
  }
})


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
</script>

<style lang="scss" scoped>
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
