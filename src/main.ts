import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import SimpleUI from "./components";

import infiniteScroll from "./components/infiniteScroll/infiniteScroll";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./src/test.js";
const app = createApp(App);
app.use(ElementPlus);
app.use(SimpleUI);
app.directive("infiniteScroll", infiniteScroll);
app.mount("#app");
