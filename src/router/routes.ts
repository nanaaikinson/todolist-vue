import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/Auth.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/pages/HomePage.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/pages/SignupPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/App.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
      },
      {
        path: "tasks",
        name: "Tasks",
        component: () => import("@/pages/TasksPage.vue"),
      },
      {
        path: "calendar",
        name: "Calendar",
        component: () => import("@/pages/CalendarPage.vue"),
      },
    ],
  },
];
