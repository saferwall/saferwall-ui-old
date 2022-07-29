import authMiddleware, { noAuthMiddleware } from '@/middlewares/auth';
import fileMiddleware from '@/middlewares/file';
import logMiddleware from '@/middlewares/log';

/**
 * Tags Module routes
 */
const classificationModuleRoutes = [
    {
        path: '/tag/:tag',
        name: 'onetag',
        meta: {
            title: 'Tag'
        }
    }
];

/**
 * File Module routes
 */
const fileModuleRoutes = [
    {
        path: '',
        name: 'file-index',
        redirect: { name: 'file-summary' }
    },
    {
        path: '/summary',
        name: 'file-summary',
        component: () => import('@/modules/file/pages/Summary.vue'),
        meta: {
            title: 'Summary',
        }
    },
    {
        path: '/static-analysis',
        name: 'static-analysis',
        component: () => import('@/modules/file/pages/Summary.vue'),
        meta: {
            title: 'Static Analysis',
        }
    },
    {
        path: '/static-analysis/pe',
        name: 'static-analysis-pe',
        component: () => import('@/modules/file/pages/static-analysis/PE.vue'),
        meta: {
            title: 'PE',
            middleware: [
                async ({ store, to, next }) => { await store.dispatch('file/fetchFilePE', to.params.id), next() }
            ]
        }
    },
    {
        path: '/static-analysis/strings',
        name: 'static-analysis-strings',
        component: () => import('@/modules/file/pages/static-analysis/Strings.vue'),
        meta: {
            title: 'Strings',
        }
    },
    {
        path: '/static-analysis/antivirus',
        name: 'static-analysis-antivirus',
        component: () => import('@/modules/file/pages/static-analysis/Antivirus.vue'),
        meta: {
            title: 'antivirus',
            middleware: [
                async ({ store, to, next }) => { await store.dispatch('file/fetchFileAvs', to.params.id), next() }
            ]
        }
    },
    {
        path: '/dynamic-analysis',
        name: 'dynamic-analysis',
        component: () => import('@/modules/file/pages/Summary.vue'),
        meta: {
            title: 'Dynamic Analysis',
        }
    },
    {
        path: '/comments',
        name: 'comments',
        component: () => import('@/modules/file/pages/Comments.vue'),
        meta: {
            title: 'Comments',
            middleware: [
                async ({ store, to, next }) => { await store.dispatch('file/fetchFileComments', to.params.id), next() }
            ]
        }
    },
].map(route => {
    route.path = `/file/:id${route.path}`;
    route.meta = {
        layout: 'SidebarLayout',
        ...route.meta,
        middleware: [
            logMiddleware,
            fileMiddleware,
            ...(route.meta && route.meta.middleware || []),
        ],
        page: {
            title: null,
        }
    }

    return route;
});


/**
 * All non auth required routes
 * - Home
 * - Hot Activities
 * etc.
 */
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
        path: '/hot-activities',
        name: 'hot-activities',
        component: () => import('@/modules/activities/pages/HotActivities.vue'),
        meta: {
            title: 'Hot Activities',
            layout: 'HeaderLayout'
        }
    },
    {
        path: '/user/:id/:tab?',
        name: 'user',
        component: () => import('@/modules/profile/pages/User.vue'),
        meta: {
            title: 'User Profile',
            layout: 'HeaderLayout',
            page: {
                title: null
            },
            middleware: [
                async ({ store, to, next }) => {
                    // Profile data
                    const username = to.params.id || this.getUser.username;

                    const profile = await store.dispatch('user/fetchProfile', username)
                        .catch(() => {
                            next({ name: "home" });
                        });

                    to.meta.page.title = profile.username;
                    next();
                }
            ]
        },
    },
    ...fileModuleRoutes,
    ...classificationModuleRoutes
]

/**
 * Auth routes
 * - Login
 * - Register
 * etc.
 */
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
        path: '/auth/forgot-password/:token?',
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
            middleware: [
                authMiddleware,
                ({ store, next }) => {
                    store.dispatch('auth/logOut')

                    next({ name: 'home' });
                }
            ]
        },
    },
].map(route => {
    route.meta = {
        middleware: [
            noAuthMiddleware
        ],
        ...route.meta
    };
    return route;
});

/**
 * Routes that require authentication
 * - Profile
 * - Settings
 * etc.
 */
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
].map(route => {
    route.meta = {
        ...route.meta,
        middleware: [
            authMiddleware
        ]
    }
    return route;
})


/**
 * All Routes
 */
const routes = [...publicRoutes, ...privateRoutes, ...authRoutes].map(_route => {
    return _route;
});


/**
 * Exportations
 */
export default routes;
export { routes, publicRoutes, privateRoutes, authRoutes };