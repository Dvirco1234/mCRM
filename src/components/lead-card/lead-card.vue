<template>
    <section v-if="lead" class="lead-card">
        <header class="header flex align-center space-between">
            <div class="name flex align-center">
                <svgIcon iconType="arrowRight" class="svg-btn cursor-pointer" className="circle hover" @click="$router.go(-1)" />
                <first-letter :word="lead.fullname" :isTwoLetters="true" />
                <h2>{{ lead.fullname }}</h2>
            </div>
            <div class="actions flex gap-20 cursor-pointer">
                <svgIcon iconType="email" className="circle hover lg-bg" title="שלח אימייל" class="email" @click="openModal('emailModal')" />
                <svgIcon iconType="phone" className="circle hover lg-bg" title="בצע שיחה" class="phone" @click="openModal('callModal')" />
                <svgIcon iconType="whatsapp" className="circle hover lg-bg" title="שלח ווצאפ" class="whatsapp" @click="openModal('whatsappModal')" />
            </div>
            <!-- <MakeCallModal :lead="lead" @openLog="openModal" @closeCall="closeModal" v-if="modals.callModal.isOpen" /> -->
        </header>
        <main class="lead-card-main grid">
            <article class="lead-details card-article">
                <section class="card-section grid" v-for="section in cardSections">
                    <div class="section-title flex align-center" @click="toggleSectionOpen(section.id)">
                        <svgIcon iconType="expandDown" :className="section.isOpen ? 'fill-secondary' : 'rotate-270 fill-secondary'" />
                        <h3>{{ section.name }}</h3>
                    </div>
                    <form v-if="section.isOpen" class="form-field flex" v-for="(field, idx) in section.fields" :key="field.key"
                        @submit.prevent="toggleInputEditable(section.id, idx, field)">
                        <div class="flex field-wrapper" :class="{ disabled: !field.isEditable, 'cursor-default': field.isImmutable }"
                            @click.stop="!field.isEditable && !field.isImmutable && toggleInputEditable(section.id, idx, field)">
                            <label :for="field.key" class="label">{{ field.txt }}</label>
                            <p v-if="field.type === 'phone' && !field.isEditable || field.type === 'email' && !field.isEditable"
                                class="phone-email input-p" @click.stop="openDialog(field)">{{ lead[field.key] }}</p>
                            <date-picker v-else-if="field.type === 'date'" :date="lead[field.key]" :isEditable="field.isEditable" :field="field"
                                @pickDate="updateLeadField" :class="{ 'cursor-default': field.isImmutable }" />
                            <!-- <p v-else-if="field.type === 'select'">{{ statusTxtMap[lead[field.key]] }}</p> -->
                            <p v-else-if="field.key === 'status' && !field.isEditable" class="input-p">{{ statusTxtMap[lead[field.key]] }}</p>
                            <selectDropdown v-else-if="field.type === 'select'" class="input" :options="statusTxtMapOptions"
                                :isEditable="field.isEditable" v-model="lead[field.key]" />
                            <input v-else :ref="field.key" :id="field.key" class="input" :readonly="!field.isEditable"
                                v-model="lead[field.key]" />
                            <button v-show="field.isEditable" class="clean-btn icon flex-center" type="submit">
                                <svgIcon iconType="done" />
                                <!-- <svgIcon :iconType="field.isEditable? 'done': 'edit'" /> -->
                            </button>
                        </div>
                    </form>
                </section>
            </article>
            <!-- <section class="actions">

                </section> -->
            <article class="manager-section flex flex-column gap-20">
                <section class="card-article actions-section">
                    <!-- <div class="btn flex align-center gap-6" v-for="action in actions" :key="action.key" @click="onPickAction(action.action)"> -->
                    <div class="btn flex align-center gap-6" v-for="action in actions" :key="action.key" @click="action.action(action.key)">
                        <svgIcon :iconType="action.icon" class="svg-btn" :isSmall="true" />
                        <span>{{ action.txt }}</span>
                    </div>
                </section>
                <!-- <logModal v-if="modals.logModal.isOpen" @closeModal="closeModal" /> -->
                <DialogModal v-if="currModal" @closeModal="closeModal" @openModal="openModal" :modal="currModal" :lead="lead" @saveLog="addLog"/>
                <section class="card-article logs-section">
                    <div v-if="!lead.logs?.length" class="no-logs"> no logs</div>
                    <div v-else class="log-card icons" v-for="log in lead.logs" :key="log.desc">
                        <header class="flex space-between align-center">
                            <h4 class="flex align-center gap-4"><svgIcon :iconType="log.type" isSmall className="circle md-bg" :class="log.type"/>לוג שיחה</h4>
                            <div class="flex gap-20">
                                <label>
                                    אמצעי קשר
                                    <p>{{ logOptions[log.type] }}</p>
                                </label>
                                <label>
                                    תוצאה
                                    <p>{{ logOptions[log.result] }}</p>
                                </label>
                                <label>
                                    סטטוס
                                    <p>{{ statusTxtMap[log.status] }}</p>
                                </label>
                            </div>
                        </header>
                        <div class="desc"><pre>{{ log.description }}</pre></div>
                        <div class="date-by flex align-center gap-2">
                            <svgIcon iconType="user" className="circle" isSmall class="user"/>
                            <span>{{ log.managerName }}</span>
                            <span class="date">{{ $filters.formatTime(log.createdAt) }}</span>
                            <span v-if="log.editedAt" class="date">עודכן: {{ $filters.formatTime(log.editedAt) }}</span>
                        </div>

                    </div>
                </section>
            </article>
        </main>
    </section>
