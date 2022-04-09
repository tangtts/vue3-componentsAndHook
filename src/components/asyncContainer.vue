<template>
  <div>
    <el-button @click="show = !show">展示</el-button>
    <async-com ref="async" />
    <button @click="count++" ref="countRef">{{ count }}</button>
    <async-com2 v-if="show" />
    <Suspense>
      <template #fallback>
        <div>loading....</div>
      </template>
    </Suspense>

    <div class="grid">
      <aside></aside>
      <main></main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver, MaybeRef } from "@vueuse/core";
import {
  defineAsyncComponent,
  ref,
  nextTick,
  unref,
  watch,
  defineComponent,
} from "vue";
import AsyncCom from "./asyncComp.vue";
type VueInstance = InstanceType<ReturnType<typeof defineComponent>>;
type MaybeElementRef = MaybeRef<Element | VueInstance | undefined | null>;
const AsyncCom2 = defineAsyncComponent(() => {
  return import("./asyncComp2.vue");
});

let show = ref(false);
const async = ref(null);
const count = ref(10);

function unrefElement(elRef: MaybeElementRef) {
  const plain = unref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}

let countRef = ref(null);

watch(
  () => ({
    el: unrefElement(async),
  }),
  ({ el }) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
      }
    );
    observer.observe(el);
  }
);

const targetIsVisible = ref(false);
</script>

<style lang="scss" scoped>
.grid {
  height: 500px;
  background-color: red;
  display: grid;
  min-width: 300px;
  grid-template-areas:
    "aside main main"
    "aside main main"
    "aside main main";
  aside {
    grid-area: aside;
    // background-color: aqua;
  }
  main {
    grid-area: main;
    background-color: yellow;
  }
  @media screen and (max-width: 900px) {
  .grid {
    background-color: bisque;
    grid-template-areas:
      "aside aside aside"
      "main main main"
      "main main main";
  }
}
}


</style>
