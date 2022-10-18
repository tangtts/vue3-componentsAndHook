
import type {ObjectDirective} from "vue"
let infiniteScroll:ObjectDirective = {
  mounted(el,bindings,vnode){
    console.log(el,bindings,vnode)
  },

}

export default infiniteScroll