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
        <label for="status">סטטוס</label>
        <selectDropdown class="form-field" :options="statusTxtMapOptions" v-model="logInfo.status" />
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
            this.closeModal()
            this.initLogInfo()
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
                // type: this.logType,
                result: 'phone',
                status: 'beforeIntro',
                description: this.logDesc,
            }
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