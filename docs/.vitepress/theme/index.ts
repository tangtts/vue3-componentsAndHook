import DefaultTheme from "vitepress/theme";
import {
  red,
  green,
  blue,
} from "../../../src/components/base/text-highlight/index";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    app.component("red", red);
    app.component("green", green);
    app.component("blue", blue);
  },
};
