import { selectPropsTypes } from "./base/select/types";
import { inputPropsTypes } from "./base/input/type";
import { App, Component } from "vue";
import { checkboxPropsTypes } from "./base/checkbox/types";
import uploadPage from "components/upload/index.vue";
import baseSwitch from "components/base/switch/index.vue";
import baseInput from "components/base/input/index.vue";
import baseSelect from "components/base/select/index.vue";
import baseTable from "components/base/table/index.vue";
import baseList from "components/base/list/index.vue";

import treePage from "components/tree/index.vue";
import baseCheckbox from "components/base/checkbox/index.vue";
import datePickerPage from "components/date-picker/index.vue";
import { UploadProps } from "./upload/types";
import sidePicPreview from "components/sidePicPreview/index.vue";
import addKettleDynamically from "components/addKettleDynamically/index.vue";
import myTree from "components/tree/index.vue";
import JinCai from "components/jianCaiUpload/index.vue";
import virtualList from "components/virtual/index.vue";
import infiniteScroll from "components/infiniteScroll/index.vue";
import magnifiers from "components/magnifiers/index.vue";
import reverseCard from "components/reverse-card/index.vue";
import previewImg from "components/sidePicPreview/index.vue";
import picFlip from "components/flip/pic.vue";
import cardListFlip from "components/flip/cardList.vue";
import itemsListFlip from "components/flip/liList.vue";
import filp from "components/flip/index.vue";
import { switchPropsTypes } from "./base/switch/types";
import { listPropsTypes } from "./base/list/types";

declare module "*.vue" {
  export interface GlobalComponents {
    uploadPage: UploadProps;
    myCheckbox: checkboxPropsTypes;
    datePickerPage: any;
    baseSwitch: switchPropsTypes;
    baseInput: inputPropsTypes;
    baseSelect: selectPropsTypes;
    baseList: listPropsTypes;
  }
}

const Components: Array<{ name: string; component: Component }> = [
  { name: "uploadPage", component: uploadPage },
  { name: "treePage", component: treePage },
  { name: "baseSwitch", component: baseSwitch },
  { name: "baseCheckbox", component: baseCheckbox },
  { name: "baseSelect", component: baseSelect },
  { name: "baseInput", component: baseInput },
  { name: "baseTable", component: baseTable },
  { name: "baseList", component: baseList },

  { name: "datePickerPage", component: datePickerPage },
  { name: "sidePicPreview", component: sidePicPreview },
  { name: "addKettleDynamically", component: addKettleDynamically },
  { name: "myTree", component: myTree },
  { name: "JinCai", component: JinCai },
  { name: "virtualList", component: virtualList },
  { name: "infiniteScroll", component: infiniteScroll },
  { name: "magnifiers", component: magnifiers },
  { name: "reverseCard", component: reverseCard },
  { name: "previewImg", component: previewImg },
  { name: "picFlip", component: picFlip },
  { name: "cardListFlip", component: cardListFlip },
  { name: "itemsListFlip", component: itemsListFlip },
  { name: "filp", component: filp },
];

function install(app: App) {
  Components.forEach(component => {
    app.component(component.name, component.component);
  });
}
export default install;
