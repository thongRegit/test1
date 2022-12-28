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
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    status-icon
                >
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col span="24">
                                <p class="label required">{{ t('pattern.pattern_name') }}</p>
                                <el-form-item prop="name">
                                    <el-input
                                        v-model="ruleForm.name"
                                        class="pattern-input base-input"
                                        size="large"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col :span="11">
                                <p class="label required">
                                    {{ t('pattern.business_hours') }}
                                </p>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <p class="label required">
                                    {{ t('pattern.session_time') }}
                                </p>
                            </el-col>
                        </el-row>
                        <el-row
                            class="full-width sesion-row"
                            v-for="(item, i) in ruleForm.pattern_details"
                            :key="`plan-create-${i}`"
                        >
                            <el-col :span="11">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item
                                            :prop="`pattern_details.${i}.start_time`"
                                            :rules="rules.start_time"
                                        >
                                            <el-time-select
                                                v-model="item.start_time"
                                                start="00:00"
                                                step="00:15"
                                                end="23:30"
                                                :placeholder="
                                                    t('pattern.start_time')
                                                "
                                                format="HH:mm"
                                                class="pattern-input base-input"
                                                size="large"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="text-center" :span="4">
                                        <div class="text-gray-500 text-center">
                                            ~
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item
                                            :prop="`pattern_details.${i}.end_time`"
                                            :rules="rules.end_time"
                                        >
                                            <el-time-select
                                                v-model="item.end_time"
                                                start="00:00"
                                                step="00:15"
                                                end="23:30"
                                                :placeholder="
                                                    t('pattern.end_time')
                                                "
                                                format="HH:mm"
                                                class="pattern-input base-input"
                                                size="large"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="13" style="padding-left: 60px">
                                <el-form-item
                                    :prop="`pattern_details.${i}.period_id`"
                                    :rules="rules.period_id"
                                >
                                    <el-select
                                        v-model="item.period_id"
                                        placeholder="Session"
                                        class="pattern-input pattern-select base-input"
                                        size="large"
                                    >
                                        <el-option
                                            v-for="item in periods"
                                            :key="item.id"
                                            :label="`${item.value}分`"
                                            :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-row class="full-width" v-show="item.error_msg">
                                <el-col :span="24">
                                    <div class="error-msg">
                                        {{ item.error_msg }}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-form-item>
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
                </el-form>
            </div>
        </template>
    </modal-box>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { usePatternStore } from '@/stores'
import type {
    Period,
    Session,
    Pattern,
    SessionEl,
} from '@/libs/interface/patternInterface'
import { useI18n } from 'vue3-i18n'
import dayjs from 'dayjs'

const ruleFormRef = ref<FormInstance>()
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
    patternId = 0
    isShowModal.value = false
}
let patternId: number = 0
const showCreateModal = (item: Pattern) => {
    ruleForm.name = ''
    ruleForm.pattern_details = [
        {
            start_time: null,
            end_time: null,
            period_id: null,
            error_msg: null,
        },
    ] as Array<Session>
    if (item) {
        patternName.value = item.name
        const tempArr: Array<Session> = []
        item.details.forEach((el: SessionEl) => {
            tempArr.push({
                start_time: el.start_time,
                end_time: el.end_time,
                period_id: el.period.id,
            })
        })
        ruleForm.name = item.name
        if (tempArr.length) {
            ruleForm.pattern_details = tempArr
        }
        patternId = item.id
    }
    isShowModal.value = true
}

const patternName = ref('')

const addSessionBlock = () => {
    ruleForm.pattern_details.push({
        start_time: null,
        end_time: null,
        period_id: null,
        error_msg: null,
    })
}

const submitData = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            if (!checkVailidTime()) return
            ruleForm.name = ruleForm.name.trim()
            if (patternId) {
                await patternStore.updatePattern(ruleForm, patternId, () => {
                    emit('onCreate')
                    oncloseModal()
                })
            } else {
                await patternStore.createPattern(ruleForm, () => {
                    emit('onCreate')
                    oncloseModal()
                })
            }
        } else {
            return false
        }
    })
}

const checkVailidTime = () => {
    let isVailid = true
    ruleForm.pattern_details.forEach((el, index) => {
        const startTime = dayjs(el.start_time, 'HH:mm')
        const endTime = dayjs(el.end_time, 'HH:mm')
        let period_value: number = 0;
        periods.value.forEach(period => {
            if(el.period_id == period.id) {
                period_value = Number(period.value) 
            }
        })
        const currentEndTime = startTime.add(period_value, 'minute')
        if (startTime >= endTime || endTime.diff(currentEndTime, 'minute') != 0) {
            el.error_msg = t('message.invalid')
            isVailid = false
        }
    })
    return isVailid
}

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: t('validation.required', {'0': t('pattern.pattern_name')}),
            trigger: 'blur',
        },
        {
            min: 3,
            max: 255,
            message: t('validation.between.string', {'0': t('pattern.pattern_name'), '1': '3', '2': '255'}),
            trigger: 'blur',
        },
    ],
    start_time: [
        {
            required: true,
            message: t('validation.required', {'0': t('pattern.start_time')}),
            trigger: 'change',
        },
    ],
    end_time: [
        {
            required: true,
            message: t('validation.required', {'0': t('pattern.end_time')}),
            trigger: 'change',
        },
    ],
    period_id: [
        {
            required: true,
            message: t('validation.required', {'0': t('pattern.session_time')}),
            trigger: 'change',
        },
    ],
})
const ruleForm = reactive({
    name: '',
    pattern_details: [
        {
            start_time: null,
            end_time: null,
            period_id: null,
        },
    ] as Array<Session>,
})

defineExpose({
    showCreateModal,
})

const emit = defineEmits(['onCreate'])

onMounted(async () => {
    getPeriodData()
})
</script>
<style scoped lang="scss">
.small-input {
    width: 170px;
}

.label {
    color: #212529;
}

.pattern-input {
    width: 170px;
    &.ml-auto {
        margin-left: auto;
    }
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
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.error-msg {
    color: #f56c6c;
    font-size: 12px;
}
</style>
