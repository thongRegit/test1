<template>
    <aside id="sidebar-layout" :class="isCollapse ? 'isCollapse' : ''">
        <div class="logo">
            <a href="#" class="simple-text logo-mini">
                <div class="logo-img">
                    <img
                        src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
                        alt=""
                    />
                </div>
            </a>
            <router-link :to="{ name: 'home' }" class="simple-text logo-normal">
                BVEASTS
            </router-link>
        </div>
        <el-menu
            :default-active="isActive"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :router="true"
            :unique-opened="true"
        >
            <template v-for="item in SIDE_MENU_ADMIN" :key="item.index">
                <el-menu-item
                    v-if="item.menu_childs.length === 0"
                    :index="item.index"
                    :route="item.route"
                    :class="
                        isActive === item.index ? 'is-opened is-active' : ''
                    "
                >
                    <el-icon
                        v-if="item.index == '1'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Discount
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '2'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Collection
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '3'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Postcard
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '4'"
                        :size="24"
                        style="margin-right: 16px"
                        ><UserFilled
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '5'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Avatar
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '6'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Reading
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '7'"
                        :size="24"
                        style="margin-right: 16px"
                        ><DocumentAdd
                    /></el-icon>
                    <el-icon
                        v-else-if="item.index == '8'"
                        :size="24"
                        style="margin-right: 16px"
                        ><Checked
                    /></el-icon>
                    <template #title>{{ t(`${item.label}`) }}</template>
                </el-menu-item>
                <el-sub-menu
                    v-else
                    :index="item.index"
                    :route="item.route"
                    :class="
                        isActive === item.index && isOpen ? 'is-opened' : ''
                    "
                >
                    {{ item.route }}
                    <template #title>
                        <el-icon>
                            <Avatar v-if="item.index == '1'" />
                            <CopyDocument v-else-if="item.index == '2'" />
                            <Comment v-else-if="item.index == '5'" />
                            <List v-else-if="item.index == '4'" />
                        </el-icon>
                        <span> {{ t(`${item.label}`) }}</span>
                    </template>
                </el-sub-menu>
            </template>
        </el-menu>
    </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { SIDE_MENU_ADMIN } from '@/libs/utils/links'
import { useSettingStore } from './../../stores/setting'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const settingStore = useSettingStore()
const isCollapse = ref(settingStore.getCollapse)
const route = useRoute()
const router = useRouter()
const isActive = ref('')
const isOpen = ref(true)

settingStore.$subscribe((mutations, state) => {
    isCollapse.value = state.collapse
})

const handleOpen = (key: string, keyPath: string[]) => {
    isActive.value = key
    isOpen.value = false
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}

onMounted(async () => {
    await router.isReady()
    Object.keys(SIDE_MENU_ADMIN).forEach((key: string) => {
        const arr_child = SIDE_MENU_ADMIN[key].menu_childs
        if (arr_child.length === 0 && arr_child.route !== '') {
            if (
                route.path.includes(SIDE_MENU_ADMIN[key].route) ||
                SIDE_MENU_ADMIN[key].route === '/shops'
            ) {
                isActive.value = SIDE_MENU_ADMIN[key].index
            }
        } else {
            arr_child.forEach(function (key2: any, index2: any) {
                if (route.path.includes(arr_child[index2].route)) {
                    isActive.value = SIDE_MENU_ADMIN[key].index
                }
            })
        }
    })
})
</script>
