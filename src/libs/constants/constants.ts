import dayjs from 'dayjs'

export const START_YEAR = 1920
export const CURRENT_YEAR = new Date().getFullYear()
export const GENDERS = [
    { key: '1', label: '男性' },
    { key: '2', label: '女性' },
    { key: '0', label: '選択なし' },
]
export const MONTHS = Array.from({ length: 12 }, (item, i) => {
    return dayjs(new Date(0, i)).format('MM')
})
export const YEARS = Array(CURRENT_YEAR - START_YEAR + 1)
    .fill((item: any) => item)
    .map((_, idx) => CURRENT_YEAR - idx)
export const YEARS_START_FROM_2022 = Array(CURRENT_YEAR - 2022 + 1)
    .fill((item: any) => item)
    .map((_, idx) => CURRENT_YEAR - idx)
export const CURRENT_MONTH = dayjs(new Date()).format('MM')
export const CURRENT_DAY = dayjs(new Date()).format('DD')
export const IMAGE_EXTENSIONS = ['jpeg', 'png', 'jpg']
export const AGES = 18

export const CONTACT_TYPES = {
    type_user: 1,
    type_partner: 2,
    type_other: 3,
}

export const HTTP_STATUS = {
    success: 200,
}

export const MAX_SIZE_IMAGE = 10 //MB

export const MAX_SIZE_IMAGE_BYTE = 10485760 //KB

export const TYPE_QUESTION = {
    text: 1,
    textarea: 2,
    checkbox: 3,
    radiobox: 4,
    dropdown: 5,
}

export const FORMAT_DAY = (day: any, format = 'YYYY-MM-DD') => {
    return dayjs(new Date(day)).format(format)
}
