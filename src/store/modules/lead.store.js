import { leadService } from '../../services/lead-service.js'

export const leadStore = {
    state: {
        leads: null,
        newLeads: null,
        tableFields: null,
    },
    getters: {
        getNewLeads({ newLeads }) {
            return newLeads
        },
        getTableFields({ tableFields }) {
            return tableFields
        },
        getActiveTableFields({ tableFields }) {
            return tableFields.filter(field => field.isActive)
        },
    },
    mutations: {
        setNewLeads(state, { newLeads }) {
            state.newLeads = newLeads
        },
        getTableFields(state) {
            state.tableFields = leadService.getTableFields()
        },
        setTableFields(state, { fields }) {
            state.tableFields = fields
            leadService.setTableFields(fields)
        },
    },
    actions: {
        async loadNewLeads({ commit }) {
            const newLeads = await leadService.getNewLeads()
            commit({ type: 'setNewLeads', newLeads })
        },
    },
}
