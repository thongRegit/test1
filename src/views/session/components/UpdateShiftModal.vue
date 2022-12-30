<template>
    <el-dialog
        v-model="dialogVisible"
        title="シフト設定"
        :before-close="close"
        custom-class="dialog-custom"
    >
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="update-form"
        >
            <el-row class="full-width">
                <el-col :span="24">
                    <p class="label">{{ t('session.date') }}</p>
                    <el-form-item prop="day">
                        <el-date-picker
                            v-model="ruleForm.day"
                            type="date"
                            :size="'default'"
                            :clearable="false"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="full-width time-title">
                <el-col :span="14">
                    <p class="label">
                        {{ t('session.business_hours') }}
                    </p>
                </el-col>
                <el-col :span="10" style="padding-left: 60px">
                    <p class="label">
                        {{ t('session.energist') }}
                    </p>
                </el-col>
            </el-row>
            <el-row
                class="full-width sesion-row align-items-center"
                v-for="(item, i) in ruleForm.shifts"
                :key="i"
            >
                <el-col :span="8">
                    <el-form-item
                        :prop="`shifts.${i}.start_time`"
                        :rules="rules.start_time"
                    >
                        <el-time-picker
                            v-model="item.start_time"
                            placeholder="開始時間"
                            format="HH:mm"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        :prop="`shifts.${i}.end_time`"
                        :rules="rules.end_time"
                    >
                        <el-time-picker
                            v-model="item.end_time"
                            placeholder="終了時間"
                            format="HH:mm"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="padding-left: 60px">
                    <el-form-item
                        :prop="`shifts.${i}.coach_id`"
                        :rules="rules.coach_id"
                    >
                        <el-select
                            v-model="item.coach_id"
                            placeholder=""
                            class=""
                            :fit-input-width="true"
                            :filterable="true"
                        >
                            <el-option
                                v-for="item in coaches"
                                :key="item.id"
                                :label="item.full_name"
                                :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-icon class="cursor-pointer" @click="removeShift(i)"
                        ><Close
                    /></el-icon>
                </el-col>
            </el-row>
            <el-row class="full-width">
                <el-col :span="24">
                    <span class="add-session-btn" @click="addShiftBlock">
                        {{ t('session.add_business_hours') }}
                    </span>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">{{ t('btn_cancel') }}</el-button>
                <el-button type="primary" @click="updateShift(ruleFormRef)">
                    {{ t('btn_update') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs, reactive, onMounted } from 'vue'
import { useSessionStore } from '@/stores'
import dayjs from 'dayjs'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'
import type { Coach } from '@/libs/interface/sessionInterface'

const { t } = useI18n()

const props = defineProps([
    'dialogVisible',
    'shopId',
    'stationNumber',
    'defaultDate',
] as any)
const { dialogVisible, shopId, stationNumber, defaultDate } = toRefs(props)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    day: dayjs(defaultDate.value).format('YYYY-MM-DD'),
    shifts: [
        {
            id: 1,
            start_time: '',
            end_time: '',
            coach_id: null,
        },
    ],
})

const rules = reactive<FormRules>({
    day: [
        {
            required: true,
            message: t('validation.required', [t('session.date')]),
            trigger: 'blur',
        },
    ],
    start_time: [
        {
            required: true,
            message: t('validation.required', [t('session.start_time')]),
            trigger: 'blur',
        },
    ],
    end_time: [
        {
            required: true,
            message: t('validation.required', [t('session.end_time')]),
            trigger: 'blur',
        },
    ],
    coach_id: [
        {
            required: true,
            message: t('validation.required', [t('session.energist')]),
            trigger: 'blur',
        },
    ],
})

const sessionStore = useSessionStore()

const coaches = ref([] as Array<any>)

const emit = defineEmits(['close', 'updated'])

const close = () => {
    ruleFormRef.value?.clearValidate()
    ruleForm.shifts = [
        {
            id: 1,
            start_time: '',
            end_time: '',
            coach_id: null,
        },
    ]
    emit('close')
}

const updateShift = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            let query = {
                shop_id: shopId.value,
                station_number: stationNumber.value,
                date: dayjs(ruleForm.day).format('YYYY-MM-DD'),
                shifts: ruleForm.shifts.map((item) => {
                    return {
                        coach_id: item.coach_id,
                        start_time: dayjs(item.start_time).format('HH:mm'),
                        end_time: dayjs(item.end_time).format('HH:mm'),
                    }
                }),
            }

            await sessionStore.updateShift(query, () => {
                ruleForm.shifts = [
                    {
                        id: 1,
                        start_time: '',
                        end_time: '',
                        coach_id: null,
                    },
                ]
                emit('updated')
            })
        }
    })
}

const removeShift = (index: number) => {
    ruleForm.shifts.splice(index, 1)
}

const addShiftBlock = () => {
    ruleForm.shifts.push({
        id: Math.random(),
        start_time: '',
        end_time: '',
        coach_id: null,
    })
}

const getCoachesData = async () => {
    const query = {
        all: 1,
    }
    await sessionStore.getCoaches(query)
    coaches.value = sessionStore.coaches.map((e: any) => {
        return {
            id: e.id,
            full_name: e.first_name + e.last_name,
        }
    })
}

onMounted(async () => {
    await getCoachesData()
})
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.sesion-row {
    margin-bottom: 20px;
}

.add-session-btn {
    cursor: pointer;
    color: #007bff;
    font-size: 16px;
    line-height: 1.5;
}

.time-title {
    margin-top: 15px;
}

.update-form {
    margin-left: 20px;
}
</style>
