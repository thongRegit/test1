<template>
    <BoxVue :title="t('homepage.users')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <el-tabs type="border-card">
                <el-tab-pane :label="t('user.tabs.1')">
                    <UserForm />
                </el-tab-pane>
                <el-tab-pane :label="t('user.tabs.2')">
                    <UserListSession />
                </el-tab-pane>
                <el-tab-pane :label="t('user.tabs.3')">
                    <UserListCancelFee />
                </el-tab-pane>
            </el-tabs>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import UserForm from './components/UserForm.vue'
import UserListSession from './components/UserListSession.vue'
import UserListCancelFee from './components/UserListCancelFee.vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>
