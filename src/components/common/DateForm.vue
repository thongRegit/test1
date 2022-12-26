<!-- <template>
    <div class="date-form">
        <el-row>
            <div class="el-col year-input">
                <el-form-item prop="year">
                    <el-select
                        v-model="data.year"
                        :placeholder="yearText"
                        class="input-datetime"
                        name="year"
                        @change="changeDate"
                    >
                        <el-option
                            v-for="year in years"
                            :key="year"
                            :label="year"
                            :value="year"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="el-col">
                <el-form-item prop="month">
                    <el-select
                        v-model="data.month"
                        :placeholder="$t('staff.form.input_placeholder.month')"
                        class="input-datetime"
                        name="month"
                        :no-data-text="$t('no_data')"
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
            </div>
            <div class="el-col day-input" v-if="showDayInput">
                <el-form-item prop="day">
                    <el-select
                        v-model="data.day"
                        :placeholder="$t('staff.form.input_placeholder.day')"
                        class="input-datetime"
                        name="day"
                        :no-data-text="$t('no_data')"
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
            </div>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { YEARS, MONTHS, GENDERS } from '@/libs/constants/constants'
import { reactive, computed, onMounted } from 'vue'

const props = defineProps({
    date: {
        type: Object,
        required: false,
        default: { day: '', month: '', year: '' },
    },
    showDayInput: { type: Boolean, required: false, default: true },
    listYear: { type: Array, required: false, default: [] as any },
    yearPlaceHolder: { type: String, required: false, default: '' },
})

const date = reactive({
    years: YEARS,
    data: props.date,
    yearText: 'year',
})
const changeDate = () => {
    if (date.data.day > days.value.length) {
        date.data.day = ''
    }

    this.$emit('changeDate', date.data)
}

const formatDay = computed(() => {
    if (!this.date.year || !this.date.month || !this.date.day) {
        return ''
    }

    return this.date.year + '/' + this.date.month + '/' + this.date.day
})

const days = computed(() => {
    if (!this.data.year || !this.data.month) {
        return []
    }
    const quantityDay = new Date(this.data.year, this.data.month, 0).getDate()

    return [...Array(quantityDay).keys()].map((i) =>
        this.$dayjs(new Date(0, 0, i + 1)).format('DD')
    )
})

const months = computed(() => {
    if (!this.data.year) {
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
</style> -->
