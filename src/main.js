import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import router from './router'
// import { Quasar } from 'quasar'
import Datepicker from '@vuepic/vue-datepicker'
// import datePickerCmp from './components/utils/date-picker/date-picker.vue'
import svgIcon from './components/svg-icon.vue'
import firstLetter from './components/utils/first-letter.vue'
import selectDropdown from './components/utils/select-dropdown.vue'
import '@vuepic/vue-datepicker/dist/main.css'

import { VForm, VInput, VSelect } from 'validation-vue'

import { clickOutsideDirective, columnsResizableDirective } from './directives'
import formatTime from './filters'

// import '@quasar/extras/material-icons/material-icons.css'
// import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
// import 'quasar/src/css/index.sass'

import './assets/styles/setup/_typography.scss'
import './style.scss'

const app = createApp(App)
app.config.globalProperties.$filters = {
    formatTime(value, isDateOnly = false) {
        return formatTime(value, isDateOnly)
    },
    firstLetter(txt) {
        return txt.charAt(0).toUpperCase()
    },
}
app.directive('click-outside', clickOutsideDirective)
app.directive('resize', columnsResizableDirective)

// app.component('Cmp', datePickerCmp)
app.component('Datepicker', Datepicker)
app.component('svgIcon', svgIcon)
app.component('firstLetter', firstLetter)
app.component('selectDropdown', selectDropdown)
app.component('VSelect', VSelect)
app.component('VInput', VInput)
app.component('VForm', VForm)

app.use(router)
app.use(store)
// app.use(Quasar, {
//     plugins: {}, // import Quasar plugins and add here
//   })

app.mount('#app')
