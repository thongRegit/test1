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
                <p class="label required">{{ t('user.detail.label.name') }}</p>
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
                <p class="label">{{ t('user.detail.label.name_furigana') }}</p>
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
                    {{ t('user.detail.label.birthday') }}
                </p>
                <el-form-item prop="date">
                    <DateForm
                        @change-date="(e) => (ruleForm.birthdays = e)"
                        :date="ruleForm.birthdays"
                        :yearPlaceHolder="t('input_placeholder.year')"
                        :listYear="listYear"
                    />
                </el-form-item>
            </div>
            <div>
                <p class="label">{{ t('user.detail.label.tel') }}</p>
                <el-col :span="18">
                    <el-form-item prop="tel">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.tel"
                            @blur="trim('tel')"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <el-form-item prop="line_name">
                <p class="label required">
                    {{ t('user.detail.label.line_name') }}
                </p>
                <el-col :span="18">
                    <el-input
                        class="base-input"
                        v-model="ruleForm.line_name"
                        disabled
                    />
                </el-col>
            </el-form-item>
            <el-form-item prop="gender">
                <p class="label">{{ t('user.detail.label.gender') }}</p>
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio label="1">{{ t('gender.male') }}</el-radio>
                    <el-radio label="2">{{ t('gender.female') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="type">
                <p class="label">{{ t('user.type') }}</p>
                <el-radio-group v-model="ruleForm.type" disabled>
                    <el-radio
                        :label="item"
                        :key="item"
                        v-for="item in Object.keys(TYPE_NOT_ALL_USERS)"
                        >{{ TYPE_NOT_ALL_USERS[item] }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="is_active">
                <p class="label">{{ t('coach.detail.label.is_active') }}</p>
                <el-switch v-model="ruleForm.is_active" />
                <span class="pl-8">{{
                    ruleForm.is_active
                        ? t('user.detail.value.is_active.active')
                        : t('user.detail.value.is_active.inactive')
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
import { useAlertStore, useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import type { UserDetail } from '@/libs/interface/userInterface'
import { LoadingVue } from '@/components/common/loading'
import dayjs from 'dayjs'
import { TYPE_NOT_ALL_USERS, YEARS } from '@/libs/constants/constants'
import DateForm from '@/components/common/DateForm.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const listYear = ref(YEARS)

const emit = defineEmits(['onTitleDetail'])

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
    line_name: '',
    gender: '1',
    is_active: false,
    type: '',
} as UserDetail)

const validateDate = (rule: any, value: any, callback: any) => {
    if (
        ruleForm.birthdays.day === '' ||
        ruleForm.birthdays.month === '' ||
        ruleForm.birthdays.year === ''
    ) {
        callback(
            new Error(
                t('validation.required', [t('user.detail.label.birthday')])
            )
        )
    } else {
        if (
            dayjs().diff(
                [
                    ruleForm.birthdays.year,
                    ruleForm.birthdays.month,
                    ruleForm.birthdays.day,
                ].join('-')
            ) < 0
        ) {
            callback(
                new Error(
                    t('validation.date_future', [
                        t('user.detail.label.birthday'),
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
                t('user.detail.label.first_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('user.detail.label.first_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name: [
        {
            required: true,
            message: t('validation.required', [
                t('user.detail.label.last_name'),
            ]),
            trigger: 'blur',
        },
        {
            max: 255,
            message: t('validation.max.string', [
                t('user.detail.label.last_name'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    first_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('user.detail.label.first_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    last_name_furigana: [
        {
            max: 255,
            message: t('validation.max.string', [
                t('user.detail.label.last_name_furigana'),
                255,
            ]),
            trigger: 'blur',
        },
    ],
    tel: [
        {
            max: 20,
            message: t('validation.max.string', [
                t('user.detail.label.tel'),
                20,
            ]),
            trigger: 'blur',
        },
        { validator: checkRegexTel, trigger: 'blur' },
    ],
    date: [{ validator: validateDate, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    const loading = LoadingVue()
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const id = route.params.id
            if (
                ![
                    ruleForm.birthdays.year,
                    ruleForm.birthdays.month,
                    ruleForm.birthdays.day,
                ].includes('')
            ) {
                ruleForm.birthday = [
                    ruleForm.birthdays.year,
                    ruleForm.birthdays.month,
                    ruleForm.birthdays.day,
                ].join('-')
            }
            const userStore = useUserStore()
            const alertStore = useAlertStore()
            await userStore.updateUser(ruleForm, id)
            await alertStore.createAlert({
                title: t('message.update_success'),
                type: 'success',
            })
            loading.close()
            router.push({
                name: 'users',
                replace: true,
            })
        } else {
            loading.close()
            return false
        }
    })
}

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

const getData = async () => {
    const id = route.params.id
    const useStore = useUserStore()
    await useStore.detailUser(id)
    ruleForm.first_name = useStore.user.first_name
    ruleForm.last_name = useStore.user.last_name
    ruleForm.first_name_furigana = useStore.user.first_name_furigana
    ruleForm.last_name_furigana = useStore.user.last_name_furigana
    ruleForm.tel = useStore.user.tel
    ruleForm.line_name = useStore.user.line_name
    ruleForm.birthday = useStore.user.birthday ? useStore.user.birthday : null
    ruleForm.birthdays.day = useStore.user.birthday
        ? dayjs(new Date(useStore.user.birthday)).format('DD')
        : ''
    ruleForm.birthdays.month = useStore.user.birthday
        ? dayjs(new Date(useStore.user.birthday)).format('MM')
        : ''
    ruleForm.birthdays.year = useStore.user.birthday
        ? dayjs(new Date(useStore.user.birthday)).format('YYYY')
        : ''
    ruleForm.gender = `${useStore.user.gender}`
    ruleForm.type = String(useStore.user.type)
    ruleForm.is_active = !!useStore.user.is_active
    emit(
        'onTitleDetail',
        `${useStore.user.first_name}${useStore.user.last_name} (${useStore.user.age}歳)`
    )
}

onMounted(async () => {
    await nextTick()
    await getData()
})
</script>
