<template>
    <BoxVue
        :title="t('pattern.pattern_management')"
        :type="'table'"
        :padding="20"
        :btnCreate="true"
        @on-create="onClickCreateBtn"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <Document />
            </el-icon>
        </template>
        <template v-slot:body>
            <div class="pattern-list-wrapper">
                <div class="pattern-list pl-5 mt-5">
                    <div
                        class="pattern-item"
                        v-for="(ptItem, index) in data.records"
                        :key="index"
                    >
                        <div class="title-wrapper">
                            <h5>{{ ptItem?.name }}</h5>
                            <el-icon
                                :size="20"
                                :color="'#007BFF'"
                                @click="onClickEditBtn(ptItem)"
                                class="cursor-pointer"
                            >
                                <Edit />
                            </el-icon>
                        </div>
                        <div class="detail-session-wrapper mt-7">
                            <el-row class="title">
                                <el-col :span="10">
                                    <p>{{ t('pattern.business_hours') }}</p>
                                </el-col>
                                <el-col :span="5" style="padding-left: 60px">
                                    <p>{{ t('pattern.session_time') }}</p>
                                </el-col>
                            </el-row>
                            <div class="sessions">
                                <el-row
                                    class="item"
                                    v-for="(ssItem, index) in ptItem.details"
                                    :key="index"
                                >
                                    <el-col :span="10">
                                        <el-row>
                                            <el-col :span="10">
                                                <span class="text-info">
                                                    {{
                                                        ssItem.start_time
                                                    }}</span
                                                >
                                            </el-col>
                                            <el-col :span="4">
                                                <div
                                                    class="text-gray-500 text-center"
                                                >
                                                    ~
                                                </div>
                                            </el-col>
                                            <el-col
                                                :span="10"
                                                class="flex justify-right"
                                            >
                                                <span class="text-info last">{{
                                                    ssItem.end_time
                                                }}</span>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col
                                        :span="5"
                                        style="padding-left: 60px"
                                    >
                                        <span class="text-info">
                                            {{
                                                `${ssItem.period.value}${t(
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
                <div class="table-pagination pl-5 mt-5 flex justify-right">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="data.total"
                        :page-size="data.perPage"
                        :currentPage="data.currentPage"
                        @current-change="handleChangePage"
                    />
                </div>
            </div>
        </template>
    </BoxVue>
    <create-pattern ref="createModalRef" @onCreate="onCreatePattern" />
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import { ref, watch, onMounted, nextTick } from 'vue'
import CreatePattern from './CreateView.vue'
import { usePatternStore } from '@/stores'
import type { Pattern } from '@/libs/interface/patternInterface'
import { useI18n } from 'vue3-i18n'
import { perPage } from '@/libs/constants/constants'

const { t } = useI18n()
const createModalRef = ref()
const onClickCreateBtn = () => {
    createModalRef.value?.showCreateModal()
}
const patternStore = usePatternStore()
const listQuery = ref({
    page: 1,
})

const data = ref({
    currentPage: 1,
    lastPage: 0,
    records: [] as Array<Pattern>,
    total: 0,
    perPage,
})

const getListData = async () => {
    let query = {
        page: listQuery.value.page,
    }

    await patternStore.listPattern(query)
    data.value.total = patternStore.patterns.total
    data.value.currentPage = patternStore.patterns.current_page
    data.value.records = patternStore.patterns.data.map((e: Pattern) => {
        return {
            name: e.name,
            id: e.id,
            details: e.details,
        }
    })
}

const onClickEditBtn = (item: Pattern) => {
    // patternStore.setPatternItem(item)
    createModalRef.value?.showCreateModal(item)
}

const onCreatePattern = async () => {
    await getListData()
}

const handleChangePage = async (page: number) => {
    listQuery.value.page = page
    getListData()
}

watch(
    listQuery,
    async () => {
        await getListData()
    },
    { deep: true }
)

onMounted(async () => {
    await nextTick()
    await getListData()
})
</script>

<style lang="scss">
.pattern-list-wrapper {
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 45px;

        h4 {
            color: #212529;
            font-size: 24px;
            font-weight: bold;
        }
    }

    .pattern-list {
        .pattern-item {
            border: 1px solid #707070;
            background: white;
            font-size: 16px;
            padding: 22px 68px 22px 20px;
            margin-bottom: 15px;
            &:last-child {
                margin-bottom: 0;
            }
            .title-wrapper {
                display: flex;
                align-items: center;
                h5 {
                    font-size: 16px;
                    color: #212529;
                    font-weight: bold;
                    margin-right: 20px;
                }
            }
            .detail-session-wrapper {
                width: 950px;
            }
        }
    }
}
</style>
