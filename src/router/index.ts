import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    CoachList,
    ShopUpdate,
    ChangePassword,
    Login,
    PageNotFound,
    PatternList,
} from '@/views/index'

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
                        path: ':id',
                        name: 'shops-detail',
                        component: ShopDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id/update',
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
                        path: ':id',
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
                        path: ':id',
                        name: 'reserves-detail',
                        component: ReserveDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id/update',
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
                ],
            },
            {
                path: 'plans',
                children: [
                    {
                        path: '',
                        component: PatternList,
                        name: 'plans',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        component: PatternList,
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
    if (to.meta.requiresAuth && !authStore.isAuthenticated)
        next({ name: 'Login' })
    else next()
})

export default router
