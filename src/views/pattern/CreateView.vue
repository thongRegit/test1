<template>
    <modal-box
        :title="t('pattern.pattern_registration')"
        width="1193"
        :open="isShowModal"
        @close="oncloseModal"
        @submit="submitData(ruleFormRef)"
    >
        <template v-slot:body>
            <div style="width: 79%; margin: 0 auto">
                <el-form ref="ruleFormRef" status-icon>
                    <el-form-item>
                        <el-row class="full-width">
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
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col :span="11">
                                <p class="label">
                                    {{ t('pattern.business_hours') }}
                                </p>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <p class="label">
                                    {{ t('pattern.session_time') }}
                                </p>
                            </el-col>
                        </el-row>
                        <el-row
                            class="full-width sesion-row"
                            v-for="(item, i) in sessionData"
                            :key="i"
                        >
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
                                            class="text-gray-500 text-align-center"
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
                                        v-for="item in periods"
                                        :key="item.id"
                                        :label="`${item.value}分`"
                                        :value="item.id"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col span="24">
                                <span
                                    class="add-pattern-btn"
                                    @click="addSessionBlock"
                                >
                                    {{ t('pattern.add_business_hours') }}
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
import { ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { usePatternStore } from '@/stores'
import type {
    Period,
    Session,
    Pattern,
    SessionEl,
} from '@/libs/interface/patternInterface'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
const patternStore = usePatternStore()
const isShowModal = ref(false)
const periods = ref([] as Array<Period>)

const getPeriodData = async () => {
    await patternStore.getPeriod()
    periods.value = patternStore.periods?.map((e: Period) => {
        return {
            id: e.id,
            value: e.value,
        }
    })
}
const oncloseModal = () => {
    isShowModal.value = false
    sessionData.value = [
        {
            start_time: '',
            end_time: '',
            period_id: periods.value[0]?.id,
            period_value: periods.value[0]?.value,
        },
    ]
    patternName.value = ''
}
let patternId: number = 0
const showCreateModal = (item: Pattern) => {
    if (item) {
        patternName.value = item.name
        const tempArr: Array<Session> = []
        item.details.forEach((el: SessionEl) => {
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
        patternId = 0
        sessionData.value = [
            {
                start_time: '',
                end_time: '',
                period_id: periods.value[0]?.id,
                period_value: periods.value[0]?.value,
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
        period_id: periods.value[0]?.id,
        period_value: periods.value[0]?.value,
    })
}

const data: Array<Session> = [
    {
        start_time: '',
        end_time: '',
        period_id: periods.value[0]?.id,
        period_value: periods.value[0]?.value,
    },
]

const sessionData = ref(data)

const submitData = async (formEl: FormInstance | undefined) => {
    const patternData = {
        name: patternName.value,
        pattern_details: sessionData.value,
    }
    if (patternId) {
        await patternStore.updatePattern(patternData, patternId, () => {
            emit('onCreate')
            oncloseModal()
        })
    } else {
        await patternStore.createPattern(patternData, () => {
            emit('onCreate')
            oncloseModal()
        })
    }
}
defineExpose({
    showCreateModal,
})

const emit = defineEmits(['onCreate'])

onMounted(async () => {
    getPeriodData()
})
</script>
<style scoped lang="scss">
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

.sesion-row {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
