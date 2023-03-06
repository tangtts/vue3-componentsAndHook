import { checkboxPropsTypes } from "./checkbox/types";
import uploadPage from "components/upload/index.vue";
import TreePage from "components/tree/index.vue";
import myCheckbox from "components/checkbox/index.vue";
import DatePickerPage from "components/date-picker/index.vue";
import { UploadProps } from "./upload/types";

import { App } from "vue";

declare module "*.vue" {
  export interface GlobalComponents {
    uploadPage: UploadProps;
    myCheckbox: checkboxPropsTypes;
  }
}

const Components = [uploadPage, TreePage, myCheckbox, DatePickerPage];

function install(app: App) {
  Components.forEach(component => {
    app.component(component.name, component);
  });
}
export default install;
