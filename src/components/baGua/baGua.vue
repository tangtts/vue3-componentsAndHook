
<template>
  <div id="wrapper">
    <div id="baGuaContainer" :style="baGuaContainerStyle">
      <div class="left"></div>
      <div class="right"></div>
      <div class="left-top"></div>
      <div class="right-bottom"></div>
      <div class="inner-white-ball"></div>
      <div class="inner-black-ball"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { PropType, StyleValue, ref, computed, toRaw, toRef, toRefs } from 'vue';

const props = defineProps({
  size: {
    type: [Number, String],
    default: 400
  },
  animationSpeed: {
    type: String as PropType<`${string}s`>,
    default: '10s'
  }
})


const addUnit = (str: string | number, unit = 'px') => {
  if (Number.isNaN(str)) {
    return str
  }
  return str + unit
}

const baGuaContainerStyle = computed(() => {
  return {
    width: addUnit(props.size),
    height: addUnit(props.size),
    "animation-duration": props.animationSpeed
  }
})




</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #eeeeee;
}


#baGuaContainer {
  border-radius: 200px;
  position: relative;
  overflow: hidden;
  animation: x 10s linear infinite;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);

  .left,
  .right {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0;
    background-color: black;
  }

  .right {
    right: 0;
    left: 100%;
    background-color: white;
  }

  .left-top,
  .right-bottom {
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    margin-left: -25%;
    border-radius: 50%;
    background-color: black;
  }

  .right-bottom {
    top: 50%;
    background-color: white;
  }

  .inner-white-ball,
  .inner-black-ball {
    width: 20%;
    height: 20%;
    position: absolute;
    left: 50%;
    top: 15%;
    margin-left: -10%;
    border-radius: 50%;
    background-color: white;
  }

  .inner-black-ball {
    top: auto;
    left: 60%;
    bottom: 15%;
    background-color: black;
  }
}

@keyframes x {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#wrapper {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
