import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import(/*webpackChunkName:"Login" */'../pages/PageLogin'),
            name: 'Login'
        },
        {
            path: '/dashboard',
            component: () => import(/*webpackChunkName:"PageDashboard" */'../pages/PageDashboard'),
            name: 'Dashboard'
        },
        {
            path: '/dashboard/:page',
            component: () => import(/*webpackChunkName:"PageDashboard" */'../pages/PageDashboard'),
            name: 'Dashboard'
        },
        {
            path: '/add/payment/:category',
            component: () => import(/*webpackChunkName:"PageDashboard" */'../pages/PageDashboard'),
            name: 'Dashboard'
        },
        {
            path: '/about*',
            component: () => import(/*webpackChunkName:"PageAbout" */'../pages/PageAbout'),
            name: 'About'
        },
        {
            path: '/404',
            component: () => import(/*webpackChunkName:"Page404" */'../pages/Page404'),
            name: '404'
        },
        {
            path: '*',
            component: () => import(/*webpackChunkName:"Page404" */'../pages/Page404'),
        },
    ]
})

const isAuth = true

router.beforeEach((to, from, next) => {
    if(to.name !== 'Login' && !isAuth) {
        next({name: 'Login'})
    } else {
        next()
    }
})

const getTitleByRouteName = routeName => {
    return {
        'Dashboard': 'Page Dashboard',
        'About': 'Page About',
        '404': 'Not Found'
    }[routeName]
}

router.afterEach((to) => {
    document.title = getTitleByRouteName(to.name)
})

export default router