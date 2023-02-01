<template>
    <div class="funnel-board main-layout" v-if="scene">
        <funnel-column v-for="column in scene.stages" :key="column._id" :column="column" />
    </div>
</template>

<script>
import funnelColumn from '../../components/funnel-column/funnel-column.vue'

export default {
    name: '',
    props: {
        // scene: Object
    },
    components: { funnelColumn },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        scene() {
            return this.$store.getters.getContacts
        },
    },
    created() {

    },
}
</script>

<style>

</style>