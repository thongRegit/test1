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
                <p class="label">{{ t('user.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="10">
                        <el-form-item prop="first_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="last_name">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('user.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="10">
                        <el-form-item prop="first_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name_furigana"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item prop="last_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name_furigana"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('user.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="8">
                        <el-form-item prop="day">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.day"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="month">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.month"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="year">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.birthdays.year"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p class="label">{{ t('user.keyword_search') }}</p>
                <el-col :span="8">
                    <el-form-item prop="tel">
                        <el-input
                            class="base-input"
                            v-model="ruleForm.tel"
                            :placeholder="'名前'"
                        />
                    </el-form-item>
                </el-col>
            </div>
            <div>
                <p class="label">{{ t('user.status') }}</p>
                <el-row style="width: 100%" :gutter="16">
                    <el-col :span="12">
                        <el-form-item prop="first_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.first_name_furigana"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="last_name_furigana">
                            <el-input
                                class="base-input"
                                v-model="ruleForm.last_name_furigana"
                                :placeholder="'名前'"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item>
                <el-button @click="resetForm(ruleFormRef)">{{
                    t('btn_clear')
                }}</el-button>
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
import { useRouter } from 'vue-router'
import type { UserDetail } from '@/libs/interface/userInterface'
import dayjs, { Dayjs } from 'dayjs'

const { t } = useI18n()
const router = useRouter()

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
            message: 'Please input first_name',
            trigger: 'blur',
        },
        { max: 255, message: 'Length max 255', trigger: 'blur' },
    ],
    last_name: [
        {
            required: true,
            message: 'Please input last_name',
            trigger: 'blur',
        },
        { max: 255, message: 'Length max 255', trigger: 'blur' },
    ],
    first_name_furigana: [
        {
            required: true,
            message: 'Please input first_name_furigana',
            trigger: 'blur',
        },
        { max: 255, message: 'Length max 255', trigger: 'blur' },
    ],
    last_name_furigana: [
        {
            required: true,
            message: 'Please input last_name_furigana',
            trigger: 'blur',
        },
        { max: 255, message: 'Length max 255', trigger: 'blur' },
    ],
    tel: [{ max: 20, message: 'Length max 20', trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const id = router.currentRoute.value.params.id
            ruleForm.birthday = (<any>Object).values(ruleForm.birthdays).join("/")
            const userStore = useUserStore()
            await userStore.updateUser(ruleForm, id)
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onMounted(async () => {
    await nextTick()
    const useStore = useUserStore()
    const id = router.currentRoute.value.params.id
    await useStore.detailUser(id)
    ruleForm.first_name = useStore.user.first_name
    ruleForm.last_name = useStore.user.last_name
    ruleForm.first_name_furigana = useStore.user.first_name_furigana
    ruleForm.last_name_furigana = useStore.user.last_name_furigana
    ruleForm.tel = useStore.user.tel
    ruleForm.line_name = useStore.user.line_name
    ruleForm.birthday = useStore.user.birthday
    ruleForm.birthdays.day = dayjs(new Date(useStore.user.birthday)).format(
        'DD'
    )
    ruleForm.birthdays.month = dayjs(new Date(useStore.user.birthday)).format(
        'MM'
    )
    ruleForm.birthdays.year = dayjs(new Date(useStore.user.birthday)).format(
        'YYYY'
    )
    ruleForm.gender = useStore.user.gender
    ruleForm.status = useStore.user.status
    ruleForm.is_active = !!useStore.user.is_active
})
</script>
