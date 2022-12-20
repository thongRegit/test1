<template>
    <BoxVue
        :title="'プラン一覧'"
        :type="'table'"
        :padding="20"
        :btnCreate="false"
        @on-create="handleCreate"
    >
        <template v-slot:header>
            <el-icon :size="24">
                <UserFilled />
            </el-icon>
        </template>
        <template v-slot:body>
            <AccountTableVue />
        </template>
    </BoxVue>
</template>

<script setup lang="ts">
import AccountTableVue from './components/AccountTable.vue'
import BoxVue from '@/components/common/BoxVue.vue'

const handleCreate = () => {
    console.log(1)
}
</script>
