<template>
    <app-header />
    <router-view />
</template>

<script>
import appHeader from './components/app-header/app-header.vue'

export default {
    name: 'app',
    components: {
        appHeader
    },
    created() {
        this.$store.dispatch({ type: 'loadContacts' })
        this.$store.dispatch({ type: 'loadNewLeads' })
        this.$store.dispatch({ type: 'loadLeads' })
        this.$store.dispatch({ type: 'getDatalists' })
        this.$store.commit({ type: 'setUserPrefs' })
    },
}
</script>