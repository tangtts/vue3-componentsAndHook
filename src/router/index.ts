import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterView,
} from "vue-router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const routerHash = createWebHashHistory();
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: routerHash,
  routes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
});

router.afterEach((to, from, next) => {
  nprogress.done();
});

export default router;
