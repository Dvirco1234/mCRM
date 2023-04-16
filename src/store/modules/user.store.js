import { userService } from '../../services/user.service'

export const userStore = {
    state: {
        loggedinUser: userService.getLoggedinUser(),
        // userPrefs: null,
    },
    getters: {
        getLoggedinUser({ loggedinUser }) {
            return loggedinUser
        },
        // getUserPrefs(state) {
        //     return state.userPrefs
        // }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = (user)? {...user} : null
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
    }
}