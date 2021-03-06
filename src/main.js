import { createApp } from 'vue'

import router from './router'
import store from './store'

import App from '@/App.vue'
import AppLayout from '@/AppLayout.vue'

/**
 * Css ( +TailwindCss )
 */
import './assets/css/index.css'

/**
 * Plugins
 */
import KProgress from 'k-progress-v3';

/**
 * Vue Application 
 * Use Many Plugins
 */
createApp(App)
    .use(store)
    .use(router)
    .component('k-progress', KProgress)
    .component('AppLayout', AppLayout)
    .mount('#app')
