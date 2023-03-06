import { createApp } from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import SimpleUI from "./components";
import infiniteScroll from "./components/InfiniteScroll/infiniteScroll";
const app = createApp(App);
app.use(SimpleUI);
app.directive("infiniteScroll", infiniteScroll);
app.mount("#app");
