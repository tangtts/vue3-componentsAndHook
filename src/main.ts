import { createApp } from "vue";
import App from "./App.vue";
import './assets/index.css'
import SimpleUI from "./components";

import infiniteScroll from "./components/infiniteScroll/infiniteScroll";
const app = createApp(App);
app.use(SimpleUI);
app.directive("infiniteScroll", infiniteScroll);
app.mount("#app");
