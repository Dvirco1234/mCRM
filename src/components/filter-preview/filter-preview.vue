<template>
    <li>
        <details :ref="option.key" @click="isOpenField(view.key)" :class="{ open: isOpen }" v-if="view.options?.length">
            <summary class="w100">
                <SvgIcon iconType="expandDown" class="icon" /><span class="view-content w100">{{ view.txt }}</span>
            </summary>
            <ul class="sub-list">
                <li class="view-content" v-for="subOption in option.options" :key="subOption.key">
                    <span class="sub-view">{{ subOption.txt }}</span>
                </li>
            </ul>
        </details>
        <span v-else class="view-content">{{ option.txt }}</span>
    </li>
</template>
<script>
// import filterList from '../filter-list/filter-list.vue'

export default {
    name: '',
    props: { view: Object },
    data() {
        return {
            isOpen: false
        }
    },
    created() { },
    methods: {
        isOpenField(key) {
            this.isOpen = !this.$refs[key][0].open
        }
    },
    computed: {},
    unmounted() { },
    components: {
        // filterList
    }
}
</script>