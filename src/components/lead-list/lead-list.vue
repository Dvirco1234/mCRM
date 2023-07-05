<template>
    <section ref="tableContainer" class="lead-list table-container">
        <table ref="table" class="table">
            <thead v-resize="saveCustomTableSize" class="table-header">
                <tr class="table-row head-cell cursor-pointer">
                    <th ref="ths" class="table-cell head-cell" v-for="field in tableFields" :key="field.key">
                        {{ field.txt }}
                    </th>
                    <!-- <th class="table-cell head-cell" v-for="leadKey in leadKeys" :key="leadKey.key"
                            :style="{ width: userPrefs?.tableCustomColWidth[leadKey.key] || '' + 'px' }">
                            {{ leadKey.txt }}
                        </th> -->
                </tr>
            </thead>
            <tbody class="table-body">
                <tr class="table-row" v-for="lead in leads" :key="lead._id" @click="openLeadCard(lead)">
                    <td class="table-cell " v-for="field in tableFields" :key="field.txt">
                        <!-- <span v-if="field.key === 'createdAt'">{{ $filters.formatTime(lead[field.key]) }}</span> -->
                        <span v-if="field.isDate">{{ $filters.formatTime(lead[field.key], (field.key === 'nextContactDate')) }}</span>
                        <!-- <span v-else-if="field.key === 'status'">{{ statusTxtMap[lead[field.key]] }}</span> -->
                        <span v-else>{{ lead[field.key] }}</span>
                    </td>
                    <!-- <td class="table-cell " v-for="field in tableFields" :key="field.txt">{{
                            field.key === 'createdAt' ?
                                $filters.formatTime(lead[field.key]) : lead[field.key]
                        }}</td> -->
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import leadPreview from '../lead-preview/lead-preview.vue'
import { userService } from '../../services/user.service.js'

export default {
    name: 'lead-list',
    // props: {
    //     leads: Array,
    // },
    data() {
        return {
            // leadsKeys: ['status', 'name', 'phone', 'source', 'createdAt',]
            // tableFields: [
            //     { key: 'status', txt: 'סטטוס' },
            //     { key: 'name', txt: 'שם' },
            //     { key: 'phone', txt: 'טלפון' },
            //     { key: 'channel', txt: 'צ\'אנל' },
            //     { key: 'createdAt', txt: 'תאריך כניסה' },
            //     { key: 'message', txt: 'הודעה' },
            // ]
            // arg: null,
        }
    },
    created() {
        // this.leads = this.$store.getters.getLeads
        // console.log('new leads', this.leads)
        // this.userPrefs = userService.getUserPrefs()
        // this.tableCustomColWidth = this.userPrefs.getTableCustomColWidth
    },
    mounted() {
        this.setUserPrefsTableColsWidth()
        // this.arg = this.$refs.tableContainer
        // console.log('this.$route.name:', this.$route.name)
    },
    methods: {
        openLeadCard(lead) {
            this.$store.commit({ type: 'setCurrLead', lead })
            this.$router.push(`/lead/card/${lead._id}`)
        },
        onTakeLead(leadId) {
            console.log('taking lead...', leadId)
        },
        onResize(event) {
            console.log('event: ', event)
            // Get the index of the resized column
            // let index = event.target.cellIndex
            // Get all the cells in the table-body
            // let tableBodyCells = document.querySelectorAll('.table-body .table-cell')
            // Set the width of the corresponding cells in the table-body
            // for (let i = 0; i < tableBodyCells.length; i++) {
            //     tableBodyCells[i].style.width = event.target.offsetWidth + 'px'
            // }
        },
        saveCustomTableSize(colIdx, width) {
            const { key } = this.tableFields[colIdx]
            const prefs = JSON.parse(JSON.stringify(this.userPrefs || {}))
            let tableCustomColWidth = prefs.tableCustomColWidth || {}
            tableCustomColWidth[key] = width
            this.$store.commit({ type: 'saveUserPrefs', key: 'tableCustomColWidth', value: tableCustomColWidth })
        },
        // saveCustomTableSize(colIdx, width) {
        //     const { key } = this.tableFields[colIdx]
        //     if(!this.userPrefs?.tableCustomColWidth) this.userPrefs.tableCustomColWidth = {}
        //     this.userPrefs.tableCustomColWidth[key] = width
        //     userService.saveUserPrefs(this.userPrefs)
        // },
        setUserPrefsTableColsWidth() {
            if (!this.userPrefs?.tableCustomColWidth) return
            this.$refs.ths.forEach((th, idx) => {
                const width = this.userPrefs.tableCustomColWidth[this.tableFields[idx].key]
                if (width) {
                    const diff = width - th.offsetWidth
                    th.style.width = width + 'px'
                    this.$refs.table.style.width = this.$refs.table.offsetWidth + diff + 'px'
                }
            })
        },
    },
    computed: {
        leads() {
            return this.$store.getters.getLeads
        },
        tableFields() {
            return this.$store.getters.getActiveTableFields
        },
        userPrefs() {
            return this.$store.getters.getUserPrefs
        },
        statusTxtMap() {
            return this.$store.getters.getStatusTxtMap
        }
    },
    components: {
        leadPreview
    },
}
</script>

<style >
.vue-columns-resizable {
    overflow: hidden;
    pointer-events: none;
    /* top: 0; */
    /* background: rgba(196, 27, 27, 0.271); */
    /* z-index: 1; */
}

.columns-resize-bar {
    pointer-events: auto;
    /* background-color: #cacaca; */
}

.columns-resize-bar:hover {
    background: #9f9f9f !important;
}
</style>