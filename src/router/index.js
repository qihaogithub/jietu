import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import home from "../components/duqujson/9、支持缩略图.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/09",
      name: "09",
      component: () => import("../components/duqujson/9、支持缩略图.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/标签筛选/展示.vue"),
    },
  ],
});

export default router;
