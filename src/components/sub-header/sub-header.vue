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
                    <router-link class="option-link" v-for="link in viewOpts" :to="link.path"
                        :class="{ 'router-link-active': $route.name === link.name }">{{ link.txt }}</router-link>
                </nav>
            </div>
        </section>
        <section class="filter-sort flex align-center row-reverse">
            <div class="btn">
                <span>חדש</span>
            </div>
            <div class="btn flex">
                <svgIcon iconType="filter" class="svg-btn" />
                <span>פילטר</span>
            </div>
            <div class="btn flex gap-4" @click="toggleModal('columns')">
                <svgIcon :iconType="$route.name === 'board' ? 'columns2' : 'columns'" class="svg-btn" />
                <span>עמודות</span>
            </div>
            <div class="btn flex">
                <svgIcon iconType="sort" class="svg-btn" />
                <span>מיון</span>
            </div>
            <div class="search position-relative" :class="{ close: !isSearchOpen }" v-click-outside="closeSearchInput">
                <svgIcon :iconType="filterByTxt ? 'x' : 'search'" :isSmall="true" className="circle" class="icon position-absolute"
                    @click="toggleSearchInput" />
                <input ref="searchInput" type="search" class="clean-input" :class="{ close: !isSearchOpen }" :readonly="!isSearchOpen"
                    v-model="filterByTxt" :placeholder="isSearchOpen ? 'חיפוש לידים' : ''" @input="searchLeads">
            </div>
        </section>
        <table-fields-modal :tableFields="currViewFields" @toggleCurrViewFields="toggleCurrViewFields" v-if="modalTypes.columns"
            v-click-outside:columns="toggleModal" @updateCurrViewFields="updateCurrViewFields" />
        <!-- <table-fields-modal :tableFields="currViewFields" @toggleTableFields="toggleTableFields" v-if="modalTypes.columns"
                        v-click-outside:columns="toggleModal" @updateTableFields="updateTableFields"/> -->
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
import { utilService } from '../../services/util-service'
// import svgIcon from '../svg-icon.vue'
import toggleBtn from '../toggle-btn.vue'
import tableFieldsModal from '../table-fields-modal/table-fields-modal.vue'

export default {
    name: 'sub-header',
    props: { type: Object },
    data() {
        return {
            // currView: 'לידים חדשים',
            viewOpts: [
                { path: '/lead/list', txt: 'רשימה', name: 'list' },
                { path: '/lead/board', txt: 'לוח', name: 'board' },
                { path: '/lead/card', txt: 'כרטיס', name: 'card' },
                // { path: '/lead/card/aaa', txt: 'כרטיס' },
            ],
            modalTypes: {
                filter: false,
                columns: false,
                sort: false,
            },
            isSearchOpen: false,
            filterByTxt: '',
            // currViewFields: null,

        }
    },
    created() { 
        this.searchLeads = utilService.debounce(this.searchLeads, 400)
    },
    methods: {
        toggleModal(type) {
            this.modalTypes[type] = !this.modalTypes[type]
            // if (this.modalTypes[type]) {
            //     this.currViewFields = JSON.parse(JSON.stringify(this.$store.getters.getCurrViewFields))
            // }
        },
        toggleTableFields(idx, field) {
            // this.tableFields[idx].isActive = !this.tableFields[idx].isActive
            field.isActive = !field.isActive
            this.updateCurrViewFields()
        },
        updateCurrViewFields(fields = this.currViewFields) {
            this.currViewFields = fields
            // this.$store.commit({ type: 'setTableFields', fields: JSON.parse(JSON.stringify(fields)) })
            this.$store.commit({ type: 'setCurrViewFields', fields: JSON.parse(JSON.stringify(fields)) })
        },
        toggleCurrViewFields(fieldId) {
            this.$store.commit({ type: 'toggleCurrViewFields', fieldId })
        },
        searchLeads() {
            this.$store.dispatch({ type: 'setFilter', filterBy: { txt: this.filterByTxt } })
        },
        toggleSearchInput() {
            this.$refs.searchInput.focus()
            if (this.filterByTxt) return this.filterByTxt = ''
            // if (this.filterByTxt) {
            //     this.filterByTxt = ''
            //     return
            // } 
            this.isSearchOpen = !this.isSearchOpen
        },
        closeSearchInput() {
            if (this.filterByTxt || !this.isSearchOpen) return
            this.isSearchOpen = false
            this.filterByTxt = ''
            this.searchLeads()
        },
    },
    computed: {
        leads() {
            return this.$store.getters.getLeads
        },
        isMenuOpen() {
            return this.$store.getters.isMenuOpen
        },
        currLead() {
            return this.$store.getters.getCurrLead
        },
        currView() {
            const filter = this.$store.getters.getCurrFilterBy
            const statusTxtMap = this.$store.getters.getStatusTxtMap
            if (!filter) return 'כל הלידים'
            let str = ''
            Object.entries(filter).map(([key, value], idx, arr) => {
                // console.log(`key, value: ${key}: ${value}`)
                // if(!value) return 'לידים'
                if (idx && value) str += `, `
                if (key === 'status') {
                    let val = statusTxtMap[value]
                    if (value === 'close' || value === 'new') val += 'ים'
                    else if (value === 'done') val = 'רשומים'
                    str += `לידים ${val}`
                }
                else if (key === 'manager') str += `לידים של ${value}`
                else if (key === 'nextContactDate') str += `פולואפ`
                else if (key === 'nextContactTime') str += ''
                // else if (key === 'nextContactTime') {
                //     if (value === 'evening') str += 'ערב'
                //     else if (value === 'morning') str += 'בוקר'
                //     else if (value === 'noon') str += 'צהריים'
                //     else str += 'היום'
                // }
                else if (key === 'txt') str += value || arr.length > 1? '' : 'כל הלידים'
                else str += value

            })
            // for (const [key, value] of Object.entries(filter)) {
            //     if(!value) return 'לידים'
            //     if (key === 'status') {
            //         let val = statusTxtMap[value]
            //         if (value === 'close' || value === 'new') val += 'ים'
            //         else if (value === 'done') val = 'רשומים'
            //         str += `לידים ${val}`
            //     }
            //     else if (key === 'manager') str += `לידים של ${value}`
            //     else if (key === 'nextContactTime' || key === 'nextContactDate' ) str += `פולואפ`
            //     else if (key === 'txt') continue
            //     else str += value

            //     if(idx !== arr.length - 1) str += `, `
            // }
            return str || 'לידים'
        },
        currViewFields() {
            return this.$store.getters.getCurrViewFields
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
        // svgIcon,
        toggleBtn,
        tableFieldsModal,
    }
}
</script>
