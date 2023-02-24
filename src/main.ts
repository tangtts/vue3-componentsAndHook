import { createApp } from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import infiniteScroll from "./components/InfiniteScroll/infiniteScroll"
import SimpleUI  from "./components"
const app = createApp(App);
app.use(SimpleUI);
app.directive("infiniteScroll",infiniteScroll)
app.mount("#app");
