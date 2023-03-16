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
            console.log('getActiveBoardFields: ', getActiveBoardFields)
            const idxMap = getActiveBoardFields.reduce((acc, field, idx) => ({ ...acc, [field.key]: idx }), {})
            console.log('idxMap: ', idxMap)
            let scene = JSON.parse(JSON.stringify(getActiveBoardFields))
            leads.map(lead => {
                const stageIdx = idxMap[lead.status]
                // if (!scene[stageIdx].children) scene[stageIdx].children = []
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
            state.leads = leads
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
        updateLead(state, { id, key, value }) {
            const lead = state.leads.find(l => l._id === id)
            lead[key] = value
            console.log('lead: ', lead);
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
        onLeadCardDrop({ commit, getters }, { columnId, dropResult }) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                console.log('dropResult: ', dropResult)
                const scene = JSON.parse(JSON.stringify(getters.getBoardScene))
                // const colIdx = scene.findIndex(col => col.id === columnId)
                // const column = scene[colIdx]
                const column = scene.find(col => col.id === columnId)
                // console.log('column: ', column);
                const colIdx = scene.indexOf(column)

                column.children = dndService.applyDrag(column.children, dropResult)
                scene.splice(colIdx, 1, column)
                console.log('scene: ', scene);

                commit({ type: 'setLeadsFromBoardScene', scene })
                if (dropResult.addedIndex !== null) {
                    
                    // column.children[dropResult.addedIndex].status = column.key
                    // scene[colIdx].children[dropResult.addedIndex].status = column.key
                    // commit({ type: 'setLeadsFromBoardScene', scene, colIdx, newIdx: dropResult.addedIndex })
                    commit({type: 'updateLead', id: dropResult.payload._id, key: 'status', value: column.key})
                }
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
