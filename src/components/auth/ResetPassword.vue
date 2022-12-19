<template>
    <div class="box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            class="demo-ruleForm"
        >
            <el-form-item label="Password old" prop="pass">
                <el-input
                    v-model="ruleForm.pass"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="Password new" prop="checkPass">
                <el-input
                    v-model="ruleForm.checkPass"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="Password new confirm" prop="age">
                <el-input v-model.number="ruleForm.age" type="password" />
            </el-form-item>
            <div class="btn-box">
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >Submit</el-button
                >
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
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
</script>

<style lang="scss" scoped>
.title {
    text-transform: uppercase;
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.box {
    width: 50%;
    box-shadow: var(--el-box-shadow-lighter);
    padding: 30px 40px 40px;
    border-radius: 12px;

    .demo-ruleForm {
        .el-form-item {
            flex-direction: column;

            &:last-child {
                margin-bottom: 0;
            }

            :deep(.el-form-item__label) {
                justify-content: flex-start;
                width: 100%;
                height: unset;
                line-height: unset;
            }

            &.box-btn {
                :deep(.el-form-item__content) {
                    display: flex;
                    justify-content: center;
                    margin-left: 0 !important;
                }
            }
        }
        .btn-box {
            margin-top: 24px;
        }
    }
}
</style>
