<template>
    <subHeader />
    <section class="lead-app flex ">
        <leadFilter class="menu" :class="{ hide: !isMenuOpen }" />
        <main class="lead-main flex flex-column">
            <!-- <leadList :leads="newLeads" />
            <div class="seperator"></div>
            <funnel-board :scene="getScene" /> -->
            <router-view></router-view>
        </main>
    </section>
</template>

<script>
import leadFilter from '../../components/lead-filter/lead-filter.vue'
import funnelBoard from '../../components/funnel-board/funnel-board.vue'
import leadList from '../../components/lead-list/lead-list2.vue'
import subHeader from '../../components/sub-header/sub-header.vue'

export default {
    name: 'LeadApp',
    props: { type: Object },
    data() {
        return {}
    },
    created() { 
        this.$store.commit({ type: 'getTableFields' })
        this.$store.commit({ type: 'getBoardFields' })
        this.$store.commit({ type: 'getLeadCardSections' })
    },
    methods: {},
    computed: {
        getScene() {
            return this.$store.getters.getContacts
        },
        leads() {
            return this.$store.getters.getLeads
        },
        newLeads() {
            return this.$store.getters.getNewLeads
        },
        isMenuOpen() {
            return this.$store.getters.isMenuOpen
        },
    },
    components: {
        leadFilter,
        funnelBoard,
        leadList,
        subHeader
    },
    watch: {
        '$route.path': {
            handler() {
                const view = this.$route.name
                this.$store.commit({ type: 'setCurrViewName', view })
            },
            immediate: true,
        }
    }
}
</script>