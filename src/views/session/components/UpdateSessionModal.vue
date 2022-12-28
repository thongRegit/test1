<template>
    <el-dialog
        v-model="dialogVisible"
        title="セッション設定"
        width="80%"
        :before-close="close"
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
                    <p class="label">日付</p>
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
                        {{ t('session.session_time') }}
                    </p>
                </el-col>
            </el-row>
            <el-row
                class="full-width sesion-row"
                v-for="(item, i) in ruleForm.sessionData"
                :key="i"
            >
                <el-col :span="6">
                    <el-form-item
                        :prop="`sessionData.${i}.start_time`"
                        :rules="rules.start_time"
                    >
                        <el-time-picker
                            v-model="item.start_time"
                            placeholder="開始時間"
                            format="HH:mm"
                        />
                    </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                    <div class="text-gray-500 text-center">~</div>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        :prop="`sessionData.${i}.end_time`"
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
                        :prop="`sessionData.${i}.period_id`"
                        :rules="rules.period_id"
                    >
                        <el-select
                            v-model="item.period_id"
                            placeholder=""
                            class=""
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
            </el-row>
            <el-row class="full-width">
                <el-col :span="24">
                    <span class="add-session-btn" @click="addSessionBlock">
                        {{ t('session.add_business_hours') }}
                    </span>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">{{ t('btn_cancel') }}</el-button>
                <el-button type="primary" @click="updateSession(ruleFormRef)">
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
import type { Session, Period } from '@/libs/interface/sessionInterface'

const { t } = useI18n()

const props = defineProps(['dialogVisible', 'shopId', 'stationNumber', 'defaultDate'])
const { dialogVisible, shopId, stationNumber, defaultDate } = toRefs(props)

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    day: dayjs(defaultDate.value).format('YYYY-MM-DD'),
    sessionData: [
        {
            id: 1,
            start_time: '',
            end_time: '',
            period_id: null,
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
    period_id: [
        {
            required: true,
            message: t('validation.required', [t('session.session_time')]),
            trigger: 'blur',
        },
    ],
})

const sessionStore = useSessionStore()

const periods = ref([] as Array<Period>)

const emit = defineEmits(['close', 'updated'])
const close = () => {
    ruleForm.sessionData = [
        {
            id: 1,
            start_time: '',
            end_time: '',
            period_id: null,
        },
    ]
    emit('close')
}

const updateSession = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let query = {
                shop_id: shopId.value,
                station_number: stationNumber.value,
                date: dayjs(ruleForm.day).format('YYYY-MM-DD'),
                sessions: ruleForm.sessionData.map((item) => {
                    return {
                        period_id: item.period_id,
                        start_time: dayjs(item.start_time).format('HH:mm'),
                        end_time: dayjs(item.end_time).format('HH:mm'),
                    }
                }),
            }
            sessionStore.createSession(query, () => {
                ruleForm.sessionData = [
                    {
                        id: 1,
                        start_time: '',
                        end_time: '',
                        period_id: null,
                    },
                ]
                emit('updated')
            })
        }
    })
}

const addSessionBlock = () => {
    ruleForm.sessionData.push({
        id: Math.random(),
        start_time: '',
        end_time: '',
        period_id: null,
    })
}

const getPeriodData = async () => {
    await sessionStore.getPeriod()
    periods.value = sessionStore.periods?.map((e: Period) => {
        return {
            id: e.id,
            value: e.value,
        }
    })
}

onMounted(async () => {
    await getPeriodData()
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
