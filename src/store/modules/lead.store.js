import { leadService } from '../../services/lead-service.js'

export const leadStore = {
    state: {
        leads: null,
        currLead: null,
        newLeads: null,
        tableFields: null,
        cardSections: [],
        currFilterViews: [],
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
        getLeadCardSections({ cardSections }) {
            return cardSections
        },
        getCurrLead({ currLead }) {
            return currLead
        },
        getCurrFilterViews({ currFilterViews }) {
            return currFilterViews
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
            this.commit({ type: 'saveUserPrefs', key: 'tableFields', value: fields })
            // leadService.setTableFields(fields)
        },
        setCurrLead(state, { lead }) {
            state.currLead = lead
        },
        getLeadCardSections(state) {
            state.cardSections = leadService.getLeadCardSections()
        },
        toggleSectionOpen(state, { sectionId }) {
            const idx = state.cardSections.findIndex(s => s.id === sectionId)
            state.cardSections[idx].isOpen = !state.cardSections[idx].isOpen
            this.commit({
                type: 'saveUserPrefs',
                key: 'cardSections',
                value: JSON.parse(JSON.stringify(state.cardSections))
            })
        },
        toggleInputEditable(state, { sectionId, fieldIdx }) {
            console.log('fieldIdx: ', fieldIdx);
            const idx = state.cardSections.findIndex(s => s.id === sectionId)
            state.cardSections[idx].fields[fieldIdx].isEditable = !state.cardSections[idx].fields[fieldIdx].isEditable
        },
        getCurrFilterViews(state, { view }) {
            const filterViews = leadService.getCurrFilterViews(view)
            state.currFilterViews = filterViews
        },
        // getLeadById(state, { id }) {
        //     state.currLead = lead
        // },
    },
    actions: {
        async loadNewLeads({ commit }) {
            const newLeads = await leadService.getNewLeads()
            commit({ type: 'setNewLeads', newLeads })
        },
    },
}
