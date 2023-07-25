import DefaultTheme from "vitepress/theme";
import {
  red,
  green,
  blue,
} from "../../../src/components/base/text-highlight/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // 组件包裹的文字颜色
    app.component("red", red);
    app.component("green", green);
    app.component("blue", blue);
    app.use(ElementPlus);
  },
};
