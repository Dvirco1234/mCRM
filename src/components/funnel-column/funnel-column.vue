<template>
    <section class="funnel-column">
        <header class="column-header">{{ column.stage }}</header>
        <Container class="column-main" group-name="col" @drop="(e) => onCardDrop(column.id, e)" @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)" :get-child-payload="getCardPayload(column.id)" drag-class="card-ghost"
            drop-class="card-ghost-drop" :drop-placeholder="dropPlaceholderOptions">
            <Draggable v-for="card in column.children" :key="card._id">
                <lead-preview :lead="card" />
            </Draggable>
        </Container>
    </section>
</template>

<script>
// const { Container, Draggable } = require('vue-dndrop')
import { Container, Draggable } from 'vue-dndrop'
import leadPreview from '../../components/lead-preview/lead-preview.vue'

export default {
    name: '',
    props: {
        column: Object,
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
    methods: {
        onCardDrop(columnId, dropResult) {
            this.$store.dispatch({ type: 'onCardDrop', columnId, dropResult })
        },
        getCardPayload(columnId) {
            return (index) => {
                const scene = this.$store.getters.getContacts
                // return scene.stages.filter((p) => p.id === columnId)[0].children[index]
                return scene.stages.filter((p) => p.id === columnId)[0].children[index]
            }
        },
        log(...params) {
            // console.log(...params);
        },
    },
    computed: {

    },
    created() {

    },
    components: {
        Container,
        Draggable,
        leadPreview
    },
}
</script>

<style>

</style>