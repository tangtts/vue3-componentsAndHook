
import { CSSProperties, defineComponent, h, PropType, render } from "vue"

const base = function (props, { slots }) {
  const { type } = props;
  let style: CSSProperties = {
    color: 'red',
    fontWeight: "bold"
  };
  switch (type) {
    case 'danger':
      style.color = "#ed4e4e"
      break;
    case 'success':
      style.color = "green"
      break;
    case 'primary':
      style.color = "#116fe9"
      break;
  }
  return h('span', { style }, slots)
}


const red = function (props, { slots }) {
  return base({ type: "danger" }, { slots: slots.default() || '' })
}

const green = function (props, { slots }) {
  return base({ type: "success" }, { slots: slots.default() || '' })
}

const blue = function (props, { slots }) {
  return base({ type: "primary" }, { slots: slots.default() || '' })
}

export {
  red,
  green,
  blue
}
