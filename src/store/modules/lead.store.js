import { leadService } from '../../services/lead-service.js'
import { dndService } from '../../services/dnd-service.js'

export const leadStore = {
    state: {
        leads: null,
        currLead: null,
        // newLeads: null,
        boardScene: null,
        filterBy: null,
        // TODO should come from database
        introInfo: {
            date: '03/04',
            nextDate: '11/04',
        },
    },
    getters: {
        getLeads({ leads }) {
            return leads
        },
        // getNewLeads({ newLeads }) {
        //     return newLeads
        // },
        getCurrLead({ currLead }) {
            return currLead
        },
        getCurrFilterBy({ filterBy }) {
            return filterBy
        },
        getBoardScene({ leads }, { getActiveBoardFields }) {
            const idxMap = getActiveBoardFields.reduce((acc, field, idx) => ({ ...acc, [field.key]: idx }), {})
            let scene = JSON.parse(JSON.stringify(getActiveBoardFields))
            leads.map(lead => {
                const stageIdx = idxMap[lead.status]
                scene[stageIdx].children.push(lead)
            })
            return scene
        },
        getCurrScene({ boardScene }) {
            return boardScene
        },
    },
    mutations: {
        setLeadsFromBoardScene(state) {
            const leads = state.boardScene.reduce((acc, stage) => {
                const children = stage.children || []
                return [...acc, ...children]
            }, [])
            state.leads = leads
        },
        setBoardScene(state, { boardFields = null }) {
            if (state.boardScene) return
            if (!boardFields) {
                state.boardScene = null
                return
            }
            const idxMap = boardFields.reduce((acc, field, idx) => ({ ...acc, [field.key]: idx }), {})
            let scene = JSON.parse(JSON.stringify(boardFields))
            state.leads.map(lead => {
                const stageIdx = idxMap[lead.status]
                scene[stageIdx].children.push(lead)
            })
            state.boardScene = scene
        },
        setCurrScene(state, { scene }) {
            state.boardScene = scene
        },
        setLeads(state, { leads }) {
            state.leads = leads
            state.currLead = leads[0]
        },
        // setNewLeads(state, { newLeads }) {
        //     state.newLeads = newLeads
        // },
        setCurrLead(state, { lead }) {
            state.currLead = lead
        },
        setFilter(state, { filterBy, isSingleFilter = false }) {
            if (!state.filterBy || isSingleFilter) state.filterBy = {}
            state.filterBy = { ...state.filterBy, ...filterBy }
            if (state.filterBy?.all) state.filterBy = null
        },
        updateLeads(state, { leads }) {
            state.leads = leads
        },
        // updateLead(state, { id, key, value }) {
        //     const lead = state.leads.find(l => l._id === id)
        //     lead[key] = value
        //     console.log('lead: ', lead)
        // },
        updateLead(state, { updatedLead, key, value }) {
            // const idx = state.leads.findIndex(l => l._id === updatedLead._id)
            // state.leads.splice(idx, 1, updatedLead)
            const lead = state.leads.find(l => l._id === updatedLead._id)
            lead[key] = value
        },
    },
    actions: {
        async loadLeads({ commit, state: { filterBy } }) {
            const leads = await leadService.getLeads(filterBy)
            commit({ type: 'setLeads', leads })
        },
        async loadNewLeads(store) {
            // console.log('store: ', store);
            // const newLeads = await leadService.getNewLeads()
            // commit({ type: 'setNewLeads', newLeads })
        },
        async setFilter({ commit, dispatch }, { filterBy, isSingleFilter }) {
            if (isSingleFilter) commit({ type: 'setActiveFilter', filterBy })
            commit({ type: 'setFilter', filterBy, isSingleFilter })
            dispatch({ type: 'loadLeads' })
            // const leads = leadService.loadLeads(filterBy)
        },
        async onUpdateLead({ commit }, { lead, key, value }) {
            const leadToUpdate = JSON.parse(JSON.stringify(lead))
            leadToUpdate[key] = value
            const updatedLead = await leadService.saveLead(leadToUpdate)
            commit({ type: 'updateLead', updatedLead, key, value })
            return updatedLead
        },
        async onLeadCardDrop({ commit, getters, dispatch }, { columnId, dropResult }) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                console.log('dropResult: ', dropResult)
                commit({ type: 'setBoardScene', boardFields: getters.getActiveBoardFields })

                const scene = JSON.parse(JSON.stringify(getters.getCurrScene))
                const column = scene.find(col => col.id === columnId)
                const colIdx = scene.indexOf(column)
                column.children = dndService.applyDrag(column.children, dropResult)
                console.log('column.children: ', column.children);
                scene.splice(colIdx, 1, column)
                console.log('scene: ', scene);
                
                commit({ type: 'setCurrScene', scene })
                
                if (dropResult.addedIndex !== null) {
                    dispatch({ type: 'onUpdateLead', lead: dropResult.payload, key: 'status', value: column.key })
                    if (column.key === 'new') dispatch({ type: 'onUpdateLead', lead: dropResult.payload, key: 'manager', value: '' })
                    else dispatch({ type: 'onUpdateLead', lead: dropResult.payload, key: 'manager', value: getters.getLoggedinUser.fullname })
                }
                commit({ type: 'setLeadsFromBoardScene' })
                commit({ type: 'setBoardScene' })
            }
        },
    },
}
