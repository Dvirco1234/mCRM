<template>
    <section class="log-modal" :class="{ minimized: isMinimized }" v-click-outside="minimize">
        <header class="log-header flex" @[isMinimized&&`click`]="toggleMinimized">
            <h3>לוג שיחה</h3>
            <div class="close-actions flex gap-2">
                <svgIcon iconType="minimize" className="circle hover pointer lg-bg" @click="toggleMinimized" />
                <svgIcon iconType="x" className="circle hover pointer lg-bg" @click="closeModal" />
            </div>
        </header>
        <main class="log-main">
            <form class="log-form flex flex-column" @submit.prevent="saveLog()">
                <label for="type">אמצעי קשר</label>
                <selectDropdown class="form-field" :options="logOptions.types" v-model="logInfo.type" />
                <!-- <selectDropdown :options="logOptions.types" v-model="logInfo.type" @input="handleChange"/> -->
                <label for="result">תוצאה</label>
                <selectDropdown class="form-field" :options="logOptions.results" v-model="logInfo.result" />
                <template v-if="logInfo.result === 'followup'">
                    <label for="result">תאריך התקשרות הבא</label>
                    <div class="followup-date field">
                        <datePicker :isEditable="true" :field="{key: 'nextContactDate', isImmutable: false}" @pickDate="updateLeadField" />
                    </div>
                </template>
                <label for="desc">תיאור</label>
                <pre class="form-field field desc" id="desc" contenteditable ref="pre" @blur="onInputDesc">{{ logInfo.description }}</pre>
                <div class="actions flex">
                    <button class="clean-btn btn" @click="closeModal">ביטול</button>
                    <button class="clean-btn btn save" type="submit">שמור</button>
                </div>
            </form>
        </main>
    </section>
</template>
<script>
import datePicker from '../utils/date-picker/date-picker.vue'

export default {
    name: 'log-modal',
    props: { type: Object },
    data() {
        return {
            isMinimized: false,
            logOptions: {
                types: [
                    { key: 'phone', label: 'טלפון' },
                    { key: 'whatsapp', label: 'ווצאפ' },
                    { key: 'email', label: 'אימייל' },
                ],
                results: [
                    { key: 'phone', label: 'שיחה' },
                    { key: 'followup', label: 'פולואפ' },
                ],
            },
            logInfo: {
                type: 'phone',
                result: 'followup',
                description: '',
            },
        }
    },
    created() { },
    methods: {
        saveLog() {
            this.logInfo.description = this.$refs.pre.innerText
            console.log('this.logInfo: ', this.logInfo)
        },
        toggleMinimized() {
            this.isMinimized = !this.isMinimized
        },
        minimize() {
            this.isMinimized = true
        },
        closeModal() {
            // if(this.isMinimized) return
            this.$emit('closeModal', 'log')
        },
        onInputDesc(ev) {
            // console.log('ev.target: ', ev)
            this.logInfo.description = ev.target.innerText
            console.log('this.logInfo.description: ', this.logInfo.description)
        },
        handleChange(value) {
            // this.logInfo.type = value
            // console.log('Selected value:', value)
            console.log('Selected value:', this.logInfo.type)
        }
    },
    computed: {},
    unmounted() { },
    components: {
        datePicker,
    }
}
</script>