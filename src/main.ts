import { Component, createApp } from 'vue'
import App from './App.vue'
import SvgIcon from './components/common/SvgIcon/index.vue'
import router from './router' 
import store from './store';
import "tailwindcss/tailwind.css"
const app = createApp(App);
app.use(store);
app.use(router)
app.component('svg-icon', SvgIcon);
router.isReady().then(() => {
	app.mount('#app')
})
