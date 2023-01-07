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
                <p class="label required">{{ t('coach.detail.label.name') }}</p>
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
                <p class="label">{{ t('coach.detail.label.name_furigana') }}</p>
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
                    {{ t('coach.detail.label.birthday') }}
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
                <p class="label">{{ t('coach.detail.label.tel') }}</p>
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
            <div>
                <el-row class="full-width" :gutter="16">
                    <el-col :span="12">
                        <p class="label">
                            {{ t('coach.detail.label.invitation_code') }}
                        </p>
                        <el-form-item prop="invitation_code">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.invitation_code"
                                disabled
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <p class="label">
                            {{ t('coach.detail.label.people_invited') }}
                        </p>
                        <el-form-item prop="people_invited">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.people_invited"
                                disabled
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item prop="is_active">
                <p class="label">{{ t('coach.detail.label.is_active') }}</p>
                <el-switch v-model="ruleForm.is_active" />
                <span style="padding-left: 8px">{{
                    ruleForm.is_active
                        ? t('coach.detail.value.is_active.active')
                        : t('coach.detail.value.is_active.inactive')
                }}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">{{
                    t('btn_update')
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
import { COACH_TYPE_NOT_ALL, YEARS } from '@/libs/constants/constants'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['onTitleDetail'])

const listYear = ref(YEARS)

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    type: '',
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
    tel: '',
    nickname: '',
    invitation_code: '',
    people_invited: '',
    is_active: false,
} as CoachRuleForm)

const validateDate = (rule: any, value: any, callback: any) => {
    if ((<any>Object).values(ruleForm.birthdays).includes('')) {
        callback(
            new Error(
                t('validation.required', [t('coach.detail.label.birthday')])
            )
        )
    } else {
        const now = dayjs(new Date())
        if (
            now.diff(
                new Date((<any>Object).values(ruleForm.birthdays).join('-'))
            ) < 0
        ) {
            callback(
                new Error(
                    t('validation.date_future', [
                        t('coach.detail.label.birthday'),
                    ])
                )
            )
        } else {
            callback()
        }
    }
}

const checkRegexTel = (rule: any, value: any, callback: any) => {
    const regex = new RegExp(/^([0-9\s\-]*)$/)
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
                t('coach.detail.label.first_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.detail.label.first_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name: [
        {
            required: true,
            message: t('validation.required', [
                t('coach.detail.label.last_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.detail.label.last_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    first_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.detail.label.first_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('coach.detail.label.last_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    tel: [
        {
            max: 20,
            message: t('validation.max.string', [
                t('coach.detail.label.tel'),
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
            ruleForm.birthday = (<any>Object)
                .values(ruleForm.birthdays)
                .join('-')
            const coachStore = useCoachStore()
            const alertStore = useAlertStore()
            await coachStore.updateCoach(ruleForm, id)
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

const getData = async () => {
    const id = route.params.id
    const coachStore = useCoachStore()
    await coachStore.detailCoach(id)
    let query: any = {
        'orders[0][key]': 'id',
        'orders[0][dir]': 'descending',
        page: 1,
        per_page: 20,
    }
    await coachStore.listCoachInvited(query, id)
    ruleForm.first_name = coachStore.coach.first_name
    ruleForm.last_name = coachStore.coach.last_name
    ruleForm.first_name_furigana = coachStore.coach.first_name_furigana
    ruleForm.last_name_furigana = coachStore.coach.last_name_furigana
    ruleForm.nickname = coachStore.coach.nickname
    ruleForm.invitation_code = coachStore.coach.invitation_code
    ruleForm.people_invited = coachStore.invited_coaches.count
    ruleForm.tel = coachStore.coach.tel
    ruleForm.type = String(coachStore.coach.type)
    ruleForm.birthday = coachStore.coach.birthday
        ? coachStore.coach.birthday
        : null
    ruleForm.birthdays.day = coachStore.coach.birthday
        ? dayjs(new Date(coachStore.coach.birthday)).format('DD')
        : ''
    ruleForm.birthdays.month = coachStore.coach.birthday
        ? dayjs(new Date(coachStore.coach.birthday)).format('MM')
        : ''
    ruleForm.birthdays.year = coachStore.coach.birthday
        ? dayjs(new Date(coachStore.coach.birthday)).format('YYYY')
        : ''
    ruleForm.is_active = !!coachStore.coach.is_active
    emit(
        'onTitleDetail',
        `${coachStore.coach.first_name}${coachStore.coach.last_name} ${
            coachStore.coach?.age ? '(' + coachStore.coach?.age + '歳)' : ''
        }`
    )
}

onMounted(async () => {
    await nextTick()
    await getData()
})
</script>
