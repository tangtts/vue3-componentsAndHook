import { createRouter, createWebHashHistory, RouteRecordRaw,RouteComponent } from 'vue-router'


const routerHash= createWebHashHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由


 interface routeItem  {
    readonly path: string,
    component?:()=> Promise<RouteComponent>,
    name: string,
    redirect?: string,
    alias?: string
    children?: routeItem[]
}
export type baseRoute = routeItem & RouteRecordRaw;

export const routes: baseRoute[] = [{
    path: '/',
    component: () => import("../components/layout.vue"),
    name: '首页',
    redirect: "/index",
    meta:{
        title:'首页',
        icon:"icon-lipin"
    },
    children: [
        {
            path: '/index',
            component: () => import("../components/login.vue"),
            name: 'form',
        },
        {
            path: '/index2',
            component: () => import("../components/login2.vue"),
            name: 'table'
        },

    ]
}]

const router = createRouter({
    history: routerHash,
    routes
})


export default router
