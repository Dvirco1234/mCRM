export const sheetService = {
    getLeads,
    getNewLeads,
    getContacts
}

async function getLeads() {
    return new Promise((resolve, reject) => {
        const onSuccess = (leads) => { resolve(leads) }
        google.script.run.withSuccessHandler(onSuccess).getLeads()
    })
}

async function getNewLeads() {
    return new Promise((resolve, reject) => {
        const onSuccess = (leads) => { resolve(leads) }
        google.script.run.withSuccessHandler(onSuccess).getNewLeads()
    })
}

async function getContacts(userId) {
    return new Promise((resolve, reject) => {
        const onSuccess = (contacts) => { resolve(contacts) }
        google.script.run.withSuccessHandler(onSuccess).getContacts(userId)
    })
}