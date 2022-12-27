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
                <p class="label">{{ t('coach.detail.label.name') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="12">
                        <el-form-item prop="first_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="last_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('coach.detail.label.name_furigana') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="12">
                        <el-form-item prop="first_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name_furigana"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="last_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name_furigana"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('coach.detail.label.birthday') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="8">
                        <el-form-item prop="day">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.day"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="month">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.month"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="year">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.year"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('coach.detail.label.tel') }}</p>
                <el-col :span="15">
                    <el-form-item prop="tel">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.tel"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <div>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="12">
                        <p class="label">{{ t('coach.detail.label.invitation_code') }}</p>
                        <el-form-item prop="invitation_code">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.invitation_code"
                                disabled
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <p class="label">{{ t('coach.detail.label.people_invited') }}</p>
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
                <el-switch v-model="ruleForm.is_active" /> <span style="padding-left: 8px;">{{ ruleForm.is_active ? t('coach.detail.value.is_active.active') : t('coach.detail.value.is_active.inactive') }}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">{{
                    t('btn_search')
                }}</el-button>
            </el-form-item>
        </el-col>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue3-i18n'
import { useCoachStore } from '@/stores'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import type { CoachRuleForm } from '@/libs/interface/coachInterface'
import { LoadingVue } from '@/components/common/loading'

const { t } = useI18n()
const route = useRoute()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
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
    invitation_code: '',
    people_invited: '',
    is_active: false,
} as CoachRuleForm)

const rules = reactive<FormRules>({
    first_name: [
        {
            required: true,
            message: t('error.required', ['first_name']),
            trigger: 'blur',
        },
        { max: 255, message: t('error.max', [t('first_name'), 255]), trigger: 'blur' },
    ],
    last_name: [
        {
            required: true,
            message: t('error.required', ['last_name']),
            trigger: 'blur',
        },
        { max: 255, message: t('error.max', [t('last_name'), 255]), trigger: 'blur' },
    ],
    first_name_furigana: [
        {
            required: true,
            message: t('error.required', ['first_name_furigana']),
            trigger: 'blur',
        },
        { max: 255, message: t('error.max', [t('first_name_furigana'), 255]), trigger: 'blur' },
    ],
    last_name_furigana: [
        {
            required: true,
            message: t('error.required', ['last_name_furigana']),
            trigger: 'blur',
        },
        { max: 255, message: t('error.max', [t('last_name_furigana'), 255]), trigger: 'blur' },
    ],
    tel: [{ max: 20, message: t('error.max', [t('tel'), 20]), trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    const loading = LoadingVue()
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const id = route.params.id
            ruleForm.birthday = (<any>Object).values(ruleForm.birthdays).join("/")
            const coachStore = useCoachStore()
            await coachStore.updateCoach(ruleForm, id)
            await getData()
            loading.close()
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
    ruleForm.first_name = coachStore.coach.first_name
    ruleForm.last_name = coachStore.coach.last_name
    ruleForm.first_name_furigana = coachStore.coach.first_name_furigana
    ruleForm.last_name_furigana = coachStore.coach.last_name_furigana
    ruleForm.tel = coachStore.coach.tel
    ruleForm.birthday = coachStore.coach.birthday
    ruleForm.birthdays.day = dayjs(new Date(coachStore.coach.birthday)).format(
        'DD'
    )
    ruleForm.birthdays.month = dayjs(new Date(coachStore.coach.birthday)).format(
        'MM'
    )
    ruleForm.birthdays.year = dayjs(new Date(coachStore.coach.birthday)).format(
        'YYYY'
    )
    ruleForm.is_active = !!coachStore.coach.is_active
}

onMounted(async () => {
    await nextTick()
    await getData()
})
</script>
