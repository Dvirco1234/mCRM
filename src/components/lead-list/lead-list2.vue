<template>
    <section class="lead-list">

        <!-- <header class="column-header">לידים חדשים</header> -->
        <!-- <ul v-if="leads" class="lead-list">
            <li v-for="lead in leads" :key="lead._id">
                <lead-preview :lead="lead" />
            </li>
        </ul> -->
        <section ref="tableRef" class="table">
            <header class="table-header">
                <article class="table-row">
                    <div class="table-cell" v-for="leadKey in leadKeys" :key="leadKey.key">{{ leadKey.txt }}</div>
                </article>
            </header>
            <main class="table-body">
                <article class="table-row" v-for="lead in leads" :key="lead._id">
                    <div class="table-cell flex align-center" v-for="leadKey in leadKeys" :key="leadKey.txt">{{
                        leadKey.key === 'createdAt' ?
                            $filters.formatTime(lead[leadKey.key]) : lead[leadKey.key]
                    }}</div>
                </article>
            </main>
        </section>
    </section>
</template>

<script>
import leadPreview from '../lead-preview/lead-preview.vue'
import ResizeObserver from 'vue-resize-observer'

export default {
    name: '',
    props: {
        leads: Array,
    },
    data() {
        return {
            // leadsKeys: ['status', 'name', 'phone', 'source', 'createdAt',]
            leadKeys: [
                { key: 'status', txt: 'סטטוס' },
                { key: 'name', txt: 'שם' },
                { key: 'phone', txt: 'טלפון' },
                { key: 'channel', txt: 'צ\'אנל' },
                { key: 'createdAt', txt: 'תאריך כניסה' },
                { key: 'message', txt: 'הודעה' },
            ]
        }
    },
    created() {
        // this.leads = this.$store.getters.getLeads
        console.log('new leads', this.leads)
    },
    mounted() {

    },
    methods: {
        onTakeLead(leadId) {
            console.log('taking lead...', leadId)
        },
    },
    computed: {
        leads() {
            return this.$store.getters.getLeads
        }
    },
    components: {
        leadPreview
    },
}
</script>

<style>

</style>