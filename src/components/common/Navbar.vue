<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0" @click="handleCollapse">
            <span class="collapse-icon" :class="show ? 'rotate' : ''"
                ><el-icon><ArrowLeftBold /></el-icon
            ></span>
        </el-menu-item>
        <el-menu-item index="7">
            <span>TOP PAGE</span>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">
            <div>
                <el-icon><ChatDotRound /></el-icon>
            </div>
        </el-menu-item>
        <el-menu-item index="2">
            <div>
                <el-icon><Bell /></el-icon>
            </div>
        </el-menu-item>
        <el-sub-menu index="3">
            <template #title>
                <el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
                <span>{{ authStore.getFullName }}</span>
            </template>
            <el-menu-item index="3-1">Logout</el-menu-item>
            <el-menu-item index="3-2" route="/change-password"
                >Change password</el-menu-item
            >
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useSettingStore } from './../../stores/setting'

const router = useRouter()
const settingStore = useSettingStore()
const authStore = useAuthStore()
const show = ref(true)

const handleCollapse = () => {
    show.value = !show.value
    settingStore.handleCollapse()
}

const handleSelect = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
    if (key === '3-1') {
        authStore.logout()
        router.push('/login')
    }
}
</script>

<style lang="scss" scoped>
.el-menu {
    background-color: unset;
    &.el-menu--horizontal {
        border: none;
        & > .el-sub-menu {
            &:deep(.el-sub-menu__title) {
                &:hover {
                    background-color: unset;
                }
            }
        }
    }
    .el-menu-item {
        &:not(.is-disabled):hover {
            background-color: unset;
        }
    }
}
.el-avatar {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.flex-grow {
    flex-grow: 1;
}
.collapse-icon {
    transition: transform 1s;
}
.rotate {
    transform: rotate(-180deg);
}
</style>
