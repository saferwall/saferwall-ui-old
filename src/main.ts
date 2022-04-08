import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'nprogress/nprogress.css';
import './assets/scss/index.scss'


createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
