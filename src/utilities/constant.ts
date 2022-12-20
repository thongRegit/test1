import * as moment from 'moment'

export function generateTimeArr() {
    const x = {
        slotInterval: 30,
        openTime: '07:00',
        closeTime: '06:40',
    }
    const allTimes = []
    const startTime = moment(x.openTime, 'HH:mm')
    const endTime = moment(x.closeTime, 'HH:mm').add(1, 'days')
    //Loop over the times - only pushes time with 30 minutes interval
    while (startTime < endTime) {
        //Push times
        allTimes.push(startTime.format('hh:mm'))
        //Add interval of 30 minutes
        startTime.add(x.slotInterval, 'minutes')
    }
    return allTimes
}
