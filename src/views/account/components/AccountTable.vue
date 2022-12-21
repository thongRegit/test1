<template>
    <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import jaLocale from '@fullcalendar/core/locales/ja'

const calendarOptions = ref({
    plugins: [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locale: jaLocale,
    allDaySlot: false,
    slotDuration: '00:15:00',
    headerToolbar: false,
    nowIndicator: true,
    firstDay: new Date().getDay(),
    displayEventTime: false,
    events: [
        {
            id: '1',
            title: 'shin lon',
            start: '2022-12-21 13:00:00',
            end: '2022-12-21 13:45:00',
        },
    ],
})
</script>
