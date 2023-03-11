// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import textHighlight from "../../../src/components/text-highlight/index";
import "element-plus/dist/index.css";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData, isServer }) => {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
    import("element-plus").then(module => {
      app.use(module);
    });
    app.component("textHighlight", textHighlight);
  },
};
