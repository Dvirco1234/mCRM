import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'
// import { Quasar } from 'quasar'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { clickOutsideDirective, columnsResizableDirective } from './directives'
import formatTime from './filters'

// import '@quasar/extras/material-icons/material-icons.css'
// import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
// import 'quasar/src/css/index.sass'

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

app.component('Datepicker', Datepicker)

app.use(router)
app.use(store)
// app.use(Quasar, {
//     plugins: {}, // import Quasar plugins and add here
//   })

app.mount('#app')
