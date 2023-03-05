<template>
    <section class="app-header main-layout full">
        <header class="flex align-center">
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
        </header>
    </section>
</template>

<script>
export default {
    name: '',
    props: { type: Object },
    data() {
        return {
            routes: [
                { path: '/', txt: 'בית' },
                { path: '/lead', txt: 'לידים' },
                { path: '/scrum', txt: 'SCRUM' },
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