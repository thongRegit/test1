<template>
    <modal-box
        :title="isUpdate ? t('pattern.pattern_edit') : t('pattern.pattern_registration')"
        :open="isShowModal"
        :isUpdate="isUpdate"
        @close="oncloseModal"
        @submit="submitData(ruleFormRef)"
    >
        <template v-slot:body>
            <div class="pattern-form">
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                    status-icon
                >
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col :span="24">
                                <p class="label required">
                                    {{ t('pattern.pattern_name') }}
                                </p>
                                <el-form-item prop="name">
                                    <el-input
                                        v-model="ruleForm.name"
                                        class="pattern-input"
                                        size="large"
                                        @change="onChangeName"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row class="full-width">
                            <el-col :span="12">
                                <p class="label required">
                                    {{ t('pattern.business_hours') }}
                                </p>
                            </el-col>
                            <el-col :span="12" style="padding-left: 80px">
                                <p class="label required">
                                    {{ t('pattern.session_time') }}
                                </p>
                            </el-col>
                        </el-row>
                        <el-row
                            class="full-width session-row"
                            v-for="(item, i) in ruleForm.pattern_details"
                            :key="`pattern-create-${i}`"
                        >
                            <el-col :span="12">
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
                                                end="23:45"
                                                :placeholder="
                                                    t('pattern.start_time')
                                                "
                                                format="HH:mm"
                                                class="pattern-input"
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
                                                end="23:45"
                                                :placeholder="
                                                    t('pattern.end_time')
                                                "
                                                format="HH:mm"
                                                class="pattern-input"
                                                size="large"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12" style="padding-left: 80px">
                                <el-row :gutter="20">
                                    <el-col :span="22">
                                        <el-form-item
                                            :prop="`pattern_details.${i}.period_id`"
                                            :rules="rules.period_id"
                                        >
                                            <el-select
                                                v-model="item.period_id"
                                                placeholder="Session"
                                                class="pattern-input pattern-select"
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
                                    <el-col :span="2">
                                        <el-icon class="icon-fix">
                                            <Close
                                                class="cursor-pointer"
                                                @click="removeSessionBlock(i)"
                                            />
                                        </el-icon>
                                    </el-col>
                                </el-row>
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
import _ from 'lodash'

const ruleFormRef = ref<FormInstance>()
const { t } = useI18n()
const patternStore = usePatternStore()
const isShowModal = ref(false)
const periods = ref([] as Array<Period>)
const isUpdate = ref(false)

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
        isUpdate.value = true
        patternName.value = item.name
        const tempArr: Array<Session> = []
        item.details?.forEach((el: SessionEl) => {
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
    } else {
        isUpdate.value = false
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

const removeSessionBlock = (index: number) => {
    _.remove(ruleForm.pattern_details, (el, i) => index == i && el)
}

const submitData = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
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

const validTime = (start: string, end: string, period_id: number) => {
    const startTime = dayjs(start, 'HH:mm')
    const endTime = dayjs(end, 'HH:mm')
    let period_value: number = 0
    let isValid = true
    periods.value.forEach((period) => {
        if (period_id == period.id) {
            period_value = Number(period.value)
        }
    })
    const currentEndTime = startTime.add(period_value, 'minute')
    if (
        startTime >= endTime ||
        (period_value && endTime.diff(currentEndTime, 'minute') < 0)
    ) {
        isValid = false
    }
    return isValid
}

const checkTime = (rule: any, value: any, callback: any) => {
    const field = rule.field.split('.')
    const index = parseInt(field[1])
    const fieldName: string = field[2]
    const startTime = ruleForm.pattern_details[index].start_time
    const endTime = ruleForm.pattern_details[index].end_time
    const periodId = ruleForm.pattern_details[index].period_id || 0
    ruleForm.pattern_details[index].error_msg = ''
    const errorMsg = {
        start_time: t('pattern.start_time'),
        end_time: t('pattern.end_time'),
        period_id: t('pattern.session_time'),
    }
    if (
        (!startTime && fieldName == 'start_time') ||
        (!endTime && fieldName == 'end_time') ||
        (!periodId && fieldName == 'period_id')
    ) {
        callback(
            new Error(t('validation.required', { '0': errorMsg[fieldName] }))
        )
    } else {
        const prevEndTime =
            index > 0 ? ruleForm.pattern_details[index - 1]?.end_time : null
        if (fieldName == 'start_time') {
            if (prevEndTime) {
                if (dayjs(startTime, 'HH:mm') <= dayjs(prevEndTime, 'HH:mm')) {
                    callback(new Error('開始時刻が無効です'))
                    return
                }
            }
            if (startTime && endTime) {
                const check = validTime(startTime, endTime, periodId)
                if (!check) {
                    ruleForm.pattern_details[index].error_msg =
                        t('message.invalid')
                }
            }
            callback()
        } else {
            if (
                startTime &&
                prevEndTime &&
                dayjs(startTime, 'HH:mm') <= dayjs(prevEndTime, 'HH:mm')
            ) {
                callback()
            } else {
                if (startTime && endTime) {
                    const check = validTime(startTime, endTime, periodId)
                    if (!check) {
                        ruleForm.pattern_details[index].error_msg =
                            t('message.invalid')
                    }
                }
                callback()
            }
        }
    }
}

const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: t('validation.required', {
                '0': t('pattern.pattern_name'),
            }),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('pattern.pattern_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    start_time: [
        {
            validator: checkTime,
            trigger: 'change',
        },
    ],
    end_time: [
        {
            validator: checkTime,
            trigger: 'change',
        },
    ],
    period_id: [
        {
            validator: checkTime,
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

const onChangeName = () => {
    ruleForm.name = ruleForm.name.trim()
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
.pattern-form {
    width: 86%;
    margin: 0 auto;
}

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

.session-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.error-msg {
    color: #f56c6c;
    font-size: 12px;
}
.icon-fix {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>
