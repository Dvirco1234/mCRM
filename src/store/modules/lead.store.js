import { leadService } from '../../services/lead-service.js'

export const leadStore = {
    state: {
        leads: null,
        currLead: null,
        newLeads: null,
        tableFields: null,
        boardFields: null,
        currViewName: '',
        cardSections: [],
        currFilterViews: [],
    },
    getters: {
        getLeads({ leads }) {
            return leads
        },
        getNewLeads({ newLeads }) {
            return newLeads
        },
        // getCurrViewFields({ currViewFields }) {
        //     return currViewFields
        // },
        getCurrViewFields({ tableFields, boardFields, currViewName }) {
            return (currViewName === 'board') ? boardFields : tableFields
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
        setLeads(state, { leads }) {
            state.leads = leads
        },
        setNewLeads(state, { newLeads }) {
            state.newLeads = newLeads
        },
        getTableFields(state) {
            state.tableFields = leadService.getTableFields()
        },
        getBoardFields(state) {
            state.boardFields = leadService.getBoardFields()
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
        setCurrViewName(state, { view }) {
            state.currViewName = view 
            // state.currViewName = view === 'board' ? state.boardFields : state.tableFields
        },
        toggleCurrViewFields(state, { fieldId }) {
            const key = state.currViewName === 'board' ? 'boardFields' : 'tableFields'
            const idx = state[key].findIndex(field => field.id === fieldId)
            state[key][idx].isActive = !state[key][idx].isActive
            this.commit({ type: 'saveUserPrefs', key, value: state[key] })
        },
    },
    actions: {
        async loadLeads({ commit }) {
            const leads = await leadService.getLeads()
            commit({ type: 'setLeads', leads })
        },
        async loadNewLeads({ commit }) {
            const newLeads = await leadService.getNewLeads()
            commit({ type: 'setNewLeads', newLeads })
        },
    },
}
