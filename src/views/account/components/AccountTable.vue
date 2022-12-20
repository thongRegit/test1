<template>
    <div>
        <el-button type="primary" @click="handleCreate">Create</el-button>
    </div>
    <el-table
        :data="tableDataRef"
        style="width: 100%"
        border
        class="table-scheduler"
        @cell-click="cellClick"
    >
        <el-table-column type="index" :index="indexMethod" width="80" />

        <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            :label="column.label"
            :class-name="column.class"
            :prop="column.prop"
            :width="column.width"
        >
            <template v-slot="scope">
                <p v-html="scope.row[column.prop]"></p>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="date" label="12/8(木)" width="180" />
        <el-table-column prop="name" label="13/8(木)" width="180" />
        <el-table-column prop="address" label="14/8(木)" /> -->
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const indexMethod = (index: number) => {
    return timeArr[index]
}

const timeArr = [
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '00:00',
    '00:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',
    '6:30',
    '7:00',
]
const tableData = [
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
    {
        date: '',
        name: '',
        state: '',
    },
]

const columns = ref([
    {
        prop: 'id',
        label: '12/8(木)',
        width: 180,
        sortable: 'custom',
        class: '',
    },
    {
        prop: 'name',
        label: '13/8(木)',
        width: 180,
        sortable: 'custom',
        class: '',
    },
    {
        prop: 'created_at',
        label: '14/8(木)',
        width: 180,
        sortable: 'custom',
        class: '',
    },
])

const tableDataRef = ref(tableData)
const cellClick = (row: any, column: any, cell: any) => {
    console.log('row, column, cell :>> ', row, column, cell)
}

const handleCreate = () => {
    columns.value.push({
        prop: 'created_at',
        label: '14/8(木)',
        width: 180,
        sortable: 'custom',
        class: '',
    })
}
</script>
