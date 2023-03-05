<template>
    <section v-if="lead" class="lead-card">
        <header class="header flex align-center space-between">
            <div class="name flex align-center">
                <svgIcon iconType="arrowRight" class="svg-btn cursor-pointer" className="circle hover" @click="$router.go(-1)" />
                <first-letter :word="lead.fullname" :isTwoLetters="true" />
                <h2>{{ lead.fullname }}</h2>
            </div>
            <div class="actions flex gap-20 cursor-pointer">
                <svgIcon iconType="mail" className="circle hover lg-bg" title="שלח אימייל" class="mail" />
                <svgIcon iconType="phone" className="circle hover lg-bg" title="בצע שיחה" class="phone" />
                <svgIcon iconType="whatsapp2" className="circle hover lg-bg" title="שלח ווצאפ" class="whatsapp" />
            </div>
        </header>
        <main class="lead-card-main grid">
            <article class="lead-details card-article">
                <section class="card-section grid" v-for="section in cardSections">
                    <div class="section-title flex align-center" @click="toggleSectionOpen(section.id)">
                        <svgIcon iconType="expandDown" :className="section.isOpen ? 'fill-secondary' : 'rotate-270 fill-secondary'" />
                        <h3>{{ section.name }}</h3>
                    </div>
                    <form v-if="section.isOpen" class="form-field flex" v-for="field, idx in section.fields" :key="field.key"
                        @submit.prevent="toggleInputEditable(section.id, idx, field)">
                        <label class="flex input-label" :class="{ disabled: !field.isEditable, 'cursor-default': field.isImmutable }"
                            @click="!field.isEditable && !field.isImmutable && toggleInputEditable(section.id, idx, field)">
                            <span class="label">{{ field.txt }}</span>

                            <!-- <Datepicker v-if="field.isEditable && field.type === 'date'" v-model="lead[field.key]" week-start="0" show-now-button input-class-name="input dp-custom-input" /> -->
                            <!-- <Datepicker v-if="field.isEditable && field.type === 'date'" v-model="lead[field.key]" week-start="0" show-now-button input-class-name="input dp-custom-input"/>
                            <input v-else-if="field.type === 'date'" :ref="field.key" class="input" :readonly="!field.isEditable" :value="$filters.formatTime(lead[field.key])" /> -->
                            <p v-if="field.type === 'phone' && !field.isEditable || field.type === 'email' && !field.isEditable"
                                class="input phone-email" @click.stop="openDialog(field)">{{ lead[field.key] }}</p>
                            <date-picker v-else-if="field.type === 'date'" :date="lead[field.key]" :isEditable="field.isEditable" :field="field"
                                @pickDate="updateLeadField" :class="{ 'cursor-default': field.isImmutable }"/>
                            <span v-else-if="field.key === 'status'">{{ statusTxtMap[lead[field.key]] }}</span>
                            <input v-else :ref="field.key" class="input" :readonly="!field.isEditable" v-model="lead[field.key]" />
                            <button v-if="field.isEditable" class="clean-btn icon flex-center">
                                <svgIcon iconType="done" />
                            </button>
                            <!-- <button class="clean-btn icon flex-center" >
                                <svgIcon :iconType="field.isEditable? 'done': 'edit'" />
                            </button> -->
                        </label>
                    </form>
                </section>
            </article>
            <!-- <section class="actions">

                </section> -->
            <article class="manager-section flex flex-column gap-20">
                <section class="card-article actions-section">
                    <!-- <div class="btn flex align-center gap-6" v-for="action in actions" :key="action.key" @click="onPickAction(action.action)"> -->
                    <div class="btn flex align-center gap-6" v-for="action in actions" :key="action.key" @click="action.action">
                        <svgIcon :iconType="action.icon" class="svg-btn" :isSmall="true" />
                        <span>{{ action.txt }}</span>
                    </div>
                </section>
                <logModal v-if="isLogModalOpen" @closeModal="closeLogModal" />
                <section class="card-article log-card">
                    
                </section>
            </article>
        </main>
    </section>
</template>
<script>
// import SvgIcon from '../svg-icon.vue'
import { leadService } from '../../services/lead-service'
import datePicker from '../utils/date-picker/date-picker.vue'
import firstLetter from '../utils/first-letter.vue'
import logModal from '../log-modal/log-modal.vue'

export default {
    name: 'contact-card',
    props: { type: Object },
    data() {
        return {
            txt: '',
            sections: null,
            lead: null,
            actions: [
                { key: 'note', txt: 'הערה', icon: 'editNote' },
                { key: 'task', txt: 'משימה', icon: 'checkboxChecked' },
                { key: 'log', txt: 'לוג שיחה', icon: 'phone', action: this.openLogModal },
                // { key: 'log', txt: 'לוג שיחה', icon: 'phone', action: 'openLogModal' },
            ],
            isLogModalOpen: false,
        }
    },
    created() {
        this.lead = JSON.parse(JSON.stringify(this.currLead))
    },
    mounted() {
        this.sections = JSON.parse(JSON.stringify(this.cardSections))
        // console.log('this.$route:', this.$route)
    },
    methods: {
        toggleSectionOpen(sectionId) {
            // console.log('sectionId: ', sectionId)
            this.$store.commit({ type: 'toggleCardSectionOpen', sectionId })
        },
        toggleInputEditable(sectionId, fieldIdx, field) {
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
        openLogModal() {
            this.isLogModalOpen = true
        },
        // onPickAction(act) {
        //     if(act === 'openLogModal') this.isLogModalOpen = true
        // },
        closeLogModal() {
            this.isLogModalOpen = false
        },
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
        // getColor() {
        //     return "hsl(" + 360 * Math.random() + ',' +
        //         (25 + 70 * Math.random()) + '%,' +
        //         (85 + 10 * Math.random()) + '%)'
        // }
    },
    unmounted() { },
    components: {
        // SvgIcon,
        datePicker,
        firstLetter,
        logModal,
    },
    watch: {
        '$route.params.id': {
            async handler() {
                const { id } = this.$route.params
                if (!id) return
                const lead = await leadService.getLeadById(id)
                console.log('lead: ', lead)
                this.lead = lead
            },
            immediate: true,
        },
    },

}
</script>