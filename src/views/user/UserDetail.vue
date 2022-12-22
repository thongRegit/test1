<template>
    <BoxVue :title="t('homepage.user')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <UserForm />
        </template>
    </BoxVue>
    <UserListSession />
    <UserListCancelFee />
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import UserForm from './components/UserForm.vue'
import UserListSession from './components/UserListSession.vue'
import UserListCancelFee from './components/UserListCancelFee.vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>
