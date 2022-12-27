<template>
    <div class="date-form">
        <el-row style="width: 100%" :gutter="16">
            <el-col :span="8">
                <el-form-item prop="year">
                    <el-select
                        v-model="date.data.year"
                        :placeholder="date.yearText"
                        class="base-input"
                        @change="changeDate"
                    >
                        <el-option
                            v-for="year in date.years"
                            :key="year"
                            :label="year"
                            :value="year"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="month">
                    <el-select
                        v-model="date.data.month"
                        :placeholder="t('input_placeholder.month')"
                        class="base-input"
                        name="month"
                        :no-data-text="t('no_data')"
                        @change="changeDate"
                    >
                        <el-option
                            v-for="(month, index) in months"
                            :key="index"
                            :label="month"
                            :value="month"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="day">
                    <el-select
                        v-model="date.data.day"
                        :placeholder="t('input_placeholder.day')"
                        class="base-input"
                        name="day"
                        :no-data-text="t('no_data')"
                        @change="changeDate"
                    >
                        <el-option
                            v-for="(day, index) in days"
                            :key="index"
                            :label="day"
                            :value="day"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { YEARS, MONTHS } from '@/libs/constants/constants'
import dayjs from 'dayjs'
import { reactive, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue3-i18n'

const { t } = useI18n()

const props = defineProps({
    date: {
        type: Object,
        required: false,
        default: () => {
            return {
                day: '',
                month: '',
                year: '',
            }
        },
    },
    showDayInput: { type: Boolean, required: false, default: true },
    listYear: {
        type: Array,
        required: false,
        default() {
            return []
        },
    },
    yearPlaceHolder: { type: String, required: false, default: '' },
})

const emit = defineEmits(['changeDate'])

const date = reactive({
    years: YEARS,
    data: props.date,
    yearText: 'year',
} as {
    years: any
    data: {
        day: string | number
        month: string
        year: any
    }
    yearText: string
})
const changeDate = () => {
    if (date.data.day > days.value.length) {
        date.data.day = ''
    }
    console.log('date.data :>> ', date.data)
    emit('changeDate', date.data)
}

const formatDay = computed(() => {
    if (!props.date.year || !props.date.month || !props.date.day) {
        return ''
    }

    return props.date.year + '/' + props.date.month + '/' + props.date.day
})

const days = computed(() => {
    if (!props.date.year || !props.date.month) {
        return []
    }
    const quantityDay = new Date(props.date.year, props.date.month, 0).getDate()

    return [...Array(quantityDay).keys()].map((i) =>
        dayjs(new Date(0, 0, i + 1)).format('DD')
    )
})

const months = computed(() => {
    if (!props.date.year) {
        return []
    }

    return MONTHS
})

onMounted(async () => {
    await nextTick()
    if (props.listYear.length > 0) {
        date.years = props.listYear
    }
    if (props.yearPlaceHolder) {
        date.yearText = props.yearPlaceHolder
    }
})
</script>
<style lang="scss">
.date-form {
    .el-form-item__content {
        margin-top: 0 !important;
    }

    .day-input {
        .input-datetime {
            margin-right: 0;
        }
    }
}
</style>
