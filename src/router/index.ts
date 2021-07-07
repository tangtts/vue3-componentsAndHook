import { createRouter, createWebHistory } from 'vue-router'


const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component:()=> import("../components/HelloWorld.vue")
        }
    ]
})


export default router
