import { createApp, DirectiveBinding, ObjectDirective, ref } from "vue";
import maskComponent from "./loadingPage.vue";


export type LoadingOptionsResolved = {
  visible: boolean
  target: HTMLElement
  closed?: () => void
  /**
   *
   * @type {string} 后面加上
   */
  background?:string
  text?:string | undefined
}

export type LoadingOptions = Omit<LoadingOptionsResolved, 'closed'> 

export type LoadingBinding = boolean

type LoadingInstance = ReturnType<typeof createLoadingComponent>
const INSTANCE_KEY = Symbol('ElLoading')



interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
  }
}

function createLoadingComponent(options: LoadingOptionsResolved) {

  let afterLeaveTimer: number;
  const visible = ref(true);

  // 生成实例，同时传参
  const loadingInstance = createApp(maskComponent, {
    visible: visible.value,
    handleAfterLeave: close
  });

  const vm = loadingInstance.mount(document.createElement('div'));

  // 销毁实例
  function destroySelf() {
    vm.$el?.parentNode?.removeChild(vm.$el);
    loadingInstance.unmount()
  }

  function close() {
    clearTimeout(afterLeaveTimer)
    afterLeaveTimer = window.setTimeout(destroySelf, 400)
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

export function loading(options: LoadingOptions): LoadingInstance {
  const instance = createLoadingComponent({
    ...options,
    closed: () => { },
  });
  options.target.appendChild(instance.$el);

  return instance
}


function createInstance(el: ElementLoading, binding: DirectiveBinding<LoadingBinding>) {
  const options: LoadingOptions = {
    visible: binding.value,
    target: el
  }
  el[INSTANCE_KEY] = {
    instance: loading(options),
  }
}


export const vMyLoading: ObjectDirective<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY];
    // 如果有值，并且是 false 
    if (binding.value) {
      createInstance(el, binding)
    } else {
      instance?.instance.close()
    }
  }

}