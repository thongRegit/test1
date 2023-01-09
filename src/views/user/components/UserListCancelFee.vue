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
        title="ユーザー詳細"
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
                                {{ statusModal.userData.date }}
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
                                {{ statusModal.userData.shop_name }}
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
                                {{ statusModal.userData.plan_name }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-row class="full-width mt-4 mb-4">
                        <el-col :span="6" class="pr-10">
                            <p class="label">
                                {{
                                    t(
                                        'user.columns.cancel_fees.cancelling_pay_status'
                                    )
                                }}:
                            </p>
                        </el-col>
                        <el-col :span="18">
                            <el-select v-model="cancellingPayStatus">
                                <el-option
                                    v-for="(
                                        value, key
                                    ) in CANCELLING_PAY_STATUS_USERS"
                                    :key="key"
                                    :label="value"
                                    :value="key"
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
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useUserStore, useReserveStore } from '@/stores'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue3-i18n'
import {
    FORMAT_DAY_WIDTH_TIME,
    CANCELLING_PAY_STATUS_USERS,
} from '@/libs/constants/constants'

const { t } = useI18n()
const router = useRouter()
const cancellingPayStatus = ref(0)

const statusModal = reactive({
    isUpdateOpen: false,
    userData: {
        date: '',
        id: '',
        plan_name: '',
        shop_name: '',
        status: '',
        amount: '',
        cancelling_pay_status: '',
    },
    refresh: 1,
})

const props = defineProps(['tabTitle'])
watch(
    () => props.tabTitle,
    () => {
        if (
            props.tabTitle == t('user.tabs.3') &&
            localStorage.getItem('status')
        ) {
            getListData()
        }
    }
)

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
        label: t('user.columns.cancel_fees.date'),
        sortable: false,
        class: '',
    },
    {
        prop: 'shop_name',
        label: t('user.columns.cancel_fees.shop_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'plan_name',
        label: t('user.columns.cancel_fees.plan_name'),
        sortable: false,
        class: '',
    },
    {
        prop: 'amount',
        label: t('user.columns.cancel_fees.amount'),
        sortable: false,
        class: '',
    },
    {
        prop: 'cancelling_pay_status',
        label: t('user.columns.cancel_fees.cancelling_pay_status'),
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
        statusModal.userData = row
        statusModal.isUpdateOpen = true
        cancellingPayStatus.value = row.cancelling_pay_status
    }
}

const closeUpdateModal = () => {
    statusModal.isUpdateOpen = false
}

const updateStatus = async () => {
    if (cancellingPayStatus.value in CANCELLING_PAY_STATUS_USERS) {
        const payload = {
            cancelling_pay_status: cancellingPayStatus.value,
            status: statusModal.userData.status,
        }
        const sessionStore = useReserveStore()
        await sessionStore.updateReserve(payload, statusModal.userData.id)
        await getListData()
    }
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
    await userStore.listUserCancelFee(query, id)
    data.value.total = userStore.cancel_fee_users.total
    data.value.currentPage = userStore.cancel_fee_users.current_page
    data.value.perPage = userStore.cancel_fee_users.per_page
    data.value.records = userStore.cancel_fee_users.data?.map((e: any) => {
        return {
            id: e.id,
            date: FORMAT_DAY_WIDTH_TIME(e.date, e.start_time, e.end_time),
            shop_name: e.shop_name,
            plan_name: e.plan_name,
            amount: e.amount,
            cancelling_pay_status:
                CANCELLING_PAY_STATUS_USERS[e.cancelling_pay_status],
            status: e.status,
            cancelling_pay_status_id: e.cancelling_pay_status,
        }
    })
    loading.value = false
    localStorage.setItem('status', '')
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
