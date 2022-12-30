import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/app.scss'
import 'element-plus/dist/index.css'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElemenentPlus from 'element-plus'
import jp from 'element-plus/dist/locale/ja.mjs'
import i18n from '@/lang'
import { createPinia } from 'pinia'

import TableData from '@/components/common/TableData.vue'
import Modal from '@/components/common/ModalVue.vue'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElemenentPlus, { locale: jp })
app.use(i18n)
app.use(pinia)
app.use(router)

app.component('table-data', TableData)
app.component('modal-box', Modal)

app.mount('#app')
