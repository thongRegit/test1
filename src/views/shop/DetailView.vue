<template>
    <h4 class="title mb-3">{{ t('shop.details.store_details') }}</h4>
    <div class="shop-detail-block pb-18 mb-7">
        <div class="header-wrapper flex justify-between align-items-center p-4">
            <h4 class="title">{{ t('shop.details.basic_settings') }}</h4>
            <el-button type="primary" @click="updateShopDetail">
                {{ t('shop.details.renew') }}
            </el-button>
        </div>
        <div class="detail-body px-7">
            <el-form-item class="large-input">
                <el-input
                    v-model="shopDetail.name"
                    type="text"
                    autocomplete="off"
                />
            </el-form-item>

            <el-form-item class="small-input">
                <p>{{ t('shop.details.number_stations') }}</p>
                <el-input
                    v-model="shopDetail.station_amount"
                    type="text"
                    autocomplete="off"
                />
            </el-form-item>

            <el-form-item class="small-input">
                <p>{{ t('shop.details.business_hours_setting') }}</p>
                <el-select
                    v-model="currentPattern.id"
                    :placeholder="t('shop.details.choice')"
                    class="pattern-input pattern-select"
                    @change="updatePattern"
                >
                    <el-option
                        v-for="(item, index) in patternList"
                        :key="item.id"
                        :label="item.name"
                        :value="index"
                    />
                </el-select>
            </el-form-item>
            <div class="detail-session-wrapper mt-7">
                <el-row class="title">
                    <el-col :span="11">
                        <p>{{ t('pattern.business_hours') }}</p>
                    </el-col>
                    <el-col :span="13" style="padding-left: 60px">
                        <p>{{ t('pattern.session_time') }}</p>
                    </el-col>
                </el-row>
                <div class="sessions">
                    <el-row
                        class="item"
                        v-for="(ssItem, index) in currentPattern.details"
                        :key="index"
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
                                        class="text-gray-500 text-align-center"
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
    <div class="shop-detail-block pb-18">
        <div class="header-wrapper flex justify-between align-items-center p-4">
            <h4 class="title">{{ t('shop.details.individual_settings') }}</h4>
        </div>
        <div
            class="bussieness-hours-item px-13 mb-5"
            v-for="(stItem, settingIdx) in individuaSettings"
            :key="stItem.id"
        >
            <h5 class="text-bold">{{ t('shop.details.business_hours') }}</h5>
            <el-checkbox
                :label="stItem.dayName"
                name="type"
                v-model="stItem.isShowDetail"
                @change="onActiveSetting(settingIdx, $event)"
            />
            <div>
                <el-select
                    v-model="stItem.patternIndex"
                    :placeholder="t('shop.details.choice')"
                    class="pattern-input pattern-select"
                    @change="updatePatternForSetting(settingIdx, $event)"
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
                    <el-col :span="11">
                        <p>{{ t('pattern.business_hours') }}</p>
                    </el-col>
                    <el-col :span="13" style="padding-left: 60px">
                        <p>{{ t('pattern.session_time') }}</p>
                    </el-col>
                </el-row>
                <div class="sessions">
                    <el-row
                        class="item"
                        v-for="(ssItem, index) in stItem?.currentSessionsList"
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
                                        class="text-gray-500 text-align-center"
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

<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore, usePatternStore } from '@/stores'
import type {
    Shop,
    BusinessHour,
    UpdateShopPayload,
    BusinessHourForAPI,
    ShopDetailPayload
} from '@/libs/interface/shopInterface'
import type { Pattern } from '@/libs/interface/patternInterface'
import { individualData } from '@/libs/constants/constants'
const shopStore = useShopStore()
const patternStore = usePatternStore()
const route = useRoute()
const id: number = route.params.id

const { t } = useI18n()

const shopDetail = ref({} as Shop)
const patternList = ref([] as Array<Pattern>)
const currentPattern = ref({} as Pattern)
const currentPatternIndex = ref()

const individuaSettings = ref(individualData)
const getShopDetail = async () => {
    const payload: ShopDetailPayload = {id}
    await shopStore.getDetailShop(payload)
    shopDetail.value = shopStore.shopDetail
    shopStore.shopDetail.business_hours.forEach((el: BusinessHour) => {
        individuaSettings.value[el.day - 1].currentSessionsList = [
            ...(el.business_hour_details?.length
                ? el.business_hour_details
                : []),
        ]
        individuaSettings.value[el.day - 1].isShowDetail = true
    })
}

const getListPattern = async () => {
    let query = {
        page: 1,
    }
    await patternStore.listPattern(query)
    patternList.value = patternStore.patterns.data.map((el: Pattern) => {
        return {
            name: el.name,
            id: el.id,
            details: el.details,
        }
    })
}

const updatePattern = (index: number) => {
    if (patternList.value.length) {
        currentPattern.value = { ...patternList.value[index] }
        currentPatternIndex.value = index
    }
}

const updatePatternForSetting = (index: number, value: number) => {
    individuaSettings.value[index].patternIndex = value
    patternList?.value[value]?.details
    individuaSettings.value[index].currentSessionsList = [
        ...(patternList.value[value].details?.length
            ? patternList.value[value].details
            : []),
    ]
}

const onUpdatePattern = () => {
    individuaSettings.value.forEach((el) => {
        el.patternIndex = currentPatternIndex.value
        el.currentSessionsList = [
            ...patternList.value[currentPatternIndex.value].details,
        ]
    })
}

const onActiveSetting = (index: number, value: any) => {
    individuaSettings.value[index].isShowDetail = value
}

const updateShopDetail = async () => {
    const business_hours: Array<BusinessHourForAPI> = []
    individuaSettings.value.forEach((el) => {
        if (el.isShowDetail && el.currentSessionsList.length) {
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
        id: shopDetail.value.id,
        name: shopDetail.value.name,
        station_amount: shopDetail.value.station_amount,
        status: shopDetail.value.status,
        business_hours,
    }

    await shopStore.updateShop(payloadData, shopDetail.value.id)
    getShopDetail()
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
</style>
