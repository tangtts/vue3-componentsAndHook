import { createApp } from 'vue'
import App from './App.vue'
import SvgIcon from './components/SvgIcon/index.vue'
import { setupElement } from './libs/element'
import router from './router' 
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css'
const app = createApp(App);

setupElement(app);
app.use(router);
app.use(store)
app.component('svg-icon', SvgIcon);
router.isReady().then(() => {
	app.mount('#app')
})
