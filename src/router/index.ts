import NProgress from 'nprogress'
import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";
import middlewarePipeline from "./middlewarePipeline";



const scrollTo = (element: any): void => {
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, _form, savedPosition) {
        if (to.hash) {
            const el = window.location.href.split("#")[1];
            if (el.length) {
                scrollTo(document.getElementById(el));
            }

            return;
        }

        if (savedPosition) {
            return savedPosition;
        }

        scrollTo(document.getElementById("app"));
    }
});


/**
 * Middlewares
 */
router.beforeEach((to, from, next) => {
    const middleware: any = to.meta['middleware'];

    if (!middleware) {
        return next();
    }

    const context = {
        to,
        from,
        next
    }


    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });

});

/**
 * Custom meta middlewares
 */


router.beforeResolve(async (to, from, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of to.matched) {
            await new Promise((resolve: any, reject: any) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                const beforeResolve: any = route.meta['beforeResolve'];
                if (route.meta && beforeResolve) {
                    beforeResolve(to, from, (...args: any) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            if (from.name === args[0].name) {
                                // Complete the animation of the route progress bar.
                                NProgress.done()
                            }
                            // Complete the redirect.
                            next(...args);
                            reject(new Error('Redirected'));
                        } else {
                            resolve();
                        }
                    })
                } else {
                    // Otherwise, continue resolving the route.
                    resolve();
                }
            })
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }

    // If we reach this point, continue resolving the route.
    next();
});

/**
 * Page progress bar: start
 */
router.beforeEach((_to, from) => {
    if (from.name !== null) {
        NProgress.start();
    }
});


/**
 * Page progress bar: stop
 */
router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});


export default router;