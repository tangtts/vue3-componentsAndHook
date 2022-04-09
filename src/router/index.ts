import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouterView,
} from "vue-router";

const routerHash = createWebHashHistory();
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由



export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../components/layout.vue"),
    children: [
      {
        name: "Workplace",
        path: "",
        component: () => import("../components/login.vue"),
        meta: {
          title: "Navigator Two",
        },
      },
      {
        path: "page2",
        component: RouterView,
        name: "page2",
        meta: {
          title: "Form",
          icon: "icon-lipin",
        },
        children: [
          {
            name: "page22",
            path: "Navigator",
            component: () => import("../components/asyncContainer.vue"),
            meta: {
              title: "Navigator One",
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: routerHash,
  routes,
});

export default router;
