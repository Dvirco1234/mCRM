export const statisticStore = {
    state: {
        dailyScrum: {
            total: {
                totalTime: 0,
                answeredCalls: 0,
                irrelevants: 0,
                followups: 0,
                whatsapps: 0,
                introInvites: 0,
            },
        },
        introScrum: {
            total: {
                introLeads: 0,
                answeredCalls: 0,
                whatsapps: 0,
                answeredWhatsapps: 0,
                confirmed: 0,
                attended: 0,
            },
        },
        meetingsScrum: {
            total: {
                leads: 0,
                answeredCalls: 0,
                whatsapps: 0,
                scheduledMeetings: 0,
            }
        },
    },
    getters: {
        getDailyScrum({ dailyScrum }) {
            return dailyScrum
        },
    },
    mutations: {
        updateDailyScrum(state, { key, value }) {
            if (!state.dailyScrum[manager]) state.dailyScrum[manager] = {
                totalTime: 0,
                answeredCalls: 0,
                irrelevants: 0,
                followups: 0,
                whatsapps: 0,
                introInvites: 0,            
            }
            
        },
    },
    actions: {
        
    }
}