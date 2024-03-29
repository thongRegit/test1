<template>
    <BoxVue
        :title="t('shop.details.store_details')"
        :type="'table'"
        :padding="20"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <div class="shop-detail-block mb-7">
                <div
                    class="header-wrapper flex justify-between align-items-center p-4"
                >
                    <h4 class="title">
                        {{ t('shop.details.basic_settings') }}
                    </h4>
                    <el-button
                        type="primary"
                        @click="updateShopDetail(ruleFormRef)"
                    >
                        {{ t('shop.details.renew') }}
                    </el-button>
                </div>
                <div class="detail-body px-7 custom">
                    <el-form
                        ref="ruleFormRef"
                        :model="shopDetail"
                        :rules="rules"
                        status-icon
                    >
                        <el-form-item class="large-input" prop="name">
                            <p class="required">
                                {{ t('shop.details.shop_name') }}
                            </p>
                            <el-input
                                v-model="shopDetail.name"
                                type="text"
                                autocomplete="off"
                                @change="onChangeName"
                            />
                        </el-form-item>
                        <el-form-item class="small-input" prop="station_amount">
                            <p class="required">
                                {{ t('shop.details.number_stations') }}
                            </p>
                            <el-input
                                v-model="shopDetail.station_amount"
                                type="number"
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item prop="is_active">
                            <p class="label">
                                {{ t('shop.details.is_active') }}
                            </p>
                            <el-switch
                                v-model="shopStatus"
                                @change="onChangeStatus"
                            />
                            <span style="padding-left: 8px">{{
                                shopStatus
                                    ? t('shop.details.value.is_active.active')
                                    : t('shop.details.value.is_active.inactive')
                            }}</span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="shop-detail-block pb-18">
                <div
                    class="header-wrapper flex justify-between align-items-center p-4"
                >
                    <h4 class="title">
                        {{ t('shop.details.individual_settings') }}
                    </h4>
                </div>
                <div
                    class="bussieness-hours-item px-13 mb-5"
                    v-for="(stItem, settingIdx) in individualSettings"
                    :key="stItem.id"
                >
                    <el-checkbox
                        :label="stItem.dayName"
                        name="type"
                        v-model="stItem.checked"
                        @change="onActiveSetting(settingIdx, $event)"
                    />
                    <div>
                        <el-select
                            v-model="stItem.patternIndex"
                            :placeholder="t('shop.details.choice')"
                            :disabled="!stItem.checked"
                            class="pattern-input pattern-select"
                            :fit-input-width="true"
                            :filterable="true"
                            @change="
                                updatePatternForSetting(settingIdx, $event)
                            "
                        >
                            <el-option
                                v-for="(item, index) in patternList"
                                :key="`${stItem.id}_${item.id}`"
                                :label="item.name"
                                :value="index"
                            />
                        </el-select>
                    </div>
                    <div
                        class="detail-session-wrapper mt-5"
                        v-show="stItem.isShowDetail"
                    >
                        <el-row class="title">
                            <el-col :span="11"></el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <p>{{ t('pattern.session_time') }}</p>
                            </el-col>
                        </el-row>
                        <div class="sessions">
                            <el-row
                                class="item"
                                v-for="(
                                    ssItem, index
                                ) in stItem?.currentSessionsList"
                                :key="`${ssItem.id}_${index}`"
                            >
                                <el-col :span="11">
                                    <el-row class="align-items-center">
                                        <el-col :span="10">
                                            <span class="text-info">
                                                {{ ssItem.start_time }}
                                            </span>
                                        </el-col>
                                        <el-col :span="4">
                                            <div
                                                class="text-gray-500 text-center"
                                            >
                                                ~
                                            </div>
                                        </el-col>
                                        <el-col :span="10">
                                            <span
                                                class="text-info"
                                                style="margin-left: auto"
                                            >
                                                {{ ssItem.end_time }}
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="13" style="padding-left: 60px">
                                    <span class="text-info">
                                        {{
                                            `${ssItem?.period?.value} ${t(
                                                'pattern.minute'
                                            )}`
                                        }}
                                    </span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import { useI18n } from 'vue3-i18n'
