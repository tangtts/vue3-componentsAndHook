<template>
  <div>
    <el-button @click="show = !show">展示</el-button>
    
    <async-com ref="async" />
    <button @click="count++" ref="countRef">{{count}}</button>
<async-com2 v-if="show" />
    <Suspense>
      <template #fallback>
        <div>loading....</div>
      </template>
    </Suspense>
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver,MaybeRef } from "@vueuse/core";
import { defineAsyncComponent, ref, nextTick, unref, watch,defineComponent } from "vue";
import AsyncCom from "./asyncComp.vue";
 type VueInstance = InstanceType<ReturnType<typeof defineComponent>>
 type MaybeElementRef = MaybeRef<Element | VueInstance | undefined | null>
const AsyncCom2 = defineAsyncComponent(() => {
  return import("./asyncComp2.vue");
});

let show = ref(false);
const async = ref(null);
const count = ref(10)

function unrefElement(elRef: MaybeElementRef) {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}

let countRef =ref(null)



watch(
  () => ({
    el: unrefElement(async),
  }),
  ({ el }) => {
    if (!el) return;
    console.log(el);
    
    const observer = new IntersectionObserver(
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
        console.log(targetIsVisible);
      } 
    );
    observer.observe(el);
  }
);



const targetIsVisible = ref(false);
// const { stop } = useIntersectionObserver(
//       async,
//       ([{ isIntersecting }], observerElement) => {
//         targetIsVisible.value = isIntersecting
//         console.log(observerElement);
//       },
//     )
</script>
