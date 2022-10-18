<template>
  <div>
    <div style="overflow:auto;height: 200px;">
      <ul class="list" :infinite-scroll-delay="300" :infinite-scroll-distance="20" :infinite-scroll-immediate="true"
        v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <li v-for="i in count" class="list-item">{{ i }}</li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ObjectDirective, FunctionDirective } from "vue"

let count = ref(10),
  loading = ref(false)
const noMore = computed(() => {
  return count.value >= 20
})
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

type TypeDefaultOption = Record<`infinite-scroll-${string}`, any>



type defaultOptionKey<T> = {
  [K in keyof T as infinite<K>]: T[K]
}

function getOptions(el: HTMLElement, defaultOption: TypeDefaultOption): defaultOptionKey<TypeDefaultOption> {
  return Object.keys(defaultOption).reduce((map, attr) => {
    // 去除 infinite-scroll-
    let newAttr = attr.slice(16);
    let value = el.getAttribute(`infinite-scroll-${newAttr}`) ?? defaultOption[`infinite-scroll-${newAttr}`];
    map[newAttr] = value
    return map
  }, {})
}
function getOverScrollEle(el: HTMLElement) {
  let reg = /(scroll)|(auto)/g;
  while (el != document.documentElement) {
    let overflow = getComputedStyle(el).overflow
    if (reg.test(overflow)) {
      return el
    } else {
      if (el.parentElement) {
        el = el.parentElement
      } else {
        el = document.documentElement
        return
      }
    }
  }
}



function throttle(fn, delay = 200) {
  let timer: null | NodeJS.Timeout = null
  let flag = true
  return () => {
    if (!flag) return
    flag = false
    const args = arguments
    timer = setTimeout(() => {
      flag = true
      clearTimeout(timer!)
      fn.apply(this, args)
    }, delay)
  }
}

let scope = {
  handleScope: ''
}

let vInfiniteScroll: ObjectDirective & { defaultOption: TypeDefaultOption } = {
  defaultOption: {
    "infinite-scroll-delay": '200',
    "infinite-scroll-immediate": false,
    "infinite-scroll-disabled": false,
    "infinite-scroll-distance": 0,
  },
  mounted(el: HTMLElement, bindings, vnode) {
    let attrMap = getOptions(el, vInfiniteScroll.defaultOption);
    let containter = getOverScrollEle(el) as HTMLElement & { handleScope: Function };

    // TODO 需要立即执行
    if (attrMap.immediate) {

      let observe = new MutationObserver(function (mutationsList, observer) {
        // console.log(mutationsList, observer)
      })
      // subtree 可选
      // 当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target
      observe.observe(containter, {
        childList: true,
        subtree: true
      })
    }
    // el.scrollTop + el.offsetHeight + distance
    function handleScroll(el: HTMLElement, fn: Function) {
      // 说明没有触动
      // let clientHeight = el.getBoundingClientRect().height
      if (el.scrollTop + el.clientHeight + Number(attrMap.distance) >= el.scrollHeight) {
        console.log("触底")
        fn()
      } else {
        console.log(123)
        containter.removeEventListener("scroll", containter[scope.handleScope])
      }
    }
    // 给元素绑定
    containter[scope.handleScope] = handleScroll;
    // TODO watch 没有生效
    watch(() => attrMap.disabled, (newVal) => {
      console.log(newVal, "aadsf")
      containter.removeEventListener("scroll", containter[scope.handleScope])
    })

    // containter?.addEventListener("load",throttle(handleScroll,attrMap.delay).bind(containter,bindings.value))
    containter?.addEventListener("scroll", containter[scope.handleScope].bind(containter, containter, bindings.value))
  },
}

const disabled = computed(() => {
  return loading.value || noMore.value
})

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}
</script>
<style lang="scss">
.list {
  li {
    height: 20px;
    margin: 10px;
    background-color: lightblue;

  }
}
</style>