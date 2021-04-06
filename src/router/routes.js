import store from '@/state/store'

const publicRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/modules/index/pages/Home.vue'),
        meta: {
            title: 'Home',
            layout: 'Default',
        }
    },
    {
        path: '/summary',
        name: 'summary',
        component: () => import('@/modules/scan/pages/Summary.vue'),
        meta: {
            title: 'Summary',
            layout: 'SidebarLayout'
        }
    },
    {
        path: '/hot-activities',
        name: 'hot-activities',
        component: () => import('@/modules/activities/pages/HotActivities.vue'),
        meta: {
            title: 'Hot Activities',
            layout: 'HeaderLayout'
        }
    },
    {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/modules/profile/pages/User.vue'),
        meta: {
            title: 'User Profile',
            layout: 'HeaderLayout'
        },
    },
]


const authRoutes = [
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/modules/auth/pages/Login.vue'),
        meta: {
            title: 'Login',
            layout: 'AuthLayout'
        }
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import('@/modules/auth/pages/Register.vue'),
        meta: {
            title: 'Register',
            layout: 'AuthLayout'
        }
    },
    {
        path: '/auth/confirmation',
        name: 'confirmation',
        component: () => import('@/modules/auth/pages/Confirmation.vue'),
        meta: {
            title: 'Confirmation',
            layout: 'AuthLayout'
        }
    },
    {
        path: '/auth/forgot-password',
        name: 'forgot-password',
        component: () => import('@/modules/auth/pages/ForgotPassword.vue'),
        meta: {
            title: 'Forgot Password',
            layout: 'AuthLayout'
        }
    },
    {
        path: '/auth/logout',
        name: 'logout',
        component: () => import('@/modules/auth/pages/Login.vue'),
        meta: {
          authRequired: true,
          beforeResolve() {
            store.dispatch('auth/logOut')
          },
        },
      },
    
].map(route => {
    route.meta = route.meta ? route.meta : {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ path : '/' })
        } else {
          // Continue to the login page
          next()
        }
      },
    };
    return route;
});  


const privateRoutes = [
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/modules/profile/pages/Profile.vue'),
        meta: {
            title: 'Profile',
            layout: 'HeaderLayout',
        },
    },
    {
        path: '/account/settings',
        name: 'account-settings',
        component: () => import('@/modules/account/pages/Settings.vue'),
        meta: {
            title: 'Account Settings',
            layout: 'HeaderLayout'
        }
    }
].map(route=> {
    route.meta = {
        ...route.meta,
        authRequired: true
    }
    return route;
})


const routes = [...publicRoutes, ...privateRoutes, ...authRoutes].map(_route => {
    return _route;
});



export { routes, publicRoutes, privateRoutes, authRoutes };