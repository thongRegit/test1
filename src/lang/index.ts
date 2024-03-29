import { createI18n } from 'vue3-i18n'
import { en } from './en/en'
import { jp } from './jp/jp'

const messages = {
    en: en,
    jp: jp,
}

const i18n = createI18n({
    locale: 'jp',
    messages,
})

export default i18n
