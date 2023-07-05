import { leadService } from '../../services/lead-service.js'
import { settingsService } from '../../services/settings-service.js'
import { userService } from '../../services/user.service'

export const userPrefsStore = {
    state: {
        userPrefs: null,
        tableFields: null,
        boardFields: null,
        currViewName: '',
        cardSections: [],
        currFilterViews: [],
        filterOpenFieldsMap: {},
        statusTxtMap: {
            new: 'חדש',
            beforeIntro: 'לפני ע"פ',
            intro: 'ערב פתוח',
            afterIntro: 'אחרי ע"פ',
            challenge: 'אתגר',
            interviewScheduled: 'נקבע ראיון',
            interview: 'בתהליך ראיון',
            done: 'רשום',
            future: 'אולי בעתיד',
            close: 'סגור',
        },
        datalists: null,
    },
    getters: {
        getUserPrefs(state) {
            return state.userPrefs
        },
        getCurrViewFields({ tableFields, boardFields, currViewName }) {
            return currViewName === 'board' ? boardFields : tableFields
        },
        getActiveTableFields({ tableFields }) {
            return tableFields.filter(field => field.isActive)
        },
        getActiveBoardFields({ boardFields }) {
            return boardFields.filter(field => field.isActive)
        },
        getLeadCardSections({ cardSections }) {
            // return cardSections
            return cardSections.map(s => {
                const fields = s.fields.filter(f => f.isActive)
                return { ...s, fields }
            })
        },
        getCurrFilterViews({ currFilterViews }) {
            return currFilterViews
        },
        getFilterOpenFieldsMap({ filterOpenFieldsMap }) {
            return filterOpenFieldsMap
        },
        getStatusTxtMap({ statusTxtMap }) { 
            return statusTxtMap
        },
        getDatalists({ datalists }) { 
            return datalists
        },
    },
    mutations: {
        setUserPrefs(state) {
            state.userPrefs = userService.getUserPrefs()
        },
        saveUserPrefs(state, { key, value }) {
            state.userPrefs[key] = value
            userService.saveUserPrefs(state.userPrefs)
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
        getLeadCardSections(state) {
            state.cardSections = leadService.getLeadCardSections()
        },
        setDatalists(state, { datalists }) {
            state.datalists = datalists
        },
        toggleCardSectionOpen(state, { sectionId }) {
            const idx = state.cardSections.findIndex(s => s.id === sectionId)
            state.cardSections[idx].isOpen = !state.cardSections[idx].isOpen
            this.commit({
                type: 'saveUserPrefs',
                key: 'cardSections',
                value: JSON.parse(JSON.stringify(state.cardSections)),
            })
        },
        // toggleCardInputEditable(state, { sectionId, fieldIdx }) {
        //     const idx = state.cardSections.findIndex(s => s.id === sectionId)
        //     state.cardSections[idx].fields[fieldIdx].isEditable = !state.cardSections[idx].fields[fieldIdx].isEditable
        // },
        toggleCardInputEditable(state, { sectionId, fieldKey }) {
            const secIdx = state.cardSections.findIndex(s => s.id === sectionId)
            const field = state.cardSections[secIdx].fields.find(f => f.key === fieldKey)
            field.isEditable = !field.isEditable
            // const fieldIdx = state.cardSections[secIdx].fields.findIndex(f => f.key === fieldKey)
            // state.cardSections[secIdx].fields[fieldIdx].isEditable = !state.cardSections[secIdx].fields[fieldIdx].isEditable
        },
        getCurrFilterViews(state, { view }) {
            const filterViews = leadService.getCurrFilterViews(view)
            state.currFilterViews = filterViews
        },
        setCurrViewName(state, { view }) {
            state.currViewName = view
            // state.currViewName = view === 'board' ? state.boardFields : state.tableFields
        },
        setCurrViewFields(state, { fields }) {
            const key = state.currViewName === 'board' ? 'boardFields' : 'tableFields'
            state[key] = fields
            this.commit({ type: 'saveUserPrefs', key, value: fields })
        },
        toggleCurrViewFields(state, { fieldId }) {
            const key = state.currViewName === 'board' ? 'boardFields' : 'tableFields'
            const idx = state[key].findIndex(field => field.id === fieldId)
            state[key][idx].isActive = !state[key][idx].isActive
            this.commit({ type: 'saveUserPrefs', key, value: state[key] })
        },
        toggleFilterViewOpen(state, { key }) {
            state.filterOpenFieldsMap[key] = state.filterOpenFieldsMap[key] ? false : true
        },
        setActiveFilter(state, { filterBy }) {
            const entries = Object.entries(filterBy)
            const [key, value] = entries[0]
            // console.log('key: ', key);
            // console.log('value: ', value);
            // if(!filterBy) state.currFilterViews[0].isActive
            state.currFilterViews.forEach(filterView => {
                if (filterView.isActive) filterView.isActive = false
                if (key === filterView.filterKey && value === filterView.key) filterView.isActive = true
                if (filterView.options)
                    filterView.options.forEach(option => {
                        if (option.isActive) option.isActive = false
                        if (key === option.filterKey && value === option.key) option.isActive = true
                        else if (key === option.filterKey && value instanceof Date ) option.isActive = true
                        if (option.options)
                            option.options.forEach(o => {
                                if (o.isActive) o.isActive = false
                                if (key === o.filterKey && value === o.key) o.isActive = true
                            })
                    })
            })
        },
        // setActiveFilters(state, { key }) {

        // },
    },
    actions: {
        async getDatalists({ commit }) {
            const datalists = await settingsService.getDatalists()
            commit({ type: 'setDatalists', datalists })
        },
    },
}
