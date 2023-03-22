import { leadService } from '../../services/lead-service.js'
import { dndService } from '../../services/dnd-service.js'

export const leadStore = {
    state: {
        leads: null,
        currLead: null,
        // newLeads: null,
        boardScene: null,
        filterBy: null,
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
            console.log('leads: ', leads);
            leads.map(lead => {
                const stageIdx = idxMap[lead.status]
                scene[stageIdx].children.push(lead)
            })
            console.log('scene: ', scene)
            return scene
        },
        // getBoardScene({ leads }, {getActiveBoardFields}) {
        //     const scene = getActiveBoardFields.map(stage => {
        //         const currStage = { ...stage }
        //         currStage.children = leads.filter(lead => lead.status === stage.key)
        //         return currStage
        //     })
        //     console.log('scene: ', scene)
        //     return scene
        // },
    },
    mutations: {
        setLeadsFromBoardScene(state, { scene }) {
            const leads = scene.reduce((acc, stage) => {
                const children = stage.children || []
                return [...acc, ...children]
            }, [])
            console.log('leads: ', leads);
            state.leads = leads
            console.log('state.leads: ', state.leads);
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
        // setBoardScene(state, { leads }) {
        //     state.boardScene = getActiveBoardFields.map(stage => {
        //         const currStage = { ...stage }
        //         currStage.children = state.leads.filter(lead => lead.status === stage.key)
        //         return currStage
        //     })
        // },
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
                const scene = JSON.parse(JSON.stringify(getters.getBoardScene))
                // const colIdx = scene.findIndex(col => col.id === columnId)
                // const column = scene[colIdx]
                const column = scene.find(col => col.id === columnId)
                const colIdx = scene.indexOf(column)
                column.children = dndService.applyDrag(column.children, dropResult)
                scene.splice(colIdx, 1, column)
                console.log('scene: ', scene)
                // FIXME now it works fine if drag forward' but backwards it  duplicates and not working - this is because it updates in two steps.
                // FIXME maybe the solution is to hold temporary scene object, update the scene and then update the leads (once - after all other updates.)
                if (dropResult.addedIndex !== null) {
                    dispatch({ type: 'onUpdateLead', lead: dropResult.payload, key: 'status', value: column.key })
                    // commit({type: 'updateLead', id: dropResult.payload._id, key: 'status', value: column.key})
                }
                commit({ type: 'setLeadsFromBoardScene', scene })
            }
        },
        // onLeadCardDrop({ commit, getters }, { columnId, dropResult }) {
        //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        //         const scene = JSON.parse(JSON.stringify(getters.getContacts))
        //         const column = scene.stages.find(p => p.id === columnId)
        //         const columnIndex = scene.stages.indexOf(column)

        //         column.children = dndService.applyDrag(column.children, dropResult)
        //         scene.stages.splice(columnIndex, 1, column)

        //         commit({ type: 'setContacts', scene })
        //     }
        // },
        // async setFilter({ commit, state }, { filterBy }) {
        //     const leads = leadService.loadLeads(filterBy)
        //     commit({ type: 'setToys', toys })
        // },
    },
}
