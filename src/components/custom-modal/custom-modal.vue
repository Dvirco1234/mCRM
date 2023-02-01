<template>
    <section class="modal">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
            <slot name="list"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>
<script>
export default {
    name: 'custom-modal',
    props: { type: Object },
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
    components: {}
}
</script>