import myUpload from "components/upload/index.vue";
import myTree from "components/tree/index.vue";
import {UploadProps} from "./upload/types";

import { App } from "vue";
import '@vue/runtime-core'

declare module "@vue/runtime-core"{
  export interface GlobalComponents {
    myUpload:UploadProps
    myTree:unknown
  }
}

const Components = [
  myUpload,
  myTree
]


function install(app:App){
  Components.forEach(component=>{
    app.component(component.name,component)
  })
}
export default install;


