import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores'

import {
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
    CoachCreate,
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
    next({ name: 'login' })
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
                meta: { requiresAuth: true },
                component: ShopList,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'shops',
                children: [
                    {
                        path: '',
                        name: 'shops',
                        meta: { requiresAuth: true },
                        component: ShopList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'shops-create',
                        meta: { requiresAuth: true },
                        component: ShopCreate,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'shops-detail',
                        meta: { requiresAuth: true },
                        component: ShopDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)/update',
                        name: 'shops-update',
                        meta: { requiresAuth: true },
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
                        name: 'users',
                        meta: { requiresAuth: true },
                        component: UserList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'users-detail',
                        meta: { requiresAuth: true },
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
                        name: 'reserves',
                        meta: { requiresAuth: true },
                        component: ReserveList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'reserves-create',
                        meta: { requiresAuth: true },
                        component: ReserveList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'reserves-detail',
                        meta: { requiresAuth: true },
                        component: ReserveDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)/update',
                        name: 'reserves-update',
                        meta: { requiresAuth: true },
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
                        name: 'sessions',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'sessions-create',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'shifts',
                children: [
                    {
                        path: '',
                        name: 'shifts',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'shifts-create',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'coaches',
                children: [
                    {
                        path: '',
                        name: 'coaches',
                        meta: { requiresAuth: true },
                        component: CoachList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'coaches-create',
                        meta: { requiresAuth: true },
                        component: CoachCreate,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'coaches-detail',
                        meta: { requiresAuth: true },
                        component: CoachDetail,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'plans',
                children: [
                    {
                        path: '',
                        name: 'plans',
                        meta: { requiresAuth: true },
                        component: PlanList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id(\\d+)',
                        name: 'plans-detail',
                        meta: { requiresAuth: true },
                        component: PlanUpdate,
                    },
                    {
                        path: 'create',
                        name: 'plans-create',
                        meta: { requiresAuth: true },
                        component: PlanCreate,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'patterns',
                children: [
                    {
                        path: '',
                        name: 'patterns',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'patterns-create',
                        meta: { requiresAuth: true },
                        component: PatternList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'account',
                name: 'account',
                meta: { requiresAuth: true },
                component: AccountList,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'session',
                name: 'session',
                meta: { requiresAuth: true },
                component: SessionList,
                beforeEnter: ifAuthenticated,
            },
            {
                path: 'change-password',
                name: 'change-password',
                meta: { requiresAuth: true },
                component: ChangePassword,
                beforeEnter: ifAuthenticated,
            },
            {
                path: '/',
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
    if (to.meta.requiresAuth && !authStore.isAuthenticated)
        next({ name: 'login' })
    else next()
})

export default router
