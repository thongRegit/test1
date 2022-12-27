<template>
    <BoxVue
        :title="t('session.title')"
        :type="'table'"
        :padding="20"
        :btnCreate="false"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <div class="">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                    <el-row class="full-width">
                        <el-col :span="14">
                            <el-row class="items-end">
                                <div class="w-40">
                                    <p class="label">
                                        {{ t('session.shop') }}
                                    </p>
                                    <el-col :span="20">
                                        <el-form-item prop="shop">
                                            <el-select
                                                v-model="ruleForm.shop"
                                                @change="shopChange"
                                            >
                                                <el-option
                                                    v-for="item in shopArr"
                                                    :key="item.id"
                                                    :label="`${item.name}`"
                                                    :value="item.id"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </div>
                                <div class="w-40">
                                    <p class="label">
                                        {{ t('session.station') }}
                                    </p>
                                    <el-col :span="20">
                                        <el-form-item prop="station">
                                            <el-select
                                                v-model="ruleForm.station"
                                                placeholder=""
                                                @change="stationChange"
                                            >
                                                <el-option
                                                    v-for="item in stations"
                                                    :key="item"
                                                    :label="`${item}`"
                                                    :value="item"
                                                />
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </div>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row class="items-end justify-between">
                                <el-col :span="12">
                                    <p class="label">{{ t('session.date') }}</p>
                                    <el-date-picker
                                        v-model="ruleForm.day"
                                        type="date"
                                        :size="'default'"
                                        @change="dateChange"
                                    />
                                </el-col>
                                <el-col :span="10" class="text-right">
                                    <el-button
                                        type="primary"
                                        @click="openUpdateModal(ruleFormRef)"
                                        >{{
                                            t(
                                                'session.buttons.individual_setting'
                                            )
                                        }}</el-button
                                    >
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <SessionCalendar :sessions="sessions" :firstDay="calendarDay" />
            <UpdateSessionModal
                :dialogVisible="isOpen"
                :shopId="ruleForm.shop"
                :stationNumber="ruleForm.station"
                @close="closeUpdateModal"
                @updated="sessionUpdated"
            />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeMount, nextTick } from 'vue'
import SessionCalendar from './components/SessionCalendar.vue'
import BoxVue from '@/components/common/BoxVue.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'
import { useSessionStore, useShopStore } from '@/stores'
import dayjs from 'dayjs'
import UpdateSessionModal from './components/UpdateSessionModal.vue'

const { t } = useI18n()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    shop: null,
    station: null,
    day: dayjs().format('YYYY-MM-DD'),
})

const rules = reactive<FormRules>({
    shop: [
        {
            required: true,
            message: '選択してください。',
            trigger: 'blur',
        },
    ],
    station: [
        {
            required: true,
            message: '選択してください。',
            trigger: 'blur',
        },
    ],
})

const sessions = ref([])
const shopArr = ref([])
const stations = ref(0)
const calendarDay = ref(dayjs().format('YYYY-MM-DD'))

const isOpen = ref(false)

const closeUpdateModal = () => {
    isOpen.value = false
}

const openUpdateModal = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) isOpen.value = true
    })
}

const getListShopData = async () => {
    let query = {
        page: 1,
        per_page: 100,
    }

    const shopStore = useShopStore()
    await shopStore.listShop(query)
    shopArr.value = shopStore.shops.data
}

const shopChange = (value) => {
    let shop = shopArr.value.find((item) => item.id == value)
    stations.value = shop.station_amount
    ruleForm.station = 1
    getListData()
}

const stationChange = () => {
    getListData()
}

const dateChange = (value) => {
    if (value == null) return
    calendarDay.value = dayjs(value).format('YYYY-MM-DD')
    getListData()
}

const getListData = async () => {
    if (ruleForm.shop == null || ruleForm.station == null) return
    let query = {
        shop_id: ruleForm.shop,
        station_number: ruleForm.station,
        start_date: dayjs(ruleForm.day).format('YYYY-MM-DD'),
    }

    const sessionStore = useSessionStore()
    await sessionStore.listSession(query)

    sessions.value = sessionStore.sessions.map((e: any) => {
        return {
            id: e.id,
            title: e.title || '',
            start: e.start,
            end: e.end,
        }
    })
}

const sessionUpdated = () => {
    isOpen.value = false
    getListData()
}

onMounted(async () => {
    await nextTick()
    await getListShopData()
    await getListData()
})
</script>

<style lang="scss">
.w-40 {
    width: 40%;
}
</style>
