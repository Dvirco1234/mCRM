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
    },
    methods: {},
    computed: {
        getScene() {
            return this.$store.getters.getContacts
        },
        newLeads() {
            return this.$store.getters.getNewLeads
        },
        isMenuOpen() {
            return this.$store.getters.isMenuOpen
        },
    },
    unmounted() { },
    components: {
        leadFilter,
        funnelBoard,
        leadList,
        subHeader
    }
}
</script>