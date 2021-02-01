import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppLayout from '@/layouts/AppLayout'

/**
 * Css ( +TailwindCss )
 */
import './assets/css/index.css'

/**
 * Vue Application 
 * Use Many Plugins
 */
createApp(App)
    .use(store)
    .use(router)
    .component('AppLayout', AppLayout)
    .mount('#app')
