<template>
    <section class="lead-filter">
        <!-- <h5>Search ??</h5> -->
        <filter-list :list="filterViews" @setFilterView="setFilterView" @toggleFilterViewOpen="toggleFilterViewOpen"/>
    </section>
</template>

<script>
import filterList from '../filter-list/filter-list.vue'

export default {
    name: '',
    props: { type: Object },
    data() {
        return {
            // openFieldsMap: {},
        }
    },
    created() { 
        this.getCurrFilterViews()
    },
    methods: {
        getCurrFilterViews() {
            const view = this.$route.matched[0].name
            // console.log('this.$route: ', this.$route);
            // console.log('view: ', view);
            this.$store.commit({type: 'getCurrFilterViews', view})
        },
        setFilterView(view) {
            console.log('view: ', view);
        },
        toggleFilterViewOpen(key) {
            this.openFieldsMap[key] = this.openFieldsMap[key] ? false : true
        },
    },
    computed: {
        filterViews() {
            return JSON.parse(JSON.stringify(this.$store.getters.getCurrFilterViews))
            // return this.$store.getters.getCurrFilterViews
        }
    },
    unmounted() { },
    components: {
        filterList
    }
}
</script>