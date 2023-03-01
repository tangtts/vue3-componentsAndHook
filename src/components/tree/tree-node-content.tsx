import { defineComponent, inject, h } from "vue"
import { injectKey, treeNodeContentProps } from './types'
export default defineComponent({
  name: 'treeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(injectKey)!
    const node = props.node;
    return () => {
      return treeContext.slots.default ?
        treeContext.slots.default({ node })
        : node?.label
    }
  }
})