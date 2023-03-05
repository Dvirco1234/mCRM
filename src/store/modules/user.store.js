import { userService } from '../../services/user.service'

export const userStore = {
    state: {
        loggedInUser: null,
        // userPrefs: null,
    },
    getters: {
        // getUserPrefs(state) {
        //     return state.userPrefs
        // }
    },
    mutations: {
        // setUserPrefs(state) {
        //    state.userPrefs = userService.getUserPrefs()
        // },
        // saveUserPrefs(state, { key, value }) {
        //     state.userPrefs[key] = value
        //     userService.saveUserPrefs(state.userPrefs)
        // }
    },
    actions: {

    }
}