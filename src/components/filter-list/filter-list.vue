<template>
    <ul class="filter-list">
        <li class="clean-list view" v-for="view in list" :key="view.key">
            <details :ref="view.key" @click="toggleFilterViewOpen(view.key)" :class="{ open: openFieldsMap[view.key] }"
                v-if="view.options?.length">
                <summary class="w100">
                    <SvgIcon iconType="expandDownThin" class="icon" :style="indentIcon" /><span class="view-content w100"
                        :style="[indent, color]">{{ view.txt }}</span>
                </summary>
            </details>
            <span v-else class="view-content" :style="[indent, color]" @click="setFilterView(view)" >{{ view.txt }}</span>
            <filter-list v-if="view.options?.length && openFieldsMap[view.key]" :list="view.options" :depth="depth + 1" @setFilterView="setFilterView" @toggleFilterViewOpen="toggleFilterViewOpen"/>
        </li>
    </ul>
</template>
<script>

import SvgIcon from '../svg-icon.vue'
import filterPreview from '../filter-preview/filter-preview.vue'

export default {
    name: 'filterList',
    props: {
        list: Array,
        depth: {
            type: Number,
            default: 1
        },
        // openFieldsMap: Object,
    },
    data() {
        return {
            isOpen: false,
            currView: null,
            openFieldsMap: {},
        }
    },
    created() {
        // console.log('this.list:', this.list)
    },
    methods: {
        isOpenField(key) {
            this.isOpen = !this.$refs[key][0].open
        },
        // toggleFilterViewOpen(key) {
        //     this.$emit('toggleFilterViewOpen', key)
        // },
        toggleFilterViewOpen(key) {
            this.openFieldsMap[key] = this.openFieldsMap[key] ? false : true
        },
        setFilterView(view) {
            this.$emit('setFilterView', view)
        },
        // toggleFilterViewOpen(sectionId) {
        //     console.log('sectionId: ', sectionId)
        //     this.$store.commit({ type: 'toggleFilterViewOpen', sectionId })
        // },
    },
    computed: {
        indent() {
            return { 'padding-inline-start': `${this.depth * 24 + 20}px` }
        },
        indentIcon() {
            return { 'right': `${this.depth * 24 - 17}px` }
        },
        color() {
            const color = 255 - (this.depth - 1) * 25
            return { 'box-shadow': `inset ${-8 * (this.depth - 1)}px 0px 0 rgb(${color}, ${color}, ${color}), inset 0 -1px 0 #e6e6e6` }
            // const color = 255 - (this.depth - 1) * 7
            // return { 'background-color': `rgb(${color}, ${color}, ${color})` }            
        },
    },
    unmounted() { },
    components: {
        SvgIcon,
        filterPreview,
    }
}
</script>