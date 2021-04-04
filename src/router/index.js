import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/modules/index/pages/Home.vue'),
    meta: {
      layout: 'Default',
      menu: 'Member'
    }
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/modules/scan/pages/Summary.vue'),
    meta: {
      layout: 'SidebarLayout'
    }
  },
  {
    path: '/hot-activities',
    name: 'Hot Activities',
    component: () => import('@/modules/activities/pages/HotActivities.vue'),
    meta: {
      layout: 'HeaderLayout'
    }
  }
]


const authRoutes = [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/modules/auth/pages/Login.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/modules/auth/pages/Register.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/confirmation',
    name: 'Confirmation',
    component: () => import('@/modules/auth/pages/Confirmation.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  },
  {
    path: '/auth/forgot-password',
    name: 'Forgot Password',
    component: () => import('@/modules/auth/pages/ForgotPassword.vue'),
    meta: {
      layout: 'AuthLayout'
    }
  }
]


const privateRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/modules/profile/pages/Profile.vue'),
    meta: {
      layout: 'HeaderLayout'
    }
  },
  {
    path: '/account/settings',
    name: 'Account Settings',
    component: () => import('@/modules/account/pages/Settings.vue'),
    meta: {
      layout: 'HeaderLayout'
    }
  }
]


const routes = [...publicRoutes, ...privateRoutes, ...authRoutes].map(_route => {
  return _route;
});

const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
