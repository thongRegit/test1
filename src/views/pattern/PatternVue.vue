<template>
    <div class="pattern-list-wrapper">
        <div class="header">
            <h4>パターン管理</h4>
            <el-button type="primary" @click="onClickCreateBtn"
                >新規作成</el-button
            >
        </div>
        <div class="pattern-list">
            <div
                class="pattern-item"
                v-for="(ptItem, index) in data.records"
                v-bind:key="index"
            >
                <div class="title-wrapper">
                    <h5>{{ ptItem?.name }}</h5>
                    <el-icon
                        :size="20"
                        :color="'#007BFF'"
                        @click="onClickEditBtn(ptItem)"
                        style="cursor: pointer"
                    >
                        <Edit />
                    </el-icon>
                </div>
                <div class="detail-wrapper">
                    <el-row class="title">
                        <el-col :span="11">
                            <p>営業時間</p>
                        </el-col>
                        <el-col :span="13" style="padding-left: 60px">
                            <p>SESSION時間</p>
                        </el-col>
                    </el-row>
                    <div class="sessions">
                        <el-row
                            class="w-100 item"
                            v-for="(ssItem, index) in ptItem.details"
                            v-bind:key="index"
                        >
                            <el-col :span="11">
                                <el-row>
                                    <el-col :span="10">
                                        <span class="text-info">{{ ssItem.start_time }}</span>
                                    </el-col>
                                    <el-col class="text-center" :span="4">
                                        <div
                                            class="text-gray-500"
                                            style="text-align: center"
                                        >
                                            ~
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <span class="text-info">{{ ssItem.end_time }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <span class="text-info">{{ ssItem.period.value }}分</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <create-pattern ref="createModalRef" @onCreate="onCreatePattern"/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch, onMounted, nextTick } from 'vue'
import CreatePattern from './CreateVue.vue'
import { usePatternStore } from '@/stores'
const createModalRef = ref()
const onClickCreateBtn = () => {
    createModalRef.value?.showCreateModal()
}
const patternStore = usePatternStore()
const listQuery = ref({
    page: 1,
    reloadFlag: false
})

const data = ref({
    currentPage: 1,
    lastPage: 0,
    perPage: 10,
    records: [],
    total: 0,
})

const getListData = async () => {
    let query = {
        page: listQuery.value.page,
        per_page: 10,
    }

    await patternStore.listPattern(query)
    data.value.total = patternStore.patterns.total
    data.value.currentPage = patternStore.patterns.current_page
    data.value.perPage = patternStore.patterns.per_page
    data.value.records = patternStore.patterns.data.map((e: any) => {
        return {
            name: e.name,
            id: e.id,
            details: e.details,
        }
    })
}

const onClickEditBtn = (item: any) => {
    // patternStore.setPatternItem(item)
    createModalRef.value?.showCreateModal(item)
}

const onCreatePattern = async () => {
    await getListData()
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
            color: #171725;
            font-size: 24px;
            font-weight: bold;
        }
    }

    .pattern-list {
        padding-left: 20px;

        .pattern-item {
            border: 1px solid #707070;
            background: white;
            font-size: 16px;
            padding: 22px 68px;
            margin-bottom: 15px;
            &:last-child {
                margin-bottom: 0;
            }
            .title-wrapper {
                display: flex;
                align-items: center;

                h5 {
                    font-size: 16px;
                    color: #171725;
                    font-weight: bold;
                    margin-right: 20px;
                }
            }

            .detail-wrapper {
                margin-top: 26px;

                .title {
                    margin-bottom: 10px;
                    p {
                        font-weight: bold;
                    }
                }

                .sessions {
                    .text-info {
                        display: flex;
                        align-items: center;
                        width: 147px;
                        height: 36px;
                        background: #7f7f7f;
                        padding: 0 18px;
                        border-radius: 5px;
                        color: white;
                    }
                    .item {
                        margin-bottom: 20px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>
