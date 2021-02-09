import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'Default'
    }
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/views/Summary.vue'),
    meta: {
      layout: 'SidebarLayout'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
