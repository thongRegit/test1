<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
        <el-col :span="12">
            <div>
                <el-form-item prop="type">
                    <p class="label">{{ t('coach.ruleForm.type') }}</p>
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio
                            :label="item"
                            :key="item"
                            v-for="item in Object.keys(COACH_TYPE_NOT_ALL)"
                            >{{ COACH_TYPE_NOT_ALL[item] }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
            </div>
            <div>
                <p class="label required">{{ t('coach.create.label.name') }}</p>
                <el-row class="full-width" :gutter="16">
                    <el-col :span="12">
                        <el-form-item prop="first_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name"
                                @blur="trim('first_name')"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="last_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name"
                                @blur="trim('last_name')"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('coach.create.label.name_furigana') }}</p>
                <el-row class="full-width" :gutter="16">
                    <el-col :span="12">
                        <el-form-item prop="first_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name_furigana"
                                @blur="trim('first_name_furigana')"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="last_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name_furigana"
                                @blur="trim('last_name_furigana')"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label required">
                    {{ t('coach.create.label.birthday') }}
                </p>
                <el-form-item prop="date">
                    <DateFormVue
                        @change-date="changeDate"
                        :date="ruleForm.birthdays"
                        :yearPlaceHolder="t('input_placeholder.year')"
                        :listYear="listYear"
                    />
                </el-form-item>
            </div>
            <div>
                <p class="label required">
                    {{ t('coach.create.label.mail_address') }}
                </p>
                <el-col :span="15">
                    <el-form-item prop="mail_address">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.mail_address"
                            @blur="trim('mail_address')"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <div>
                <p class="label">{{ t('coach.create.label.tel') }}</p>
                <el-col :span="15">
                    <el-form-item prop="tel">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.tel"
                            @blur="trim('tel')"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <el-form-item prop="is_active">
                <p class="label">{{ t('coach.create.label.is_active') }}</p>
                <el-switch v-model="ruleForm.is_active" />
                <span style="padding-left: 8px">{{
                    ruleForm.is_active
                        ? t('coach.detail.value.is_active.active')
                        : t('coach.detail.value.is_active.inactive')
                }}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">{{
                    t('btn_register')
                }}</el-button>
            </el-form-item>
        </el-col>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'
import { useAlertStore, useCoachStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import type { CoachRuleForm } from '@/libs/interface/coachInterface'
import { LoadingVue } from '@/components/common/loading'
import DateFormVue from '@/components/common/DateForm.vue'
import {
    COACH_TYPE_VALUE,
    COACH_TYPE_NOT_ALL,
    YEARS,
} from '@/libs/constants/constants'
import { checkDayFuture } from '@/libs/utils/common'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['onTitleDetail'])

const listYear = ref(YEARS)

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    type: `${COACH_TYPE_VALUE.energist}`,
    first_name: '',
    last_name: '',
    first_name_furigana: '',
    last_name_furigana: '',
    birthday: '',
    birthdays: {
        year: '',
        month: '',
        day: '',
    },
    mail_address: '',
    tel: '',
    nickname: '',
    invitation_code: '',
    people_invited: '',
    is_active: true,
} as CoachRuleForm)

const validateDate = (rule: any, value: any, callback: any) => {
    if (
        [
            ruleForm.birthdays.year,
            ruleForm.birthdays.month,
            ruleForm.birthdays.day,
        ].includes('')
    ) {
        callback(
            new Error(
                t('validation.required', [t('coach.create.label.birthday')])
            )
        )
    } else {
        const days = checkDayFuture(
            [
                ruleForm.birthdays.year,
                ruleForm.birthdays.month,
                ruleForm.birthdays.day,
            ].join('-')
        )
        if (days <= 0) {
            callback(
                new Error(
                    t('validation.date_future', [
                        t('coach.create.label.birthday'),
                    ])
                )
            )
        } else {
            callback()
        }
    }
}

const checkRegexTel = (rule: any, value: any, callback: any) => {
    const regex = new RegExp(/^([0-9\s-]*)$/)
    if (!regex.test(value) && value !== null) {
        callback(new Error(t('validation.tel_format')))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    first_name: [
        {
            required: true,
            message: t('validation.required', [
                t('coach.create.label.first_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.create.label.first_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name: [
        {
            required: true,
            message: t('validation.required', [
                t('coach.create.label.last_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.create.label.last_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    first_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.create.label.first_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.create.label.last_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    mail_address: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.create.label.mail_address'),
                255,
            ]),
            trigger: 'blur',
        },
        {
            required: true,
            message: t('validation.required', [
                t('coach.create.label.mail_address'),
            ]),
            trigger: 'blur',
        },
    ],
    tel: [
        {
            max: 20,
            message: t('validation.max.string', [
                t('coach.create.label.tel'),
                20,
            ]),
            trigger: 'blur',
        },
        { validator: checkRegexTel, trigger: 'blur' },
    ],
    date: [{ validator: validateDate, trigger: 'blur' }],
})

const trim = (
    field:
        | 'tel'
        | 'mail_address'
        | 'first_name'
        | 'last_name'
        | 'first_name_furigana'
        | 'last_name_furigana'
) => {
    if (ruleForm[field]) {
        ruleForm[field] = ruleForm[field].trim()
    }
}

const changeDate = (e: any) => {
    ruleForm.birthdays = e
}

const submitForm = (formEl: FormInstance | undefined) => {
    const loading = LoadingVue()
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const id = route.params.id
            ruleForm.birthday = [
                ruleForm.birthdays.year,
                ruleForm.birthdays.month,
                ruleForm.birthdays.day,
            ].join('-')
            const coachStore = useCoachStore()
            const alertStore = useAlertStore()
            await coachStore.createCoach(ruleForm)
            await alertStore.createAlert({
                title: t('message.update_success'),
                type: 'success',
            })
            loading.close()
            router.push({
                name: 'coaches',
                replace: true,
            })
        } else {
            loading.close()
            return false
        }
    })
}
</script>