import { ref, onMounted, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { useShopStore, usePatternStore } from '@/stores'
import type {
    Shop,
    BusinessHour,
    UpdateShopPayload,
    BusinessHourForAPI,
    ShopDetailPayload,
    IndividualSetting,
} from '@/libs/interface/shopInterface'
import type { Pattern } from '@/libs/interface/patternInterface'
import { dayList } from '@/libs/constants/constants'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const { t } = useI18n()
const individualData: Array<IndividualSetting> = [
    {
        id: 2,
        dayName: dayList[2],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 3,
        dayName: dayList[3],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 4,
        dayName: dayList[4],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 5,
        dayName: dayList[5],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 6,
        dayName: dayList[6],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 7,
        dayName: dayList[7],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
    {
        id: 1,
        dayName: dayList[1],
        isShowDetail: false,
        checked: false,
        currentSessionsList: [],
    },
]

const shopStore = useShopStore()
const patternStore = usePatternStore()
const route = useRoute()
const id: string | string[] = route.params.id
const shopDetail = reactive({
    id: -1,
    name: null,
    station_amount: null,
} as Shop)
const patternList = ref([] as Array<Pattern>)
const currentPattern = ref({} as Pattern)
const currentPatternIndex = ref()

const individualSettings = ref(individualData)
const shopStatus = ref(false)
const onChangeStatus = () => {
    shopStatus.value = shopStatus.value ? true : false
}
const getShopDetail = async () => {
    const payload: ShopDetailPayload = { id }
    await shopStore.getDetailShop(payload)
    shopDetail.name = shopStore.shopDetail.name
    shopDetail.station_amount = shopStore.shopDetail.station_amount
    shopDetail.id = shopStore.shopDetail.id
    shopStatus.value = shopStore.shopDetail.status == 1
    if (shopStore.shopDetail.business_hours.length) {
        shopStore.shopDetail.business_hours.forEach((el: BusinessHour) => {
            individualSettings.value.forEach((setting: IndividualSetting) => {
                if (setting.id === el.day) {
                    setting.currentSessionsList = [
                        ...(el.business_hour_details?.length
                            ? el.business_hour_details
                            : []),
                    ]
                    setting.isShowDetail = true
                    setting.checked = true
                }
            })
        })
    } else {
        individualSettings.value.forEach((setting: IndividualSetting) => {
            setting.currentSessionsList = []
            setting.isShowDetail = false
            setting.patternIndex = undefined
        })
    }
}

const getListPattern = async () => {
    let query = {
        all: 1,
    }
    await patternStore.listPattern(query)
    patternList.value = patternStore.allPatterns.map((el: Pattern) => {
        return {
            name: el.name,
            id: el.id,
            details: el.pattern_details,
        }
    })
}

const updatePatternForSetting = (index: number, value: number) => {
    individualSettings.value[index].patternIndex = value
    patternList?.value[value].details
    individualSettings.value[index].currentSessionsList =
        patternList.value[value].details
    individualSettings.value[index].isShowDetail = true
}

const onUpdatePattern = () => {
    individualSettings.value.forEach((el) => {
        el.patternIndex = currentPatternIndex.value
        el.currentSessionsList =
            patternList.value[currentPatternIndex.value].details
    })
}

const onActiveSetting = (index: number, value: any) => {
    if (!value) {
        individualSettings.value[index].isShowDetail = false
    } else {
        if (
            typeof individualSettings.value[index].patternIndex !== 'undefined'
        ) {
            individualSettings.value[index].isShowDetail = true
        }
    }
}

const updateShopDetail = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const business_hours: Array<BusinessHourForAPI> = []
            individualSettings.value.forEach((el) => {
                if (el.isShowDetail && el.currentSessionsList?.length) {
                    el.currentSessionsList.forEach((sItem) => {
                        const data: BusinessHourForAPI = {
                            day: el.id,
                            period_id: sItem.period?.id,
                            start_time: sItem.start_time,
                            end_time: sItem.end_time,
                        }
                        business_hours.push(data)
                    })
                }
            })

            const payloadData: UpdateShopPayload = {
                id: shopDetail.id,
                name: shopDetail.name ? shopDetail.name.trim() : '',
                station_amount: shopDetail.station_amount,
                status: shopStatus.value ? 1 : 0,
                business_hours,
            }

            const res = await shopStore.updateShop(payloadData, shopDetail.id)
            if (res.success) {
                router.push({
                    name: 'shops',
                    replace: true,
                })
            }
        } else {
            return false
        }
    })
}

const checkStationAmount = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(
            new Error(
                t('validation.required', {
                    '0': t('shop.columns.station_amount'),
                })
            )
        )
    }
    if (value < 1) {
        callback(
            new Error(
                t('validation.min.numeric', {
                    '0': t('shop.columns.station_amount'),
                    '1': '1',
                })
            )
        )
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: t('validation.required', { '0': t('shop.columns.name') }),
            trigger: 'blur',
        },
        {
            message: t('validation.max.string', [t('shop.columns.name'), 255]),
            max: 255,
            trigger: 'blur',
        },
    ],
    station_amount: [{ validator: checkStationAmount, trigger: 'blur' }],
})

const onChangeName = () => {
    shopDetail.name = shopDetail.name?.trim()
}

watch(
    currentPattern,
    async () => {
        onUpdatePattern()
    },
    { deep: true }
)

onMounted(() => {
    getShopDetail()
    getListPattern()
})
</script>

<style lang="scss" scoped>
.large-input {
    width: 233px;
}
.small-input {
    width: 143px;
}
h4.title {
    font-size: 24px;
    color: #171725;
    line-height: 1.2;
}
.shop-detail-block {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
}

.detail-session-wrapper {
    width: 950px;
}
</style>
