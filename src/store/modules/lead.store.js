import { leadService } from '../../services/lead-service.js'
import { dndService } from '../../services/dnd-service.js'

export const leadStore = {
    state: {
        leads: null,
        currLead: null,
        newLeads: null,
        boardScene: null,
        filterBy: null,
    },
    getters: {
        getLeads({ leads }) {
            return leads
        },
        getNewLeads({ newLeads }) {
            return newLeads
        },
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
                if (!scene[stageIdx].children) scene[stageIdx].children = []
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
        setLeads(state, { leads }) {
            state.leads = leads
        },
        setNewLeads(state, { newLeads }) {
            state.newLeads = newLeads
        },
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
            console.log('dropResult: ', dropResult)
            // console.log('dropResult: ', dropResult.payload)
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const scene = JSON.parse(JSON.stringify(getters.getBoardScene))
                const column = scene.find(col => col.id === columnId)
                const columnIndex = scene.indexOf(column)

                column.children = dndService.applyDrag(column.children, dropResult)
                scene.splice(columnIndex, 1, column)

                // commit({ type: 'updateLeadOn', leads })
            }
        },
        // onLeadCardDrop({ commit, getters }, { columnId, dropResult }) {
        //     console.log('dropResult: ', dropResult.payload);
        //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        //         const scene = JSON.parse(JSON.stringify(getters.getBoardScene))
        //         const column = scene.find(col => col.id === columnId)
        //         const columnIndex = scene.indexOf(column)

        //         column.children = dndService.applyDrag(column.children, dropResult)
        //         scene.splice(columnIndex, 1, column)

        //         commit({ type: 'updateLeadOn', leads })
        //     }
        // },
        // async setFilter({ commit, state }, { filterBy }) {
        //     const leads = leadService.loadLeads(filterBy)
        //     commit({ type: 'setToys', toys })
        // },
    },
}
