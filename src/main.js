// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import LazyLoad from "vue-lazyload-next";

const app = createApp(App);
app.use(LazyLoad, {
  loading: "path/to/loading-spinner.png",
  error: "path/to/error-image.png",
});
app.use(createPinia());
app.use(router);
app.mount("#app");