</template>
<script>
// import SvgIcon from '../svg-icon.vue'
import { leadService } from '../../services/lead-service'
import datePicker from '../utils/date-picker/date-picker.vue'
// import firstLetter from '../utils/first-letter.vue'
// import logModal from '../log-modal/log-modal.vue'
// import MakeCallModal from '../make-call-modal/call-modal.vue'
import DialogModal from '../modals/dialog-modal/dialog-modal.vue'

export default {
    name: 'lead-card',
    props: { type: Object },
    data() {
        return {
            txt: '',
            sections: null,
            lead: null,
            actions: [
                { key: 'note', txt: 'הערה', icon: 'editNote' },
                { key: 'task', txt: 'משימה', icon: 'checkboxChecked' },
                { key: 'logModal', txt: 'לוג שיחה', icon: 'phone', action: this.openModal },
                // { key: 'log', txt: 'לוג שיחה', icon: 'phone', action: 'openLogModal' },
            ],
            modals: {
                logModal: { type: 'logModal', label: 'לוג שיחה' },
                callModal: { type: 'callModal', label: `התקשרות עם ליד` },
                whatsappModal: { type: 'whatsappModal', label: 'שליחת ווצאפ' },
                emailModal: { type: 'emailModal', label: 'שליחת אימייל' },
            },
            currModal: null,
            // modals: {
            //     log: false,
            //     call: false,
            //     whatsapp: false,
            // },
            //TODO should be in store
            logOptions: {
                phone: 'טלפון',
                whatsapp: 'ווצאפ',
                email: 'אימייל',
                followup: 'פולואפ',
            },
        }
    },
    created() {
        // this.lead = JSON.parse(JSON.stringify(this.currLead))
        this.modals.callModal.label = `התקשרות עם ${this.lead?.fullname}`
    },
    mounted() {
        this.sections = JSON.parse(JSON.stringify(this.cardSections))
        // console.log('this.sections: ', this.sections);
        // console.log('this.$route:', this.$route)
    },
    methods: {
        toggleSectionOpen(sectionId) {
            // console.log('sectionId: ', sectionId)
            this.$store.commit({ type: 'toggleCardSectionOpen', sectionId })
        },
        toggleInputEditable(sectionId, fieldIdx, field) {
            if (field.isEditable) this.saveLeadDetails(field)
            this.$store.commit({ type: 'toggleCardInputEditable', sectionId, fieldIdx })
            if (this.$refs[field.key]) {
                if (field.isEditable) this.$refs[field.key][0].focus()
                else this.$refs[field.key][0].blur()
            }

            // if (field.isEditable) {
            //     if (this.$refs[field.key]) this.$refs[field.key][0].focus()
            // } else {
            //     if (this.$refs[field.key]) this.$refs[field.key][0].blur()
            // }
        },
        saveCardSectionsPrefs() {
            // const { key } = this.tableFields[colIdx]
            const field = ''
            const prefs = JSON.parse(JSON.stringify(this.userPrefs || {}))
            let cardSections = prefs.cardSections || {}
            cardSections[field] = width
            // this.$store.commit({ type: 'saveUserPrefs', key: 'tableCustomColWidth', value: tableCustomColWidth })
        },
        openDialog(field) {
            console.log('field: ', field)
        },
        updateLeadField({ key, value }) {
            this.lead[key] = value
        },
        openModal(type = '') {
            if (!type) return
            this.currModal = this.modals[type]
            // this.modals[type] = true
        },
        closeModal() {
            this.currModal = null
        },
        saveLeadDetails(field) {
            const { key } = field
            const value = this.lead[key]
            this.$store.dispatch({ type: 'onUpdateLead', lead: this.lead, key, value })
        },
        addLog(logInfo) {
            console.log('logInfo: ', logInfo);
            this.lead.logs.unshift(logInfo)
            const value = JSON.parse(JSON.stringify(this.lead.logs))
            this.$store.dispatch({ type: 'onUpdateLead', lead: this.lead, key: 'logs', value })
        }
        // openModal(type = '') {
        //     if (!type) return
        //     this.modals[type].isOpen = true
        // },
        // closeModal(type = '') {
        //     // if(!type) 
        //     this.modals[type].isOpen = false
        //     // this.modals[type] = false
        // },
        // onPickAction(act) {
        //     if(act === 'openLogModal') this.isLogModalOpen = true
        // },
    },
    computed: {
        currLead() {
            return this.$store.getters.getCurrLead
        },
        cardSections() {
            return this.$store.getters.getLeadCardSections
        },
        userPrefs() {
            return this.$store.getters.getUserPrefs
        },
        getColor() {
            return "hsl(" + 360 * Math.random() + ',' +
                (15 + 70 * Math.random()) + '%,' +
                (75 + 10 * Math.random()) + '%)'
        },
        statusTxtMap() {
            return this.$store.getters.getStatusTxtMap
        },
        statusTxtMapOptions() {
            const statusMap = []
            for (const key in this.statusTxtMap) {
                statusMap.push({ key, label: this.statusTxtMap[key] })
            }
            return statusMap
        },
        // getColor() {
        //     return "hsl(" + 360 * Math.random() + ',' +
        //         (25 + 70 * Math.random()) + '%,' +
        //         (85 + 10 * Math.random()) + '%)'
        // }
    },
    unmounted() { },
    components: {
        datePicker,
        // logModal,
        DialogModal
    },
    watch: {
        '$route.params.id': {
            async handler() {
                const { id } = this.$route.params
                if (!id) return
                const lead = await leadService.getLeadById(id)
                console.log('lead: ', lead)
                this.lead = JSON.parse(JSON.stringify(lead))
                // this.lead = lead
            },
            immediate: true,
        },
    },

}
</script>