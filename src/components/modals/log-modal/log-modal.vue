<template>
    <!-- <form class="dialog-form flex flex-column" @submit.prevent="saveLog()"> -->
    <form class="dialog-form flex flex-column" @submit.prevent="saveLog()">
        <main class="grid">
            <div class="field-wrapper">
            <label for="type">אמצעי קשר</label>
            <VSelect class="form-field" :options="logOptions.types" v-model="logInfo.type" />
        </div>
        <div class="field-wrapper">
            <label for="result">תוצאה</label>
            <VSelect class="form-field" :options="logOptions.results" v-model="logInfo.result" />
        </div>
        <template v-if="logInfo.result === 'followup'">
            <div class="field-wrapper">
                <label for="result">תאריך התקשרות הבא</label>
                <div class="followup-date field">
                    <datePicker :isEditable="true" :field="{ key: 'nextContactDate', isImmutable: false }" @pickDate="updateLeadField" />
                </div>
            </div>
        </template>
        <div class="field-wrapper">
            <label for="status">סטטוס</label>
            <VSelect class="form-field" :options="statusTxtMapOptions" v-model="logInfo.status" />
        </div>
        <div class="field-wrapper full desc-wrapper">
            <label for="desc">תיאור</label>
            <pre class="form-field field desc" id="desc" contenteditable ref="pre" @blur="onInputDesc">{{ logInfo.description }}</pre>
        </div>
        </main>
        <div class="field-wrapper full actions flex">
            <button class="clean-btn btn" @click="closeModal">ביטול</button>
            <button class="clean-btn btn save" type="submit">שמור</button>
        </div>
    </form>
</template>
<script>
import datePicker from '../../utils/date-picker/date-picker.vue'

export default {
    name: 'log-modal',
    props: {
        // logInfo: {
        //     type: Object,
        //     default: {
        //         type: 'phone',
        //         result: 'followup',
        //         description: '',
        //     }
        // },
        logType: {
            type: String,
            default: '',
        },
        logDesc: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            logOptions: {
                types: [
                    { key: 'phone', label: 'טלפון' },
                    { key: 'whatsapp', label: 'ווצאפ' },
                    { key: 'email', label: 'אימייל' },
                    { key: 'sms', label: 'סמס' },
                ],
                results: [
                    { key: 'phone', label: 'שיחה' },
                    { key: 'followup', label: 'פולואפ' },
                ],
            },
            logInfo: null,
            // logInfo: {
            //     type: 'phone',
            //     result: 'phone',
            //     description: '',
            // },
        }
    },
    created() {
        this.initLogInfo()
    },
    methods: {
        saveLog() {
            this.logInfo.description = this.$refs.pre.innerText
            this.logInfo.manager = this.$store.getters.getLoggedinUser.fullname
            this.logInfo.createdAt = Date.now()
            this.$emit('saveLog', { ...this.logInfo })
            this.$emit('updateLead', { key: 'status', value: this.logInfo.status })
            this.closeModal()
            this.initLogInfo()
            this.updateScrum()
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
        },
        initLogInfo() {
            this.logInfo = {
                type: this.logType || 'phone',
                didAnswer: false,
                // type: this.logType,
                result: 'phone',
                status: 'beforeIntro',
                description: this.logDesc,
            }
        },
        updateScrum() {
            // const manager = 

        },
    },
    computed: {
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
    },
    unmounted() { },
    components: {
        datePicker,
    }
}
</script>