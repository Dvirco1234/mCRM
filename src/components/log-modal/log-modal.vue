<template>
    <form class="dialog-form flex flex-column" @submit.prevent="saveLog()">
        <label for="type">אמצעי קשר</label>
        <selectDropdown class="form-field" :options="logOptions.types" v-model="logInfo.type" />
        <label for="result">תוצאה</label>
        <selectDropdown class="form-field" :options="logOptions.results" v-model="logInfo.result" />
        <template v-if="logInfo.result === 'followup'">
            <label for="result">תאריך התקשרות הבא</label>
            <div class="followup-date field">
                <datePicker :isEditable="true" :field="{ key: 'nextContactDate', isImmutable: false }" @pickDate="updateLeadField" />
            </div>
        </template>
        <div class="desc-wrapper">
            <label for="desc">תיאור</label>
            <pre class="form-field field desc" id="desc" contenteditable ref="pre" @blur="onInputDesc">{{ logInfo.description }}</pre>
        </div>
        <div class="actions flex">
            <button class="clean-btn btn" @click="closeModal">ביטול</button>
            <button class="clean-btn btn save" type="submit">שמור</button>
        </div>
    </form>
</template>
<script>
import datePicker from '../utils/date-picker/date-picker.vue'

export default {
    name: 'log-modal',
    props: {
        logInfo: {
            type: Object,
            default: {
                type: 'phone',
                result: 'followup',
                description: '',
            }
        },
    },
    data() {
        return {
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
        closeModal() {
            // if(this.isMinimized) return
            this.$emit('closeModal')
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