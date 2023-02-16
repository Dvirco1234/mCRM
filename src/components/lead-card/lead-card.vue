<template>
    <section v-if="lead" class="lead-card">
        <header class="header flex align-center space-between">
            <div class="name flex align-center">
                <svgIcon iconType="arrowRight" class="svg-btn cursor-pointer" className="circle hover" @click="$router.go(-1)" />
                <first-letter :word="lead.fullname" :isTwoLetters="true"/>
                <h2>{{ lead.fullname }}</h2>
            </div>
            <div class="actions flex gap-20 cursor-pointer">
                <SvgIcon iconType="mail" className="circle hover lg-bg" title="שלח אימייל" class="mail" />
                <SvgIcon iconType="phone" className="circle hover lg-bg" title="בצע שיחה" class="phone" />
                <SvgIcon iconType="whatsapp2" className="circle hover lg-bg" title="שלח ווצאפ" class="whatsapp" />
            </div>
        </header>
        <main class="lead-card-main grid">
            <article class="lead-details card-article">
                <section class="card-section grid" v-for="section in cardSections">
                    <div class="section-title flex align-center" @click="toggleSectionOpen(section.id)">
                        <SvgIcon iconType="expandDown" :className="section.isOpen ? 'fill-secondary' : 'rotate-270 fill-secondary'" />
                        <h3>{{ section.name }}</h3>
                    </div>
                    <form v-if="section.isOpen" class="form-field flex" v-for="field, idx in section.fields" :key="field.key"
                        @submit.prevent="toggleInputEditable(section.id, idx, field)">
                        <label class="flex input-label" :class="{ disabled: !field.isEditable }"
                            @click="!field.isEditable && !field.isImmutable && toggleInputEditable(section.id, idx, field)">
                            <span class="label">{{ field.txt }}</span>

                            <!-- <Datepicker v-if="field.isEditable && field.type === 'date'" v-model="lead[field.key]" week-start="0" show-now-button input-class-name="input dp-custom-input" /> -->
                            <!-- <Datepicker v-if="field.isEditable && field.type === 'date'" v-model="lead[field.key]" week-start="0" show-now-button input-class-name="input dp-custom-input"/>
                        <input v-else-if="field.type === 'date'" :ref="field.key" class="input" :readonly="!field.isEditable" :value="$filters.formatTime(lead[field.key])" /> -->
                            <p v-if="field.type === 'phone' && !field.isEditable || field.type === 'email' && !field.isEditable"
                                class="input phone-email" @click.stop="openDialog(field)">{{ lead[field.key] }}</p>
                            <date-picker v-else-if="field.type === 'date'" :date="lead[field.key]" :isEditable="field.isEditable"
                                :field="field" @pickDate="updateLeadField"/>
                            <input v-else :ref="field.key" class="input" :readonly="!field.isEditable" v-model="lead[field.key]" />
                            <button v-if="field.isEditable" class="clean-btn icon flex-center">
                                <SvgIcon iconType="done" />
                            </button>
                            <!-- <button class="clean-btn icon flex-center" >
                            <SvgIcon :iconType="field.isEditable? 'done': 'edit'" />
                        </button> -->
                        </label>
                    </form>
                </section>
            </article>
            <!-- <section class="actions">

            </section> -->
            <article class="card-article">
                <section class="actions">
                    
                </section>

            </article>
        </main>
    </section>
</template>
<script>
import SvgIcon from '../svg-icon.vue'
import datePicker from '../utils/date-picker/date-picker.vue'
import firstLetter from '../utils/first-letter.vue'

export default {
    name: 'contact-card',
    props: { type: Object },
    data() {
        return {
            txt: '',
            sections: null,
            lead: null,
        }
    },
    created() {
        const { id } = this.$route.params
        console.log('id: ', id)
        this.lead = JSON.parse(JSON.stringify(this.currLead))
    },
    mounted() {
        this.sections = JSON.parse(JSON.stringify(this.cardSections))
        // console.log('this.$route:', this.$route)
    },
    methods: {
        toggleSectionOpen(sectionId) {
            // console.log('sectionId: ', sectionId)
            this.$store.commit({ type: 'toggleSectionOpen', sectionId })
        },
        toggleInputEditable(sectionId, fieldIdx, field) {
            this.$store.commit({ type: 'toggleInputEditable', sectionId, fieldIdx })
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
        }
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
        }
        // getColor() {
        //     return "hsl(" + 360 * Math.random() + ',' +
        //         (25 + 70 * Math.random()) + '%,' +
        //         (85 + 10 * Math.random()) + '%)'
        // }
    },
    unmounted() { },
    components: {
        SvgIcon,
        datePicker,
        firstLetter
    }
}
</script>