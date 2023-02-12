import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'

import { clickOutsideDirective, columnsResizableDirective } from './directives'
import formatTime from './filters'

import './assets/styles/setup/_typography.scss'
import './style.scss'

const app = createApp(App)
app.config.globalProperties.$filters = {
    formatTime(value) {
        return formatTime(value)
    },
    firstLetter(txt) {
        return txt.charAt(0).toUpperCase()
    },
}
app.directive('click-outside', clickOutsideDirective)
app.directive('resize', columnsResizableDirective)

app.use(router)
app.use(store)

app.mount('#app')
