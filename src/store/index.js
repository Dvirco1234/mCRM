import { createStore } from 'vuex'
import { userStore } from './modules/user.store'
import { userPrefsStore } from './modules/user-prefs.store'
import { contactStore } from './modules/contact.store'
import { leadStore } from './modules/lead.store'
import { statisticStore } from './modules/statistic.store'

export const store = createStore({
    strict: true,
    state: {
        isMenuOpen: true,
    },
    getters: {
        isMenuOpen({ isMenuOpen }) {
            return isMenuOpen
        },
    },
    mutations: {
        toggleMenu(state) {
            console.log('state: ', state)
            state.isMenuOpen = !state.isMenuOpen
        },
    },
    actions: {},
    modules: {
        contactStore,
        leadStore,
        userStore,
        userPrefsStore,
        statisticStore,
    },
})
