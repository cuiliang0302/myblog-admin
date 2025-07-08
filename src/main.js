import {createApp} from "vue";
import App from "./App.vue";
import "@/styles/normalize.css";
import "@/styles/hover-min.css";
import "@/styles/index.scss";
import "element-plus/theme-chalk/src/message.scss"
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from '@/router';
import { createPinia } from 'pinia';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App);
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueLoaders)
app.mount("#app");
