<template>
    <section class="full-page section-image">
        <div class="content box">
            <h4 class="title">{{ t('login') }}</h4>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                class="demo-ruleForm"
            >
                <el-form-item prop="mail_address">
                    <el-input
                        :prefix-icon="Message"
                        v-model="ruleForm.mail_address"
                        :placeholder="t('mail_address')"
                        type="mail_address"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        :prefix-icon="Lock"
                        v-model="ruleForm.password"
                        :placeholder="t('password')"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item class="box-btn">
                    <el-button
                        type="primary"
                        @click="submitForm(ruleFormRef)"
                        >{{ t('login') }}</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div class="full-page-background"></div>
    </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import type { LoginDto } from '../libs/interface/auth'
import { useI18n } from 'vue3-i18n'
import { Message, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const ruleFormRef = ref<FormInstance>()

const validateMailAddress = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('User name not required'))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Password not required'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    mail_address: '',
    password: '',
} as LoginDto)

const rules = reactive({
    mail_address: [
        { validator: validateMailAddress, max: 225, trigger: 'blur' },
    ],
    password: [{ validator: validatePassword, max: 255, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await authStore.login(ruleForm)
            router.push('/')
        } else {
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.full-page {
    .full-page-background {
        position: absolute;
        z-index: 1;
        height: 100%;
        width: 100%;
        display: block;
        top: 0;
        left: 0;
        background-image: url(https://demos.creative-tim.com/vue-now-ui-dashboard-pro/img/bg13.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
    }
    &.section-image:after {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: block;
        left: 0;
        top: 0;
        content: '';
        background-color: rgba(0, 0, 0, 0.7);
    }
    .box {
        width: 460px;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: var(--el-box-shadow-lighter);
        padding: 30px 40px 40px;
        border-radius: 12px;
        z-index: 2;
        .demo-ruleForm {
            .el-form-item {
                flex-direction: column;
                &:last-child {
                    margin-bottom: 0;
                }
                :deep(.el-form-item__label) {
                    justify-content: flex-start;
                    width: 100%;
                }
                :deep(.el-form-item__content) {
                    .el-input {
                        .el-input__wrapper {
                            background-color: hsla(0, 0%, 100%, 0.1);
                            color: #fff;
                            border-color: hsla(0, 0%, 100%, 0.5);
                            border-radius: 30px;
                            padding: 10px 18px 10px 16px;
                            box-shadow: none;
                            &.is-focus {
                                background-color: hsla(0, 0%, 100%, 0.2);
                            }
                            .el-input__inner {
                                color: #fff;
                                background-color: unset !important;
                            }
                        }
                    }
                }
                &.box-btn {
                    :deep(.el-form-item__content) {
                        display: flex;
                        justify-content: center;
                        margin-left: 0 !important;
                        padding-top: 40px;
                        .el-button {
                            background-color: #f96332;
                            color: #fff;
                            width: 100%;
                            padding: 20px;
                            box-shadow: none;
                            border: none;
                            border-radius: 30px;
                        }
                    }
                }
            }
        }
    }
}
.title {
    text-transform: uppercase;
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 32px;
}
</style>
