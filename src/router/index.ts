import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore, useAlertStore } from '@/stores'

import {
    Home,
    ShopList,
    ShopDetail,
    ShopCreate,
    UserList,
    UserDetail,
    ReserveList,
    ReserveDetail,
    AccountList,
    SessionList,
    CoachList,
    CoachDetail,
    ShopUpdate,
    ChangePassword,
    Login,
    PageNotFound,
    PatternList,
    PlanList,
    PlanCreate,
    PlanUpdate,
} from '@/views'

const ifAuthenticated = (to: any, from: any, next: any) => {
    const authStore = useAuthStore()
    if (authStore.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const ifNotAuthenticated = (to: any, from: any, next: any) => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const routes = [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'home',
                component: Home,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'shops',
                children: [
                    {
                        path: '',
                        component: ShopList,
                        name: 'shops',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'shops-create',
                        component: ShopCreate,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'shops-detail',
                        component: ShopDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)/update',
                        name: 'shops-update',
                        component: ShopUpdate,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        component: UserList,
                        name: 'users',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'users-detail',
                        component: UserDetail,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'reserves',
                children: [
                    {
                        path: '',
                        component: ReserveList,
                        name: 'reserves',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'reserves-create',
                        component: ReserveList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'reserves-detail',
                        component: ReserveDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)/update',
                        name: 'reserves-update',
                        component: ReserveList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'sessions',
                children: [
                    {
                        path: '',
                        component: PatternList,
                        name: 'sessions',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        component: PatternList,
                        name: 'sessions-create',
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'shifts',
                children: [
                    {
                        path: '',
                        component: PatternList,
                        name: 'shifts',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        component: PatternList,
                        name: 'shifts-create',
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'coaches',
                children: [
                    {
                        path: '',
                        component: CoachList,
                        name: 'coaches',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        component: CoachDetail,
                        name: 'coaches-detail',
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'plans',
                children: [
                    {
                        path: '',
                        component: PlanList,
                        name: 'plans',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'plans-detail',
                        component: PlanUpdate,
                    },
                    {
                        path: 'create',
                        component: PlanCreate,
                        name: 'plans-create',
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'patterns',
                children: [
                    {
                        path: '',
                        component: PatternList,
                        name: 'patterns',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        component: PatternList,
                        name: 'patterns-create',
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'account',
                name: 'account',
                component: AccountList,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'session',
                name: 'session',
                component: SessionList,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'change-password',
                name: 'change-password',
                component: ChangePassword,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'login',
                name: 'login',
                component: Login,
                beforeEnter: ifNotAuthenticated,
            },
            {
                path: ':pathMatch(.*)*',
                component: PageNotFound,
                name: 'page-not-found',
                beforeEnter: ifAuthenticated,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const alertStore = useAlertStore()
    alertStore.removeAlert()
    if (to.meta.requiresAuth && !authStore.isAuthenticated)
        next({ name: 'Login' })
    else next()
})

export default router
