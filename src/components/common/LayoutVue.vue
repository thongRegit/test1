<template>
    <template v-if="isLogin">
        <SidebarLayoutVue />
        <section id="wrapper" :class="isCollapse ? 'isCollapse' : ''">
            <AppHeaderVue />
            <main id="main">
                <AlertVue
                    :title="item.title"
                    :type="item.type"
                    :effect="item.effect"
                    :show-icon="item.showIcon"
                    :key="index"
                    v-for="(item, index) in alerts"
                />
                <slot />
            </main>
            <AppFooterVue />
        </section>
    </template>
    <template v-if="!isLogin">
        <slot />
    </template>
</template>

<script setup lang="ts">
import { AlertVue, AppFooterVue, AppHeaderVue, SidebarLayoutVue } from './index'
import { useSettingStore, useAuthStore, useAlertStore } from '@/stores/index'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const alertStore = useAlertStore()
const settingStore = useSettingStore()
const isLogin = ref(authStore.isAuthenticated)
const isCollapse = ref(settingStore.getCollapse)
const alerts = ref(alertStore.alerts)
const router = useRouter()

alertStore.$subscribe((mutations, state) => {
    alerts.value = state.alerts
})

authStore.$subscribe((mutations, state) => {
    isLogin.value = !!state.token
    if (!authStore.isAuthenticated) {
        router.push({ name: 'login' })
    }
})

settingStore.$subscribe((mutations, state) => {
    isCollapse.value = state.collapse
})
</script>
