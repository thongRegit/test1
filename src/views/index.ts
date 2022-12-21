const Login = () => import('@/views/LoginVue.vue')
const ChangePassword = () => import('@/views/password/ChangePasswordVue.vue')
const Home = () => import('@/views/home/HomeVue.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const ShopList = () => import('@/views/shop/ShopVue.vue')
const ShopDetail = () => import('@/views/shop/DetailVue.vue')
const ShopCreate = () => import('@/views/shop/CreateVue.vue')
const ShopUpdate = () => import('@/views/shop/EditVue.vue')
const UserDetail = () => import('@/views/user/DetailVue.vue')
const UserList = () => import('@/views/user/UserVue.vue')
const SaleList = () => import('@/views/sale/SaleVue.vue')
const SaleDetail = () => import('@/views/sale/DetailVue.vue')
const ReservationList = () => import('@/views/reservation/ReservationVue.vue')
const ReservationDetail = () => import('@/views/reservation/DetailVue.vue')
const AccountList = () => import('@/views/account/AccountVue.vue')
const PatternList = () => import('@/views/pattern/PatternVue.vue')
const PatternCreate = () => import('@/views/pattern/CreateVue.vue')

export {
    Home,
    Login,
    ChangePassword,
    PageNotFound,
    ShopList,
    ShopDetail,
    ShopCreate,
    ShopUpdate,
    UserDetail,
    UserList,
    SaleList,
    SaleDetail,
    ReservationList,
    ReservationDetail,
    AccountList,
    PatternList,
    PatternCreate,
}
