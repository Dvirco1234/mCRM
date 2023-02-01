<template>
    <article class="lead-preview">
        <img v-if="lead.status !== 'New'" :src="lead.img" alt="">
        <div>
            <h5>שם: {{ lead.name }}</h5>
            <h5>טלפון: {{ lead.phone }}</h5>
        </div>
        <button v-if="lead.status === 'New'" @click="onTakeLead(lead._id)">+</button>
    </article>
</template>

<script>
export default {
    name: '',
    props: {
        lead: Object,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>

<style>

</style>