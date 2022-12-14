# clickOutside
> 点击元素内部/外部执行不同的操作
> 主要是利用了 `e.composedPath().includes(el)` 判断是否在里面

# Docs

  <div>
    <clickOutside></clickOutside>
  </div>

<script setup>
import clickOutside from "../../../src/components/clickOutside/index.vue"
</script>

# Source

<details>
<summary>展开查看</summary>

```ts
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
  ```

</details>