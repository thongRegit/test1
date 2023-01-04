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
    <modal-box
        title="エナジスト詳細"
        :open="statusModal.isUpdateOpen"
        width="50%"
        @close="closeUpdateModal"
        @submit="updateStatus"
    >
        <template v-slot:body>
            <div class="pattern-form">
                <el-form ref="ruleFormRef" status-icon class="update-form">
                    <el-row class="full-width">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('user.columns.sessions.date') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.userSessionData.date }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('user.columns.sessions.shop_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.userSessionData.shop_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('user.columns.sessions.plan_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.userSessionData.plan_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4">
                        <el-col :span="6">
                            <p class="label">
                                {{ t('user.columns.sessions.coach_name') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <p class="label">
                                {{ statusModal.userSessionData.coach_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4 mb-4">
                        <el-col :span="6" class="pr-10">
                            <p class="label">
                                {{ t('user.columns.sessions.status') }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="statusModel">
                                <el-option
                                    v-for="item in ORDER_STATUS"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </template>
    </modal-box>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useUserStore, useReserveStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import { FORMAT_DAY_WIDTH_TIME, STATUS_USERS } from '@/libs/constants/constants'
import { ORDER_STATUS } from '@/libs/constants/orders'

const { t } = useI18n()
const router = useRouter()
const statusModel = ref(0)
const statusModelOld = ref(0)

const statusModal = reactive({
    isUpdateOpen: false,
    userSessionData: {
        coach_name: '',
        date: '',
        id: '',
        plan_name: '',
        shop_name: '',
        status: '',
        status_id: '',
    },
    refresh: 1,
})

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
    { id: '1', label: '編集', class: 'btn-action btn-update' },
])
const sortProp = reactive({ key: 'id', dir: 'descending' })

const handleClickButtonTable = (classList: any, row: any) => {
    if (classList.includes('btn-update')) {
        statusModal.refresh += 1
        statusModal.userSessionData = row
        statusModal.isUpdateOpen = true
        statusModel.value = row.status_id
        statusModelOld.value = row.status_id
    }
}

const closeUpdateModal = () => {
    statusModal.isUpdateOpen = false
}

const updateStatus = async () => {
    const payload = {
        status: statusModel.value,
    }
    const sessionStore = useReserveStore()
    await sessionStore.updateReserve(payload, statusModal.userSessionData.id)
    await getListData()
    const value = parseInt(Object.keys(STATUS_USERS)[1])
    if (statusModel.value == value || statusModelOld.value == value)
        localStorage.setItem('status', 'true')
    statusModal.isUpdateOpen = false
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
        const fullName =
            (e.coach_first_name ? e.coach_first_name : '') +
            (e.coach_last_name ? e.coach_last_name : '')
        return {
            id: e.id,
            date: FORMAT_DAY_WIDTH_TIME(e.date, e.start_time, e.end_time),
            shop_name: e.shop_name,
            plan_name: e.plan_name,
            coach_name: fullName,
            status: STATUS_USERS[e.status],
            status_id: e.status,
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
