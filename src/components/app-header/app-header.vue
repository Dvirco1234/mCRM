<template>
    <section class="app-header main-layout full">
        <header class="flex align-center space-between">
            <nav class="flex align-center">
                <div class="logo flex align-center">
                    <img class="logo-img"
                        src="https://res.cloudinary.com/dvirco123/image/upload/v1673431899/MisterBit%20CRM/logo-misterbit_xfwtq8.png"
                        alt="MisterBit CRM" @click="$router.push('/')">
                    <!-- <h2 class="fs28">CRM</h2> -->
                </div>

                <ul class="nav-links flex space-between clean-list ">
                    <li v-for="route in routes" :key="route.txt">
                        <router-link class="nav-link" :to="route.path">{{ route.txt }}</router-link>
                    </li>
                </ul>
            </nav>
            <section class="user-actions flex align-center gap-10">
                <svgIcon iconType="notifications" className="circle hover lg-bg fill" />
                <svgIcon iconType="schedule" className="circle hover lg-bg fill" />
                <svgIcon iconType="user" className="circle lg-icon lg-bg fill" />
            </section>
        </header>
    </section>
</template>

<script>
export default {
    name: 'AppHeader',
    props: { type: Object },
    data() {
        return {
            routes: [
                { path: '/', txt: 'בית' },
                { path: '/lead', txt: 'לידים' },
                { path: '/scrum', txt: 'SCRUM' },
                { path: '/weekly', txt: 'לו"ז שבועי' },
                { path: '/schedule', txt: 'יומן פגישות' },
            ]
        }
    },
    created() { },
    methods: {},
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
    unmounted() { },
    components: {}
}
</script>