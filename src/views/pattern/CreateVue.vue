<template>
    <modal-box
        title="パターン登録"
        width="1193"
        :open="isShowModal"
        @close="oncloseModal"
        @submit="submitData(ruleFormRef)"
    >
        <template v-slot:body>
            <div style="width: 79%; margin: 0 auto">
                <el-form ref="ruleFormRef" status-icon>
                    <el-form-item>
                        <el-row class="w-100">
                            <el-col span="24">
                                <p class="label">パターン名</p>
                                <el-form-item prop="name">
                                    <el-input
                                        v-model="patternName"
                                        class="pattern-input"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, i) in sessionData"
                        v-bind:key="i"
                    >
                        <el-row class="w-100">
                            <el-col :span="11">
                                <p class="label">営業時間</p>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <p class="label">SESSION時間</p>
                            </el-col>
                        </el-row>
                        <el-row class="w-100">
                            <el-col :span="11">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item prop="name">
                                            <el-input
                                                v-model="item.start_time"
                                                class="pattern-input"
                                                :key="`date_${i}`"
                                            />
                                        </el-form-item>
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
                                        <el-form-item prop="name">
                                            <el-input
                                                v-model="item.end_time"
                                                class="pattern-input ml-auto"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <el-select
                                    v-model="item.period_id"
                                    placeholder="Session"
                                    class="pattern-input pattern-select"
                                >
                                    <el-option
                                        :key="'ontion_1'"
                                        :label="'45分'"
                                        :value="45"
                                    />
                                    <el-option
                                        :key="'ontion_2'"
                                        :label="'30分'"
                                        :value="30"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row class="w-100">
                            <el-col span="24">
                                <span
                                    class="add-pattern-btn"
                                    @click="addSessionBlock"
                                >
                                    +営業時間を追加する
                                </span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </modal-box>
</template>
<script setup lang="ts">
import { ref, watch, defineExpose, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { usePatternStore } from '@/stores'
import { forEach } from 'lodash'

const isShowModal = ref(false)
const oncloseModal = () => {
    isShowModal.value = false
    sessionData.value = [
        {
            start_time: '',
            end_time: '',
            period_id: '45',
            period_value: '45',
        },
    ]
    patternName.value = ''
}
let patternId: any = null
const showCreateModal = (item: any) => {
    if (item) {
        patternName.value = item.name
        const tempArr: any[] = []
        item.details.forEach((el: any) => {
            tempArr.push({
                start_time: el.start_time,
                end_time: el.end_time,
                period_id: el.period.id,
                period_value: el.period.value,
            })
        })
        sessionData.value = tempArr
        patternId = item.id
    } else {
        patternId = null
        sessionData.value = [
            {
                start_time: '',
                end_time: '',
                period_id: '45',
                period_value: '45',
            },
        ]
    }
    isShowModal.value = true
}
const ruleFormRef = ref<FormInstance>()
const patternName = ref('')

const addSessionBlock = () => {
    sessionData.value.push({
        start_time: '',
        end_time: '',
        period_id: '45',
        period_value: '45',
    })
}

const data = [
    {
        start_time: '',
        end_time: '',
        period_id: '45',
        period_value: '45',
    },
]

const sessionData = ref(data)

const submitData = (formEl: FormInstance | undefined) => {
    const patternStore = usePatternStore()
    const patternData = {
        name: patternName.value,
        pattern_details: sessionData.value,
    }
    if (patternId) {
        const res = patternStore.updatePattern(patternData, patternId)
    } else {
        const res = patternStore.createPattern(patternData)
    }
    oncloseModal()
    emit('onCreate')
}
defineExpose({
    showCreateModal,
})

const emit = defineEmits(['onCreate'])
</script>
<style scoped lang="scss">
.w-100 {
    width: 100%;
}

.pattern-input {
    &.ml-auto {
        margin-left: auto;
    }

    width: 147px;
}

.pattern-select {
    margin-bottom: 3px;
}

.add-pattern-btn {
    padding: 2px 0;
    cursor: pointer;
    color: #007bff;
    font-size: 16px;
    line-height: 1.5;
}
</style>
