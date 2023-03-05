<template>
    <section class="lead-filter">
        <!-- <h5>Search</h5> -->
        <div class="search">
            <svgIcon :iconType="searchFilterTxt? 'x' : 'search'" :isSmall="true" class="icon" @click="searchFilterTxt = ''"/>
            <input type="search" class="clean-input" v-model="searchFilterTxt" placeholder="חיפוש תצוגה" @input="searchFilterViews"> 
            <!-- <SvgIcon iconType="x" :isSmall="true" class="icon icon-x"/> -->
        </div>
        <filter-list :list="filterViews" @setFilterView="setFilterView" @pickDate="pickDate" :filterByDate="filterByDate"/>
    </section>
</template>

<script>
// import svgIcon from '../svg-icon.vue'
import filterList from '../filter-list/filter-list.vue'

export default {
    name: 'lead-filter',
    props: { type: Object },
    data() {
        return {
            filterBy: null,
            searchFilterTxt: '',
            filterByDate: '',
        }
    },
    created() { 
        this.getCurrFilterViews()
        this.resetFilterBy()
    },
    methods: {
        getCurrFilterViews() {
            const view = this.$route.matched[0].name
            this.$store.commit({type: 'getCurrFilterViews', view})
        },
        setFilterView(view) {
            let filterBy = {}
            filterBy[view.filterKey] = view.key
            if (view.filterKey === 'nextContactTime') filterBy.nextContactDate = view.date
            if (view.filterKey !== 'nextContactDate') this.filterByDate = ''
            // this.$store.dispatch({ type: 'setFilter', key: view.filterKey, value: view.key, isSingleFilter: !view.isMultiSelect})
            this.$store.dispatch({ type: 'setFilter', filterBy, isSingleFilter: !view.isMultiSelect})
        },
        pickDate(date) {
            // console.log('date: ', date);
            this.filterByDate = date
            this.setFilterView({filterKey: 'nextContactDate', key: date})
        },
        resetFilterBy() {
            this.filterBy = {
                status: '',
                manager: '',
                nextContactTime: '',
            }
        },
        searchFilterViews() {

        },
    },
    computed: {
        filterViews() {
            let views = JSON.parse(JSON.stringify(this.$store.getters.getCurrFilterViews))
            if(!this.searchFilterTxt) return views
            const regex = new RegExp(this.searchFilterTxt, 'i')
            views = views.map(view => view.options ? [view, ...view.options] : view).flat(Infinity);
            views = views.filter(view => regex.test(view.txt) || regex.test(view.key))
            return views
        }
    },
    unmounted() { },
    components: {
        filterList,
        // svgIcon
    }
}
</script>