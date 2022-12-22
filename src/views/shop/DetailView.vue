<template>
    <h4 class="title mb-3">{{ t('shops.details.store_details') }}</h4>
    <div class="shop-detail-block pb-18 mb-7">
        <div class="header-wrapper flex justify-between align-items-center p-4">
            <h4 class="title">{{ t('shops.details.basic_settings') }}</h4>
            <el-button type="primary">
                {{ t('shops.details.renew') }}
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
                <p>ステーション数</p>
                <el-input
                    v-model="shopDetail.station_amount"
                    type="text"
                    autocomplete="off"
                />
            </el-form-item>

            <el-form-item class="small-input">
                <p>ステーション数</p>
                <el-select v-model="numberStations" placeholder="選択">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
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
                    <el-row class="item">
                        <el-col :span="11">
                            <el-row class="align-items-center">
                                <el-col :span="10">
                                    <span class="text-info"> zxczxczxc</span>
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
                                        >asdasdasd</span
                                    >
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="13" style="padding-left: 60px">
                            <span class="text-info"> xcvs </span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
    <div class="shop-detail-block pb-18">
        <div class="header-wrapper flex justify-between align-items-center p-4">
            <h4 class="title">個別設定</h4>
        </div>
        <div class="bussieness-hours-item px-13">
            <h5 class="text-bold">営業時間</h5>
            <el-checkbox label="月曜日" name="type" v-model="checked1" />
            <div>
                <el-select
                    v-model="numberStations"
                    placeholder="選択"
                    class="small-input"
                >
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </div>
            <div class="detail-session-wrapper mt-5">
                <el-row class="title">
                    <el-col :span="11">
                        <p>{{ t('pattern.business_hours') }}</p>
                    </el-col>
                    <el-col :span="13" style="padding-left: 60px">
                        <p>{{ t('pattern.session_time') }}</p>
                    </el-col>
                </el-row>
                <div class="sessions">
                    <el-row class="item">
                        <el-col :span="11">
                            <el-row class="align-items-center">
                                <el-col :span="10">
                                    <span class="text-info"> zxczxczxc</span>
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
                                        >asdasdasd</span
                                    >
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="13" style="padding-left: 60px">
                            <span class="text-info"> xcvs </span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue3-i18n'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore, usePatternStore } from '@/stores'
import type { Shop } from '@/libs/interface/shopInterface'
import type { Pattern } from '@/libs/interface/patternInterface'

const shopStore = useShopStore()
const patternStore = usePatternStore()
const route = useRoute()
const id = route.params.id

const { t } = useI18n()

const numberStations = ref('')
const checked1 = ref(true)
const shopDetail = ref({} as Shop)
const patternList = ref([] as Array<Pattern>)

const getShopDetail = async () => {
    await shopStore.getdetailShop({ id })
    shopDetail.value = shopStore.shopDetail
    console.log('shopDetail', shopStore.shopDetail)
}

const getListPattern = async () => {
    let query = {
        page: 1,
    }
    await patternStore.listPattern(query)
    patternList.value = patternStore.patterns.data.map((e: Pattern) => {
        return {
            name: e.name,
            id: e.id,
            details: e.details,
        }
    })
    console.log('patternList.value: ', patternList.value)
}

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
