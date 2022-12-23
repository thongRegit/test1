<template>
    <BoxVue :title="t('homepage.coach_detail')" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <el-tabs type="border-card">
                <el-tab-pane :label="t('coach.tabs.1')">
                    <UserForm />
                </el-tab-pane>
                <el-tab-pane :label="t('coach.tabs.2')">
                    <CoachInvitedList />
                </el-tab-pane>
                <el-tab-pane :label="t('coach.tabs.3')">
                    <CoachSessionList />
                </el-tab-pane>
            </el-tabs>
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import UserForm from './components/CoachForm.vue'
import CoachSessionList from './components/CoachSessionList.vue'
import CoachInvitedList from './components/CoachInvitedList.vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>
