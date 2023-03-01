import { checkboxPropsTypes } from './checkbox/types';
import myUpload from "components/upload/index.vue";
import myTree from "components/tree/index.vue";
import myCheckbox from "components/checkbox/index.vue";
import {UploadProps} from "./upload/types";

import { App } from "vue";
import '@vue/runtime-core'

declare module "@vue/runtime-core"{
  export interface GlobalComponents {
    myUpload:UploadProps
    myTree:unknown,
    myCheckbox:checkboxPropsTypes
  }
}

const Components = [
  myUpload,
  myTree,
  myCheckbox
]


function install(app:App){
  Components.forEach(component=>{
    app.component(component.name,component)
  })
}
export default install;


