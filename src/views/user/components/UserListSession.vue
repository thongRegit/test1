<template>
    <section class="box-list">
        <table-data
            :data="data"
            :loading="loading"
            :columns="columns"
            :showIndex="false"
            :showCheckbox="false"
            @cell-click="cellClick"
            @change-page="handleChangePage"
            @sort="sort"
            :buttons="buttons"
            :hasCreate="false"
            @click-button="handleClickButtonTable"
        ></table-data>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'

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
} as any)

const loading = ref(true)
const columns = ref([
    {
        prop: 'date',
        label: t('user.columns.sessions.date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'shop_name',
        label: t('user.columns.sessions.shop_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'plan_name',
        label: t('user.columns.sessions.plan_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'coach_name',
        label: t('user.columns.sessions.coach_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'status',
        label: t('user.columns.sessions.status'),
        sortable: false,
        class: '',
    },
])
const buttons = ref([
    { id: '1', label: '編集', icon: 'Monitor', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        router.push({ name: 'users-update', params: { id: row.id } })
    }
}

const getListData = async () => {
    let query: any = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        'filters[0][key]': listQuery.value.filters[0].key,
        'filters[0][data]': listQuery.value.filters[0].data,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 20,
    }

    const id = router.currentRoute.value.params.id

    const userStore = useUserStore()
    await userStore.listUserSession(query, id)
    data.value.total = userStore.session_users.total
    data.value.currentPage = userStore.session_users.current_page
    data.value.perPage = userStore.session_users.per_page
    data.value.records = userStore.session_users.data.map((e: any) => {
        return {
            id: e.id,
            date: e.date,
            shop_name: e.shop_name,
            plan_name: e.plan_name,
            coach_name: e.coach_first_name + ' ' + e.coach_last_name,
            status: e.status,
        }
    })
    loading.value = false
}

const handleChangePage = (page: any) => {
    loading.value = true
    listQuery.value.page = page
    getListData()
}

const cellClick = (row: any, column: any) => {
    if (column.property === 'name') {
        router.push({
            name: 'users-detail',
            params: { id: row.id },
            replace: true,
        })
    }
}

const sort = (sortProps: any) => {
    sortProp.key =
        sortProps.prop === 'full_name' ? 'first_name' : sortProps.prop
    sortProp.dir = sortProps.order
    listQuery.value.page = 1
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style scoped lang="scss"></style>
