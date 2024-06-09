// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import waterfall from "vue-waterfall2";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(waterfall);
app.mount("#app");
