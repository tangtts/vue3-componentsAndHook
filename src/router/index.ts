import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteComponent,
} from "vue-router";

const routerHash = createWebHashHistory();
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

interface routeItem {
  readonly path: string;
  component?: () => Promise<RouteComponent>;
  name?: string;
  redirect?: string;
  alias?: string;
  children?: routeItem[];
  meta: {
    title?: string;
  };
}
export type baseRoute = routeItem & RouteRecordRaw;

export const routes: baseRoute[] = [
  {
    path: "/index",
    component: () => import("../components/layout.vue"),
    name: "首页",
    meta: {
      title: "首页",
      icon: "icon-lipin",
    },
    children: [
      {
        path: "/index",
        component: () => import("../components/login.vue"),
        meta: {
          title: "Navigator Two",
        },
      },
    ],
  },
  {
    path: "/page2",
    component: () => import("../components/layout.vue"),
    meta: {
      title: "Form",
      icon: "icon-lipin",
    },
    children: [
      {
        path: "/page2",
        component: () => import("../components/asyncContainer.vue"),
        meta: {
          title: "Navigator One",
        },
      },
    ],
  },
];

const router = createRouter({
  history: routerHash,
  routes,
});

export default router;
