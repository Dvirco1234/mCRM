<template>
    <section class="lead-board main-layout" v-if="scene">
        <!-- <funnel-column v-for="column in scene.stages" :key="column._id" :column="column" /> -->
        <article class="funnel-column" v-for="column in scene" :key="column.id">
            <header class="column-header">{{ column.txt }}</header>
            <Container class="column-main" group-name="col" @drop="(e) => onCardDrop(column.id, e)" @drag-start="(e) => log('drag start', e)"
                @drag-end="(e) => log('drag end', e)" :get-child-payload="getCardPayload(column.id)" drag-class="card-ghost"
                drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions">
                <Draggable v-for="card in column.children" :key="card._id">
                    <lead-preview :lead="card" />
                </Draggable>
            </Container>
        </article>
    </section>
</template>

<script>
import { Container, Draggable } from 'vue-dndrop'
import leadPreview from '../../components/lead-preview/lead-preview.vue'
// import funnelColumn from '../../components/funnel-column/funnel-column.vue'

export default {
    name: 'lead-board',
    props: {
        // scene: Object
    },
    data() {
        return {
            dropPlaceholderOptions: {
                className: "drop-preview",
                animationDuration: "150",
                showOnTop: true,
            },
        }
    },
    created() {
    },
    methods: {
        onCardDrop(columnId, dropResult) {
            this.$store.dispatch({ type: 'onLeadCardDrop', columnId, dropResult })
        },
        getCardPayload(columnId) {
            return (index) => {
                // const scene = this.$store.getters.getContacts
                // return scene.stages.filter((p) => p.id === columnId)[0].children[index]
                return this.scene.filter(col => col.id === columnId)[0].children[index]
            }
        },
        log(...params) {
            // console.log(...params);
        },
    },
    computed: {
        // scene() {
        //     return this.$store.getters.getContacts
        // },
        leads() {
            return this.$store.getters.getLeads
        },
        boardColumns() {
            return this.$store.getters.getActiveBoardFields
        },
        // stages() {
        //     return this.boardColumns.map(column => ({}))
        // },
        scene() {
            return this.$store.getters.getBoardScene
        },
        // scene() {
        //     const scene = this.boardColumns.map(stage => {
        //         const currStage = { ...stage }
        //         currStage.children = this.leads.filter(lead => lead.status === stage.key)
        //         return currStage
        //     })
        //     console.log('scene: ', scene)
        //     return scene
        // },
    },
    components: {
        Container,
        Draggable,
        leadPreview
    },
}
</script>

<style></style>