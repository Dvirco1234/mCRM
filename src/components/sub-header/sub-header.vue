<template>
    <section class="sub-header flex space-between align-center position-relative">
        <section class="views flex align-center">
            <div class="icon-ctr">
                <svgIcon iconType="menuToggle" :isLarge="true" :className="isMenuOpen ? 'scale' : ''"
                    @click="$store.commit({ type: 'toggleMenu' })" />
            </div>
            <div class="curr-view-info flex flex-column">
                <h3>{{ currView }} <span>({{ leads.length }})</span></h3>
                <nav class="view-options flex">
                    <router-link class="option-link" v-for="link in viewOpts" :to="link.path">{{ link.txt }}</router-link>
                </nav>
            </div>
        </section>
        <section class="filter-sort flex row-reverse">
            <!-- <h3>New</h3>
            <h3>Filter</h3>
            <h3>Columns</h3>
            <h3>Sort</h3> -->
            <div class="btn">
                <span>חדש</span>
            </div>
            <div class="btn flex">
                <svgIcon iconType="filter" class="svg-btn" />
                <span>פילטר</span>
            </div>
            <div class="btn flex gap-4" @click="toggleModal('columns')">
                <svgIcon iconType="columns" class="svg-btn" />
                <span>עמודות</span>
            </div>
            <div class="btn flex">
                <svgIcon iconType="sort" class="svg-btn" />
                <span>סינון</span>
            </div>
        </section>
        <table-fields-modal :tableFields="tableFields" @toggleTableFields="toggleTableFields" v-if="modalTypes.columns"
            v-click-outside:columns="toggleModal" @updateTableFields="updateTableFields"/>
        <!-- <section class="modal position-absolute" v-if="modalTypes.columns">
            <ul class="clean-list">
                <li class="field flex align-center" v-for="field in activeTableFields" :key="field.key" @click="toggleTableFields(field)">
                    <svgIcon iconType="drag20" isSmall="true" />
                    <toggleBtn :checked="field.isActive" />
                    <span class="field-txt">{{ field.txt }}</span>
                </li>
                <li class="field flex align-center" v-for="field in inactiveTableFields" :key="field.key"
                    @click="field.isActive = !field.isActive">
                    <svgIcon iconType="drag20" isSmall="true" />
                    <toggleBtn :checked="field.isActive" />
                    <span class="field-txt">{{ field.txt }}</span>
                </li>
            </ul>
        </section> -->
    </section>
</template>
<script>
import svgIcon from '../svg-icon.vue'
import toggleBtn from '../toggle-btn.vue'
import tableFieldsModal from '../table-fields-modal/table-fields-modal.vue'

export default {
    name: 'sub-header',
    props: { type: Object },
    data() {
        return {
            // leads: [1, 2, 3, 4, 5, 6, 7],
            currView: 'לידים חדשים',
            viewOpts: [
                { path: '/lead/list', txt: 'רשימה' },
                { path: '/lead/board', txt: 'לוח' },
            ],
            modalTypes: {
                filter: false,
                columns: false,
                sort: false,
            },
            tableFields: null,

        }
    },
    created() { },
    methods: {
        toggleModal(type) {
            this.modalTypes[type] = !this.modalTypes[type]
            if (this.modalTypes[type]) {
                this.tableFields = JSON.parse(JSON.stringify(this.$store.getters.getTableFields))
            }
        },
        toggleTableFields(idx, field) {
            // this.tableFields[idx].isActive = !this.tableFields[idx].isActive
            field.isActive = !field.isActive
            this.updateTableFields()
        },
        updateTableFields(fields = this.tableFields) {
            this.tableFields = fields
            this.$store.commit({ type: 'setTableFields', fields: JSON.parse(JSON.stringify(fields)) })
        },
    },
    computed: {
        leads() {
            return this.$store.getters.getNewLeads
        },
        isMenuOpen() {
            return this.$store.getters.isMenuOpen
        },
        // activeTableFields() {
        //     return this.tableFields.filter(field => field.isActive)
        // },
        // inactiveTableFields() {
        //     return this.tableFields.filter(field => !field.isActive)
        // },
    },
    unmounted() { },
    components: {
        svgIcon,
        toggleBtn,
        tableFieldsModal,
    }
}
</script>
