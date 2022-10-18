import { createApp } from "vue";
import App from "./App.vue";
import "tailwindcss/tailwind.css";
import infiniteScroll from "./components/InfiniteScroll/infiniteScroll"

const app = createApp(App);
app.directive("infiniteScroll",infiniteScroll)
app.mount("#app");
