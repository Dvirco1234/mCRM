<template>
    <ul class="filter-list" >
        <li class="clean-list view" v-for="view in list" :key="view.key" :class="{active: view.isActive}">
            <details :ref="view.key" @click="toggleFilterViewOpen(view.key)" :class="{ open: openFieldsMap[view.key] }"
                v-if="view.options?.length">
                <summary class="w100">
                    <SvgIcon iconType="expandDownThin" class="icon" :style="indentIcon" />
                    <span class="view-content w100" :style="[indent, color]">{{ view.txt }}</span>
                </summary>
            </details>
            <Datepicker v-else-if="view.type === 'date'" :value="filterByDate" @update:model-value="pickDate($event)" :start-date="startDate" week-start="0" show-now-button
                input-class-name="date-picker" format="dd/MM/yyyy" teleport=".sub-header" auto-apply> 
                <template #trigger>
                    <span class="view-content" :style="[indent, color]">{{ filterByDate ? $filters.formatTime(filterByDate).split(' ')[0] : view.txt }}</span>
                </template>
            </Datepicker>
            <span v-else class="view-content" :style="[indent, color]" @click="setFilterView(view)">{{ view.txt }}</span>
            <filter-list v-if="view.options?.length && openFieldsMap[view.key]" :list="view.options" :depth="depth + 1"
                @setFilterView="setFilterView" @pickDate="pickDate" :filterByDate="filterByDate"/>
        </li>
    </ul>
</template>
<script>

import SvgIcon from '../svg-icon.vue'
import filterPreview from '../filter-preview/filter-preview.vue'
import datePicker from '../utils/date-picker/date-picker.vue'

export default {
    name: 'filterList',
    props: {
        list: Array,
        depth: {
            type: Number,
            default: 1
        },
        filterByDate: String | Date,
        // openFieldsMap: Object,
    },
    data() {
        return {
            isOpen: false,
            currView: null,
            // openFieldsMap: {},
            // filterByDate: '',
        }
    },
    created() {
        // console.log('this.list:', this.list)
    },
    methods: {
        isOpenField(key) {
            this.isOpen = !this.$refs[key][0].open
        },
        pickDate(date) {
            this.$emit('pickDate', date)
        },
        // toggleFilterViewOpen(key) {
        //     this.$emit('toggleFilterViewOpen', key)
        // },
        // toggleFilterViewOpen(key) {
        //     this.openFieldsMap[key] = this.openFieldsMap[key] ? false : true
        // },
        setFilterView(view) {
            this.$emit('setFilterView', view)
            // this.filterByDate = ''
        },
        toggleFilterViewOpen(key) {
            this.$store.commit({ type: 'toggleFilterViewOpen', key })
        },
    },
    computed: {
        openFieldsMap() {
            return this.$store.getters.getFilterOpenFieldsMap
        },
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
        startDate() {
            console.log('this.filterByDate: ', this.filterByDate);
            return this.filterByDate || new Date()
        },
    },
    unmounted() { },
    components: {
        SvgIcon,
        filterPreview,
        datePicker,
    }
}
</script>