import Vue from 'vue';
import Router from 'vue-router';

import PageDashboard from '../pages/PageDashboard'
import PageAbout from '../pages/PageAbout'
import Page404 from '../pages/Page404'
import Login from '../pages/PageLogin'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            component: PageDashboard,
            name: 'Dashboard'
        },
        {
            path: '/dashboard/:page',
            component: PageDashboard,
            name: 'Dashboard'
        },
        {
            path: '/add/payment/:category',
            component: PageDashboard,
            name: 'Dashboard'
        },
        {
            path: '/about*',
            component: PageAbout,
            name: 'About'
        },
        {
            path: '/404',
            component: Page404,
            name: '404'
        },
        {
            path: '*',
            component: Page404,
        },
        {
            path: '/auth',
            component: Login,
            name: 'Login'
        }
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