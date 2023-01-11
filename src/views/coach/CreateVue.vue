<template>
    <BoxVue title="メンバー登録" :type="'table'" :padding="20">
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <UserForm />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import BoxVue from '@/components/common/BoxVue.vue'
import UserForm from './components/CreateForm.vue'
import { useI18n } from 'vue3-i18n'
import { ref } from 'vue'

const { t } = useI18n()
</script>
