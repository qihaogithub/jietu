import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import screenshot from "../components/duqujson/15.vue";

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
      path: "/about",
      name: "about",
      component: () => import("../components/duqujson/9、支持缩略图.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/duqujson/瀑布流测试.vue"),
    },
  ],
});

export default router;
