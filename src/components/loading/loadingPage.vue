<template>
  <Transition :on-after-leave="handleAfterLeave">
    <div class="mask" v-if="visible">
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
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue';

defineProps({
  visible: Boolean,
  handleAfterLeave: {
    type: Function as PropType<(el: Element) => {}>,
  }
})
const baGuaContainerStyle = computed(() => {
  return {
    width: '100px',
    height: '100px',
    "animation-duration": '10s'
  }
})
</script>

<style lang="scss">
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(122, 122, 122, 0.8);
  color: white;
  font-size: 14px;
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
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>