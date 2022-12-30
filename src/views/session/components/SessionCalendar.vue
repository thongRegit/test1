<template>
    <FullCalendar :key="refresh" :options="calendarOptions" />
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import jaLocale from '@fullcalendar/core/locales/ja'

const props = defineProps(['sessions', 'firstDay'] as any)
const { sessions, firstDay } = toRefs(props)
const refresh = ref(1)

const calendarOptions = ref({
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locale: jaLocale,
    allDaySlot: false,
    slotDuration: '00:15:00',
    headerToolbar: false,
    nowIndicator: true,
    firstDay: new Date(firstDay.value).getDay(),
    initialDate: firstDay.value,
    displayEventTime: new Date(),
    events: sessions,
})

watch(firstDay, (value) => {
    calendarOptions.value.initialDate = value
    calendarOptions.value.firstDay = new Date(value).getDay()
    refresh.value += refresh.value
})
</script>
