<template>
    <template v-if="isLogin">
        <SidebarLayoutVue />
        <section id="wrapper" :class="isCollapse ? 'isCollapse' : ''">
            <AppHeaderVue />
            <main id="main">
                <slot />
            </main>
            <AppFooterVue />
        </section>
    </template>
    <template v-else>
        <slot />
    </template>
</template>

<script setup lang="ts">
import { AppFooterVue, AppHeaderVue, SidebarLayoutVue } from './index'
import { useSettingStore, useAuthStore } from '@/stores/index'
import { ref } from 'vue'

const authStore = useAuthStore()
const settingStore = useSettingStore()
const isLogin = ref(authStore.isAuthenticated)
const isCollapse = ref(settingStore.getCollapse)

authStore.$subscribe((mutations, state) => {
    console.log('state.token :>> ', state.token)
    isLogin.value = !!state.token
})

settingStore.$subscribe((mutations, state) => {
    isCollapse.value = state.collapse
})
</script>
