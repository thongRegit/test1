const Login = () => import('@/views/LoginVue.vue')
const ChangePassword = () => import('@/views/password/ChangePasswordVue.vue')
const PageNotFound = () => import('@/views/PageNotFound.vue')
const ShopList = () => import('@/views/shop/ShopView.vue')
const ShopDetail = () => import('@/views/shop/DetailView.vue')
const ShopCreate = () => import('@/views/shop/CreateVue.vue')
const ShopUpdate = () => import('@/views/shop/EditVue.vue')
const UserDetail = () => import('@/views/user/UserDetail.vue')
const UserList = () => import('@/views/user/UserVue.vue')
const ReserveList = () => import('@/views/reserves/ReserveVue.vue')
const ReserveDetail = () => import('@/views/reserves/DetailVue.vue')
const AccountList = () => import('@/views/account/AccountVue.vue')
const SessionList = () => import('@/views/session/SessionVue.vue')
const PatternList = () => import('@/views/pattern/PatternView.vue')
const PatternCreate = () => import('@/views/pattern/CreateView.vue')
const CoachList = () => import('@/views/coach/CoachVue.vue')
const CoachCreate = () => import('@/views/coach/CreateVue.vue')
const CoachDetail = () => import('@/views/coach/CoachDetail.vue')

const PlanList = () => import('@/views/plan/PlanView.vue')
const PlanCreate = () => import('@/views/plan/CreateView.vue')
const PlanUpdate = () => import('@/views/plan/EditView.vue')
export {
    Login,
    ChangePassword,
    PageNotFound,
    ShopList,
    ShopDetail,
    ShopCreate,
    ShopUpdate,
    UserList,
    UserDetail,
    ReserveList,
    ReserveDetail,
    AccountList,
    SessionList,
    PatternList,
    PatternCreate,
    CoachList,
    CoachCreate,
    CoachDetail,
    PlanList,
    PlanCreate,
    PlanUpdate,
}
