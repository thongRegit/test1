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
            <a
                href="https://www.creative-tim.com/product/vue-material-dashboard"
                target="_blank"
                class="simple-text logo-normal"
            >
                BVEASTS
            </a>
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
    Object.keys(SIDE_MENU_ADMIN).forEach((key) => {
        const arr_child = (<any>SIDE_MENU_ADMIN)[key].menu_childs
        if (arr_child.length === 0 && arr_child.route !== '') {
            if ((<any>SIDE_MENU_ADMIN)[key].route === route.path) {
                isActive.value = (<any>SIDE_MENU_ADMIN)[key].index
            }
        } else {
            arr_child.forEach(function (key2: any, index2: any) {
                if (arr_child[index2].route === route.path) {
                    isActive.value = (<any>SIDE_MENU_ADMIN)[key].index
                }
            })
        }
    })
})
</script>

<style lang="scss" scoped>
#sidebar-layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 240px;
    height: 100%;
    border-right: solid 1px var(--el-menu-border-color);
    transition: width 1s;
    background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    &::after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(27, 27, 27, 0.87);
        opacity: 0.85;
        top: 0;
        left: 0;
        z-index: 2;
    }
    &.isCollapse {
        width: calc(
            var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2 +
                1px
        );
        .el-menu {
            .el-menu-item {
                span {
                    display: none;
                }
            }
        }
    }
    .logo {
        text-align: center;
        padding: 15px 0;
        z-index: 4;
        position: relative;
        height: 70px;
        .logo-mini {
            float: left;
            width: 40px;
            text-align: center;
            margin-left: 25px;
            margin-right: 11px;
            position: relative;
            top: -5px;
            img {
                width: 55%;
                vertical-align: -webkit-baseline-middle;
            }
        }
        .simple-text {
            text-transform: uppercase;
            padding: 5px 0;
            display: block;
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            text-decoration: none;
            float: left;
            color: var(--color-background);
            .logo-img {
                width: 40px;
                display: inline-block;
                height: 40px;
                background: var(--color-background);
                border-radius: 50%;
                text-align: center;
                overflow: hidden;
                -webkit-box-shadow: 0 10px 30px -12px rgb(0 0 0 / 42%),
                    0 4px 25px 0 rgb(0 0 0 / 12%),
                    0 8px 10px -5px rgb(0 0 0 / 20%);
                box-shadow: 0 10px 30px -12px rgb(0 0 0 / 42%),
                    0 4px 25px 0 rgb(0 0 0 / 12%),
                    0 8px 10px -5px rgb(0 0 0 / 20%);
            }
        }
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 15px;
            height: 1px;
            width: calc(100% - 30px);
            background-color: hsla(0, 0%, 70.6%, 0.3);
        }
    }

    .el-menu {
        border-right: none;
        height: 100vh;
        overflow-y: auto;
        background-color: unset;
        position: relative;
        overflow: auto;
        width: 100%;
        z-index: 4;
        margin-top: 12px;

        .el-menu-item {
            transition: width 1s;
            margin: 10px 15px 0;
            border-radius: 3px;
            color: var(--color-background) !important;
            white-space: nowrap;
            cursor: pointer;
            letter-spacing: 1.6px;
            a {
                text-decoration: none;
                color: inherit;
                display: block;
                width: 100%;
            }
            &.is-active {
                background-color: var(--color-bg-main) !important;
                -webkit-box-shadow: 0 12px 20px -10px rgb(76 175 80 / 28%),
                    0 4px 20px 0 rgb(0 0 0 / 12%),
                    0 7px 8px -5px rgb(76 175 80 / 20%);
                box-shadow: 0 12px 20px -10px rgb(76 175 80 / 28%),
                    0 4px 20px 0 rgb(0 0 0 / 12%),
                    0 7px 8px -5px rgb(76 175 80 / 20%);
            }
            &:hover:not(.is-active) {
                background-color: hsla(0, 0%, 78.4%, 0.2) !important;
            }
        }

        .el-sub-menu {
            &.is-opened.is-opened {
                & > :deep(ul) {
                    display: block !important;
                }
            }
        }
    }
}
</style>
