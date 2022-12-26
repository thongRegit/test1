<template>
    <BoxVue :title="t('homepage.users')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <UserSearch @submit="search" @reset="resetForm" />
        </template>
    </BoxVue>
    <BoxVue :title="'プラン一覧'" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <section class="box-list">
                <table-data
                    :data="data"
                    :loading="loading"
                    :columns="columns"
                    :showIndex="false"
                    :showCheckbox="true"
                    @change-page="handleChangePage"
                    @sort="sort"
                    :buttons="buttons"
                    :hasCreate="false"
                    @click-button="handleClickButtonTable"
                    @click-checkbox="handleCheckbox"
                ></table-data>
            </section>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import BoxVue from '@/components/common/BoxVue.vue'
import type {
    PaginateUserParams,
    User,
    UserSearchParam,
} from '@/libs/interface/userInterface'
import type { ParamsList } from '@/libs/interface/commonInterface'
import UserSearch from './UserSearch.vue'
import { findStatus } from '@/libs/utils/common'

const { t } = useI18n()
const router = useRouter()

const listQuery = ref({
    page: 1,
    search: '',
    filters: [{ key: 'is_active', data: 'all' }],
})
const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
} as PaginateUserParams)

const loading = ref(true)
const columns = ref([
    {
        prop: 'full_name',
        label: t('user.columns.full_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'tel',
        label: t('user.columns.tel'),
        sortable: false,
        class: '',
    },
    {
        prop: 'created_at',
        label: t('user.columns.created_at'),
        sortable: false,
        class: '',
    },
    {
        prop: 'first_experience_date',
        label: t('user.columns.first_experience_date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'last_session_date',
        label: t('user.columns.last_session_date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'is_active',
        label: t('user.columns.is_active'),
        sortable: false,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'users-detail', params: { id: row.id } })
    }
}

const handleCheckbox = () => {}

const getListData = async () => {
    let query: ParamsList = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 10,
        filters: '',
    }
    query.filters = JSON.stringify(listQuery.value.filters)

    const userStore = useUserStore()
    await userStore.listUser(query)
    data.value.total = userStore.users.total
    data.value.currentPage = userStore.users.current_page
    data.value.perPage = userStore.users.per_page
    data.value.records = userStore.users.data.map((e: User) => {
        const status: any = findStatus(e.is_active)
        return {
            id: e.id,
            full_name: e.full_name,
            tel: e.tel,
            created_at: e.created_at,
            first_experience_date: e.first_experience_date,
            last_session_date: e.last_session_date,
            is_active: status.display,
        }
    })
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const search = (search: UserSearchParam) => {
    loading.value = true
    listQuery.value.search = search.search
    listQuery.value.filters = [{ key: 'is_active', data: search.is_active }]
    listQuery.value.page = 1
    getListData()
}

const sort = (sortProps: any) => {
    sortProp.key = sortProps.prop
    sortProp.dir = sortProps.order
    listQuery.value.page = 1
    getListData()
}

const resetForm = () => {
    listQuery.value.page = 1
    listQuery.value.search = ''
    listQuery.value.filters = [{ key: 'is_active', data: 'all' }]
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
