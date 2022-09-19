import { FunctionalComponent as FC, PropType,ref, CSSProperties, h, StyleValue, SetupContext } from 'vue';





function  LongButton<E extends keyof HTMLElementTagNameMap = 'button'>({
  as,
  style,
  ...rest
}:{as:E,style:CSSProperties } & HTMLElementTagNameMap[E]) {
  return <as {...rest}>aaaa</as>
}



export default function MyButton<E extends keyof HTMLElementTagNameMap = 'button'>
 (props:{as:E}, context:SetupContext & {attrs:HTMLElementTagNameMap[E]}){
  const element = props.as
  return h(`${element}`,context.attrs,context.slots) 
}

