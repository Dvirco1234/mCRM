import { dndService } from "../../services/dnd-service.js"
import { leadService } from "../../services/lead-service.js"

export const contactStore = {
    state: {
        contacts: null,
    },
    getters: {
        getContacts({contacts}) {
            return contacts
        },
    },
    mutations: {
        setContacts(state, { scene }) {
            state.contacts = scene
        }
    },
    actions: {
        async loadContacts({ commit }) {
            const scene = await leadService.getContacts('uYJG2HF0hW')
            console.log('contacts', scene)
            commit({ type: 'setContacts', scene })
        },
        // onCardDrop({ commit, getters }, { columnId, dropResult }) {
        //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        //         const scene = JSON.parse(JSON.stringify(getters.getContacts))
        //         const column = scene.stages.find((p) => p.id === columnId)
        //         const columnIndex = scene.stages.indexOf(column)

        //         column.children = dndService.applyDrag(column.children, dropResult)
        //         scene.stages.splice(columnIndex, 1, column)

        //         commit({ type: 'setContacts', scene })
        //     }
        // },
    }
}