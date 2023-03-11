# 无限滚动

滚动至底部时，滚动加载更多数据。
仿照[`element-plus`](https://github.com/element-plus/element-plus/blob/125f5f46500110a67f0217df8d82c8a679eb45a9/packages/components/infinite-scroll/src/index.ts#L68)实现
## 虚拟滚动的主要原理

1. 找到父级元素 container 有 overflow 为 auto 或者 scroll
2. 如果有 immediate，使用`new MutationObserver` 监听<textHighlight>绑定的元素（el）</textHighlight>
3. `MutationObserver`监听是否触底，如果没有触底行为则执行<textHighlight type="success">v-infinite-scroll 绑定的函数(load)</textHighlight>执行`load`函数则会填充列表，只要监听到触底行为，就`MutationObserver` 立即停止监听，<textHighlight>初始化填充完毕</textHighlight>
4. 后续的话通过触发`container` 的滚动事件,不断执行`load` 方法即可

---

# 基础用法

>

<infiniteScroll></infiniteScroll>

<script  setup>
  import infiniteScroll from "../../../src/components/infiniteScroll/index.vue" 
</script>

<details>

<summary>展开查看</summary>

```vue
<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul
      v-infinite-scroll="load"
      class="list"
      :infinite-scroll-disabled="disabled"
    >
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="noMore">No more</p>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const count = ref(10);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
</script>
```

</details>
				
# 属性

|        属性名        |                          说明                          |   类型   | 可选值 | 默认值 |
| :------------------: | :----------------------------------------------------: | :------: | :----: | :----: |
|  v-infinite-scroll   |               滚动到底部时，加载更多数据               | function |   --   |   --   |
|   v-infinite-delay   |                  节流时延，单位为 ms                   |  number  |   --   |  200   |
| v-infinite-distance  |             触发加载的距离阈值，单位为 px              |  number  |   --   |   0    |
| v-infinite-immediate | 是否立即执行加载方法，以防初始状态下内容无法撑满容器。 | boolean  |   --   |  true  |

# Source

<details>

<summary>展开查看</summary>

```vue
<template>
  <div class="outer">
    <ul
      class="list"
      :infinite-scroll-delay="300"
      :infinite-scroll-distance="20"
      :infinite-scroll-immediate="true"
      :infinite-scroll-disabled="disabled"
      v-infinite-scroll="load"
    >
      <li v-for="i in count" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading" class="tip">加载中...</p>
    <p v-if="noMore" class="tip">没有更多了</p>
  </div>
</template>
<script setup lang="ts">
import { computed, DirectiveBinding, nextTick, ref, VNode, watch } from "vue";
import type { ObjectDirective, ComponentPublicInstance } from "vue";

let count = ref(2),
  loading = ref(false);
const noMore = computed(() => {
  return count.value >= 20;
});
/**
 * 0. 设置默认值
 * 1. 获取元素身上的属性
 * 1. 找到父级元素container 有 overflow 为 auto 或者 scroll
 * 2. 如果有 immediate，那么就立即充满高度，handleScroll
 * 3. 当container 发生滚动的时候，handleScroll 执行节流函数，时间为 delay
 * 4. handleScroll 判断是否触底，如果 el.scrollTop + el.offsetHeight + distance 的高度是否小于 scrollHeight
 * 5. 如果已经 等于，需要把 scroll 解绑
 * 6. 如果没有，需要执行 load 函数
 * 7. 监听 disabled 的变化，如果为 true，解绑
 */

type infinite<S = string> = S extends `infinite-scroll-${infer P}` ? P : S;

type TypeDefaultOption = Record<`infinite-scroll-${string}`, any>;

type defaultOptionKey<T> = {
  [K in keyof T as infinite<K>]: T[K];
};
let defaultOption = {
  delay: 500,
  immediate: true,
  disabled: false,
  distance: 0,
};

function getScrollOptions(
  el: HTMLElement,
  instance: ComponentPublicInstance
): defaultOptionKey<TypeDefaultOption> {
  return Object.keys(defaultOption).reduce((map, key) => {
    // 去除 infinite-scroll-
    const attrVal = el.getAttribute(`infinite-scroll-${key}`) || "";
    let value = instance[attrVal] ?? attrVal ?? defaultOption[key];
    value = value === "false" ? false : value;

    map[key] = value ?? defaultOption[`${key}`];
    return map;
  }, {});
}

function getOverScrollEle(el: HTMLElement) {
  let reg = /(scroll)|(auto)/g;
  while (el != document.documentElement) {
    let overflow = getComputedStyle(el).overflow;
    if (reg.test(overflow)) {
      return el;
    } else {
      if (el.parentElement) {
        el = el.parentElement;
      } else {
        el = document.documentElement;
        return;
      }
    }
  }
}

function throttle(fn, delay = 200) {
  let timer: null | NodeJS.Timeout = null;
  let flag = true;
  return () => {
    if (!flag) return;
    flag = false;
    const args = arguments;
    timer = setTimeout(() => {
      flag = true;
      clearTimeout(timer!);
      fn.apply(window, args);
    }, delay);
  };
}

const SCOPE = "infinite-scroll";

type InfiniteScrollCallback = () => void;

type InfiniteScrollEl = HTMLElement & {
  [SCOPE]: {
    container: HTMLElement;
    instance: ComponentPublicInstance;
    delay: number; // export for test
    cb: InfiniteScrollCallback;
    onScroll: () => void;
    observer?: MutationObserver;
  };
};

// el.scrollTop + el.offsetHeight + distance
function handleScroll(el: InfiniteScrollEl, fn: InfiniteScrollCallback) {
  const { instance, observer, container } = el[SCOPE];
  const { disabled, distance } = getScrollOptions(el, instance);
  // // 说明没有触动
  if (disabled) return;
  if (
    container.scrollTop + container.clientHeight + Number(distance) >=
    container.scrollHeight
  ) {
    fn();
  } else {
    if (observer) {
      (observer as MutationObserver).disconnect();
      delete el[SCOPE].observer;
    }
  }
}

const vInfiniteScroll: ObjectDirective<
  InfiniteScrollEl,
  InfiniteScrollCallback
> = {
  async mounted(el, bindings) {
    const { instance, value: cb } = bindings;
    await nextTick();
    let { delay, immediate } = getScrollOptions(el, instance!);
    let container = getOverScrollEle(el);
    if (!container) return;
    let onScroll = handleScroll.bind(null, el, cb);

    if (!instance) return;
    el[SCOPE] = {
      container,
      onScroll,
      instance,
      delay,
      cb,
    };
    if (immediate) {
      let observe = new MutationObserver(onScroll);
      el[SCOPE].observer = observe;
      // subtree 可选
      // 当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target
      observe.observe(container, {
        childList: true, // 儿子节点
        subtree: true, // 儿子的儿子
      });
      onScroll();
    }
    container?.addEventListener(
      "scroll",
      throttle(onScroll.bind(null, el, instance), delay)
    );
  },
  unmounted(el) {
    const { onScroll, container } = el[SCOPE];
    if (container) {
      container.removeEventListener("scroll", onScroll);
      el[SCOPE].observer?.disconnect();
      delete el[SCOPE].observer;
    }
  },
};

const disabled = computed(() => {
  return loading.value || noMore.value;
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 1000);
};
</script>
<style lang="scss" scoped>
.outer {
  @apply overflow-auto h-[500px] bg-blue-200 w-full rounded-md;

  .list {
    @apply list-none p-0 m-0;

    li {
      @apply h-[80px] mb-2 bg-green-400 text-white font-bold flex cursor-pointer rounded-md justify-center items-center;
    }
  }

  .tip {
    @apply text-gray-700 text-center m-2 font-bold;
  }
}
</style>
```

</details>
