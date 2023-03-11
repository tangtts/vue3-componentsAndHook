
import { defineComponent, h, PropType } from "vue"



export default defineComponent({
  props: {
    type: {
      type: String as PropType<'danger' | 'success' | 'info' | "primary">,
      default: 'info'
    },
  },
  render(props, { slot }) {
    const { type } = props;
    let style = {
      color: 'red'
    }
    switch (type) {
      case 'danger':
        style.color = "red"
        break;
      case 'success':
        style.color = "green"
        break;
      case 'primary':
        style.color = "blue"
        break;
    }
    // @ts-expect-error
    return h('span', { style }, this.$slots.default() || '')
  }
})