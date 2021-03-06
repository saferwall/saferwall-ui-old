import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
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
    component: () => import('@/views/Scan/Summary.vue'),
    meta: {
      layout: 'SidebarLayout'
    }
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/Auth/Register.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/confirmation',
    name: 'Confirmation',
    component: () => import('@/views/Auth/Confirmation.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/forgot-password',
    name: 'Forgot Password',
    component: () => import('@/views/Auth/ForgotPassword.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  }
]


const privateRoutes = [

]


const routes = [...publicRoutes, ...privateRoutes];

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
