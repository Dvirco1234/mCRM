<template>
    <ul class="filter-list">
        <li class="clean-list view" v-for="view in list" :key="view.key">
            <details :ref="view.key" @click="isOpenField(view.key)" :class="{ open: isOpen }" v-if="view.options?.length">
                <summary class="w100">
                    <SvgIcon iconType="expandDown" class="icon" /><span class="view-content w100">{{ view.txt }}</span>
                </summary>
                <ul class="sub-list">
                    <li class="view-content" v-for="option in view.options" :key="option.key">
                        <!-- <details :ref="option.key" @click="isOpenField(option.key)" :class="{ open: isOpen }" v-if="view.options?.length">
                            <summary class="w100">
                                <SvgIcon iconType="expandDown" class="icon" /><span class="view-content w100">{{ option.txt }}</span>
                            </summary>
                            <ul class="sub-list">
                                <li class="view-content" v-for="subOption in option.options" :key="subOption.key">
                                    <span class="sub-view">{{ subOption.txt }}</span>
                                </li>
                            </ul>
                        </details> -->
                        <span class="view-content">{{ option.txt }}</span>
                        <!-- <span class="sub-view">{{ option.txt }}</span> -->
                    </li>
                </ul>
            </details>
            <span v-else class="view-content">{{ view.txt }}</span>
            <!-- <ul v-if="view.options?.length">
                <li class="view" v-for="option in view.options" :key="option.key">
                    {{ option.txt }}
                </li>
            </ul> -->



            <!-- {{ view.txt }} -->

            <!-- <ul v-if="view.options?.length">
                    <li class="sub-view" v-for="option in view.options" :key="option.key">
                        {{ option.txt }}
                    </li>
                </ul> -->
            <!-- <filter-list v-if="view.options?.length" :list="view.options"/> -->
            <!-- <slot name="nested-list"></slot> -->
        </li>
    </ul>
</template>
<script>
// import filterList from "./filter-list.vue";

import SvgIcon from '../svg-icon.vue'

export default {
    name: 'filter-list',
    props: { list: Array },
    data() {
        return {
            isOpen: false
        }
    },
    created() { },
    methods: {
        isOpenField(key) {
            this.isOpen = !this.$refs[key][0].open
            // console.log('this.$refs[key].open: ', this.$refs[key][0].open);
            // console.log('this.$refs[key]: ', this.$refs[key]);
        }
    },
    computed: {},
    unmounted() { },
    components: {
        SvgIcon
    }
}
</script>