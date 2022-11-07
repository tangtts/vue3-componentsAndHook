<template>

  <div v-my-loading="isLoading" id="loading" style="width:100px;height:100px;background:red;position: relative;">

  </div>
  <!-- <el-table v-my-loading="loading" :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table> -->

</template>
<script lang="ts" setup>import { createApp, DirectiveBinding, nextTick, ObjectDirective, reactive, ref, toRefs } from 'vue';
import type { LoadingOptions, LoadingOptionsResolved, LoadingBinding } from "./type"
import maskComponent from "./loading.vue"
import { toRaw, toRef } from '@vue/reactivity';
import { bind } from 'lodash';
type LoadingInstance = ReturnType<typeof createLoadingComponent>
const INSTANCE_KEY = Symbol('ElLoading')
interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

const isLoading = ref(true);
setTimeout(() => {
  isLoading.value = false
}, 2000)
const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District',
  },
]

function createLoadingComponent(options: LoadingOptionsResolved) {

  let afterLeaveTimer: number;


  const visible = ref(true);

  const loadingInstance = createApp(maskComponent, {
    visible: visible.value,
  });

  const vm = loadingInstance.mount(document.createElement('div'));

  function destroySelf() {
    vm.$el?.parentNode?.removeChild(vm.$el);
    loadingInstance.unmount()
  }
  function close() {
    clearTimeout(afterLeaveTimer)
    afterLeaveTimer = window.setTimeout(destroySelf, 400)
    visible.value = false
    options.closed?.()
  }

  return {
    visible,
    close,
    vm,
    get $el(): HTMLElement {
      return vm.$el
    },
  }
}


function isString(v): v is String {
  return typeof v == "string"
}
const resolveOptions = (options: LoadingOptions): LoadingOptionsResolved => {

  let target: HTMLElement
  if (isString(options.target)) {
    target =
      document.querySelector<HTMLElement>(options.target) ?? document.body
  } else {
    target = options.target || document.body
  }

  return {
    parent: target === document.body ? document.body : target,
    background: options.background || '',

    text: options.text || '',
    visible: options.visible ?? true,
    target,
  }
}

function loading(options: LoadingOptions = {}): LoadingInstance {

  const resolved = resolveOptions(options)

  const instance = createLoadingComponent({
    ...resolved,
    closed: () => { },
  });

  resolved.parent.appendChild(instance.$el);

  return instance
}


function createInstance(el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) {
  const vm = binding.instance

  const options: LoadingOptions = {
    target: el,
  }

  el[INSTANCE_KEY] = {
    options,
    instance: loading(options),
  }
}



const vMyLoading: ObjectDirective<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    if (!binding.value) {
      instance?.instance.close()
    } else {
      createInstance(el, binding)
    }
  }

}


</script>