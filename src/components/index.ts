import { App, Component } from "vue";
import { checkboxPropsTypes } from "./checkbox/types";
import uploadPage from "components/upload/index.vue";
import treePage from "components/tree/index.vue";
import myCheckbox from "components/checkbox/index.vue";
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
import previewImg from "components/previewImage/index.vue";
import picFlip from "components/flip/pic.vue";
import cardListFlip from "components/flip/cardList.vue";
import itemsListFlip from "components/flip/liList.vue";
import filp from "components/flip/index.vue";

declare module "*.vue" {
  export interface GlobalComponents {
    uploadPage: UploadProps;
    myCheckbox: checkboxPropsTypes;
    datePickerPage: any;
  }
}

const Components: Array<{ name: string; component: Component }> = [
  { name: "uploadPage", component: uploadPage },
  { name: "treePage", component: treePage },
  { name: "myCheckbox", component: myCheckbox },
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
