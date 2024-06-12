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
      path: "/17",
      name: "17",
      component: () => import("../components/duqujson/17、获取eagle分组.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/接口测试/test.vue"),
    },
    {
      path: "/test2",
      name: "test2",
      component: () => import("../components/waterfall/7-筛选后更新瀑布流.vue"),
    },
    {
      path: "/3",
      name: "3",
      component: () => import("../components/waterfall/8-性能优化.vue"),
    },
  ],
});

export default router;
