<template>
    <section class="box" :style="{ maxWidth: width }" :class="name">
        <div class="box-head">
            <div
                class="head-icon"
                v-if="type === 'table' && showHeader"
                :style="{ padding: padding + 'px' }"
            >
                <slot name="header"></slot>
            </div>
            <div class="head-title" :class="{ heading: type === 'heading' }">
                <h4>{{ title }}</h4>
                <p>{{ description }}</p>
            </div>
            <div class="head-btn-create" v-if="btnCreate">
                <el-button type="primary" @click="emit('onCreate')"
                    >新規作成</el-button
                >
            </div>
        </div>
        <div class="box-body">
            <slot name="body"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
    type: String,
    title: String,
    description: String,
    padding: Number,
    name: String,
    btnCreate: {
        type: Boolean,
        default: false,
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
    width: {
        type: Number,
    },
})
const {
    type,
    title,
    description,
    padding,
    name,
    btnCreate,
    width,
    showHeader,
} = toRefs(props)

const emit = defineEmits(['onCreate'])
</script>

<style lang="scss" scoped>
.box {
    background-color: var(--vt-c-white);
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    border-radius: 3px;
    margin: 40px 0;
    width: 100%;
    overflow: unset;
    padding: 12px 20px;

    .box-head {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        .head-icon {
            padding: 24px;
            color: var(--vt-c-white);
            background-color: var(--color-bg-main);
            border-color: var(--color-bg-main);
            box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
                0 6px 10px 0 rgba(0, 0, 0, 0.14),
                0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
            border-radius: 4px;
            position: relative;
            top: -30px;
            width: auto;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .head-title {
            width: calc(100% - 180px);
            &.heading {
                padding: 12px 24px;
                color: var(--vt-c-white);
                background-color: var(--color-bg-main);
                border-color: var(--color-bg-main);
                box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
                    0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
                border-radius: 4px;
                position: relative;
                top: -30px;
                width: 100%;
            }
            h4 {
                font-size: 20px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }

        .head-btn-create {
            margin-left: auto;
            .el-button {
                width: var(--vt-w-button);
            }
        }
    }
}
</style>
