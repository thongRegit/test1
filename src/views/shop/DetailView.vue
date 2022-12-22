<template>
    <div class="shop-detail-wrapper">
        <div class="header-wrapper">
            <h4>{{t('shops.details.store_details')}}</h4>
            <el-button type="primary" @click="">
                {{t('shops.details.renew')}}
            </el-button>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped></style>
