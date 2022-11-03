
<template>
  <div class="item"
        @drop.prevent="dragFile" 
        @dragleave.prevent 
        @dragover.prevent>
    <span>+</span>
  </div>
</template>

<script lang="ts" setup>
const emitter = defineEmits(["file"])
const dragFile = (e: DragEvent) => {
  emitter("file", Array.from(e.dataTransfer!.files))
}

</script>
<style lang="scss" scoped>
.item {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border: 1px dashed red;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-size: 50px;
  }
}
</style>