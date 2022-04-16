import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import router from './router'

import 'nprogress/nprogress.css';
import './assets/scss/index.scss';
import AppLayoutVue from './layouts/AppLayout.vue'


createApp(App)
    .use(router)
    .use(Notifications)
    .use(createPinia())
    .component('AppLayout', AppLayoutVue)
    .mount('#app')
