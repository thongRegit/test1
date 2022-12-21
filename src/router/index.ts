import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import {
    Home,
    ShopList,
    ShopDetail,
    ShopCreate,
    UserDetail,
    UserList,
    SaleList,
    SaleDetail,
    ReservationList,
    ReservationDetail,
    AccountList,
    ShopUpdate,
    ChangePassword,
    Login,
    PageNotFound,
    PlanList,
    PlanDetail,
    PlanCreate,
    PlanUpdate
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
                path: 'sale',
                children: [
                    {
                        path: '',
                        component: SaleList,
                        name: 'sale',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'sale-create',
                        component: SaleList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id',
                        name: 'sale-detail',
                        component: SaleDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id/update',
                        name: 'sale-update',
                        component: SaleList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        component: UserList,
                        name: 'user',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'user-create',
                        component: UserList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id',
                        name: 'user-detail',
                        component: UserDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id/update',
                        name: 'user-update',
                        component: UserList,
                        beforeEnter: ifAuthenticated,
                    },
                ],
            },
            {
                path: 'reservation',
                children: [
                    {
                        path: '',
                        component: ReservationList,
                        name: 'reservation',
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: 'create',
                        name: 'reservation-create',
                        component: ReservationList,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id',
                        name: 'reservation-detail',
                        component: ReservationDetail,
                        beforeEnter: ifAuthenticated,
                    },
                    {
                        path: ':id/update',
                        name: 'reservation-update',
                        component: ReservationList,
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
            {
                path: 'plans',
                beforeEnter: ifAuthenticated,
                children: [
                    {
                        path: '',
                        component: PlanList,
                        name: 'plans',
                    },
                    {
                        path: 'create',
                        name: 'plans-create',
                        component: PlanCreate
                    },
                    {
                        path: ':id',
                        name: 'plans-detail',
                        component: PlanDetail,
                    },
                    {
                        path: ':id/update',
                        name: 'plans-update',
                        component: PlanUpdate
                    },
                ],
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
