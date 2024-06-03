import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import screenshot from "../components/标签筛选/App.vue.vue";

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
      name: "screenshot",
      component: screenshot,
    },
    {
      path: "/09",
      name: "09",
      component: () => import("../components/duqujson/9、支持缩略图.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/duqujson/10、分页加载.vue"),
    },
  ],
});

export default router;
