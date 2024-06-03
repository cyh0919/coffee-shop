import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "./module/router";
import pinia  from "./module/pinia"

library.add(fas);
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.mount('#app');