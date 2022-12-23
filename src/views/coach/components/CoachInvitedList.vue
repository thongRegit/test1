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
            :hasCreate="false"
            @click-checkbox="handleCheckbox"
        ></table-data>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useCoachStore } from '@/stores'
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
        prop: 'full_name',
        label: t('coach.columns.invited.full_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'created_at',
        label: t('coach.columns.invited.created_at'),
        sortable: false,
        class: '',
    },
])

const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleCheckbox = () => {}

const getListData = async () => {
    let query: any = {
        'orders[0][key]': sortProp.key,
        'orders[0][dir]': sortProp.dir,
        page: listQuery.value.page,
        search: listQuery.value.search,
        per_page: 10,
        filters: '',
    }
    query.filters = JSON.stringify(listQuery.value.filters)

    const id = router.currentRoute.value.params.id

    const coachStore = useCoachStore()
    await coachStore.listCoachInvited(query, id)
    data.value.total = coachStore.invited_coaches.total
    data.value.currentPage = coachStore.invited_coaches.current_page
    data.value.perPage = coachStore.invited_coaches.per_page
    data.value.records = coachStore.invited_coaches.data.map((e: any) => {
        return {
            id: e.id,
            created_at: e.created_at,
            full_name: e.full_name,
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
    sortProp.key = sortProps.prop
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
