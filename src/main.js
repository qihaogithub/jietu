// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import waterfall from "vue-waterfall2";
import VueLazyload from 'vue-lazyload';//借助vue-lazyload插件实现图片懒加载

const app = createApp(App);
app.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1,
  });
  
app.use(createPinia());
app.use(router);
app.use(waterfall);
app.mount("#app");
