
<template>
  <div class="outer" v-click-outside="close">

    <p> isOutSide:{{ position.isOutSide }}</p>
    <p> x:{{ position.x }}</p>
    <p> y:{{ position.y }}</p>

  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import { ObjectDirective, FunctionDirective } from "vue"
const position = reactive({
  isOutSide: false,
  x: 0,
  y: 0
})
const vClickOutside: FunctionDirective<HTMLElement, Function> = function (el, bindings) {
  window.addEventListener('click', e => {
    if (e.composedPath().includes(el)) {
      console.log("点击的里面")
      position.isOutSide = true;

      bindings.value(e)
    } else {
      position.isOutSide = false;
      console.log("点击的外面")
    }
    position.x = e.x;
    position.y = e.y;
  })
}

const close = (e: MouseEvent) => {
  console.log('执行回调函数', e)
}
</script>

<style lang="scss" scoped>
.outer {
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  background-color: #44bd87;
  color: white;
}
</style>
