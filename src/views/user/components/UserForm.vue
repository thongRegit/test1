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
                <p class="label">{{ t('user.detail.label.name') }}</p>
                <el-row class="full-width" :gutter="16">
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
                <p class="label">{{ t('user.detail.label.name_furigana') }}</p>
                <el-row class="full-width" :gutter="16">
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
                <p class="label">{{ t('user.detail.label.birthday') }}</p>
                <el-row class="full-width" :gutter="16">
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
                <p class="label">{{ t('user.detail.label.tel') }}</p>
                <el-col :span="18">
                    <el-form-item prop="tel">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.tel"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <el-form-item prop="line_name">
                <p class="label">{{ t('user.detail.label.line_name') }}</p>
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
            <el-form-item prop="status">
                <p class="label">{{ t('user.detail.label.status') }}</p>
                <el-radio-group v-model="ruleForm.status">
                    <el-radio label="1">{{ t('user.detail.value.status.1') }}</el-radio>
                    <el-radio label="2">{{ t('user.detail.value.status.2') }}</el-radio>
                    <el-radio label="3">{{ t('user.detail.value.status.3') }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="is_active">
                <p class="label">{{ t('coach.detail.label.is_active') }}</p>
                <el-switch v-model="ruleForm.is_active" /> <span style="padding-left: 8px;">{{ ruleForm.is_active ? t('user.detail.value.is_active.active') : t('user.detail.value.is_active.inactive') }}</span>
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
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import type { UserDetail } from '@/libs/interface/userInterface'
import { LoadingVue } from '@/components/common/loading'
import dayjs from 'dayjs'

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
    line_name: '',
    gender: '1',
    status: '0',
    is_active: false,
} as UserDetail)

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
            message: t('error.required', ['first_name_furigana']),
            trigger: 'blur',
        },
        { max: 255, message: t('error.max', [t('first_name_furigana'), 255]), trigger: 'blur' },
    ],
    last_name_furigana: [
        {
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
            if (!(<any>Object).values(ruleForm.birthdays).includes('')) {
                ruleForm.birthday = (<any>Object).values(ruleForm.birthdays).join("/")
            }
            const userStore = useUserStore()
            await userStore.updateUser(ruleForm, id)
            await getData()
            loading.close()
        } else {
            loading.close()
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
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
    ruleForm.birthdays.day = useStore.user.birthday ? dayjs(new Date(useStore.user.birthday)).format(
        'DD'
    ) : ''
    ruleForm.birthdays.month = useStore.user.birthday ? dayjs(new Date(useStore.user.birthday)).format(
        'MM'
    ) : ''
    ruleForm.birthdays.year = useStore.user.birthday ? dayjs(new Date(useStore.user.birthday)).format(
        'YYYY'
    ): ''
    ruleForm.gender = `${useStore.user.gender}`
    ruleForm.status = `${useStore.user.status}`
    ruleForm.is_active = !!useStore.user.is_active
}

onMounted(async () => {
    await nextTick()
    await getData()
})
</script>
