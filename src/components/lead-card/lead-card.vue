<template>
    <section v-if="lead" class="lead-card">
        <header class="header flex align center">
            <svgIcon iconType="arrowRight" class="svg-btn cursor-pointer" className="circle hover" @click="$router.go(-1)" />
            <div class="first-letter flex-center" :style="{ 'background-color': getColor }">{{ $filters.firstLetter(lead.name) }}</div>
            <h2>{{ lead.name }}</h2>
        </header>
        <article class="lead-details">
            <section class="card-section grid" v-for="section in cardSections">
                <div class="section-title flex align-center" @click="toggleSectionOpen(section.id)">
                    <SvgIcon iconType="expandDown" :className="section.isOpen ? 'fill-secondary' : 'rotate-270 fill-secondary'" />
                    <h3>{{ section.name }}</h3>
                </div>
                <form v-if="section.isOpen" class="form-field flex" v-for="field, idx in section.fields" :key="field.key"
                    @submit.prevent="toggleInputEditable(section.id, idx, field)">
                    <label class="flex input-label" :class="{ disabled: !field.isEditable }" @click="!field.isEditable && toggleInputEditable(section.id, idx, field)">
                        <span class="label">{{ field.txt }}</span>
                        <input v-if="field.type === 'date'" :ref="field.key" class="input" :readonly="!field.isEditable" v-model="lead[field.key]"/>
                        <input :ref="field.key" class="input" :readonly="!field.isEditable" v-model="lead[field.key]"/>
                        <button v-if="field.isEditable" class="clean-btn icon flex-center" >
                            <SvgIcon iconType="done" />
                        </button>
                        <!-- <button class="clean-btn icon flex-center" >
                            <SvgIcon :iconType="field.isEditable? 'done': 'edit'" />
                        </button> -->
                    </label>
                </form>
            </section>
        </article>
        <section class="actions">

        </section>

    </section>
</template>
<script>
import SvgIcon from '../svg-icon.vue'

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
    },
    methods: {
        toggleSectionOpen(sectionId) {
            console.log('sectionId: ', sectionId)
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
    components: { SvgIcon, SvgIcon }
}
</script>