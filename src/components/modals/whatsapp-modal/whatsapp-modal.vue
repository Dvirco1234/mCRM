<template>
    <section>
        <form class="dialog-form flex flex-column" @submit.prevent="sendMsg()">
            <label for="type">הודעה מתבנית</label>
            <VSelect class="form-field" :options="msgTypes" v-model="currMsg" />
            <!-- <label for="result">תוצאה</label>
        <selectDropdown class="form-field" :options="logOptions.results" v-model="logInfo.result" />
        <template v-if="logInfo.result === 'followup'">
            <label for="result">תאריך התקשרות הבא</label>
            <div class="followup-date field">
                <datePicker :isEditable="true" :field="{ key: 'nextContactDate', isImmutable: false }" @pickDate="updateLeadField" />
            </div>
        </template>
        <label for="status">סטטוס</label>
        <selectDropdown class="form-field" :options="statusTxtMapOptions" v-model="logInfo.status" /> -->
            <div class="msg-wrapper">
                <label for="msg">הודעה</label>
                <pre class="form-field field msg" id="msg" contenteditable ref="pre" @blur="onInputMsg">{{ msgs[currMsg] }}</pre>
            </div>
            <div class="actions flex">
                <button class="clean-btn btn" @click="closeModal">ביטול</button>
                <button class="clean-btn btn save" type="submit">שלח</button>
            </div>
        </form>
    </section>
</template>
<script>
export default {
    name: 'whatsapp-modal',
    props: { lead: Object },
    data() {
        return {
            msgTypes: [
                { key: 'introInvite', label: 'הזמנה לערב פתוח' },
                { key: 'unanswered', label: 'הודעה לליד שלא ענה' },
                { key: 'introDidntCome', label: 'הודעה למבריזים מערב פתוח' },
                { key: 'introCame', label: 'הודעה ללידים שהגיעו לערב פתוח' },
                { key: 'introUnanswered', label: 'הודעה ללידים חדשים ביום של ערב הכרות שלא ענו' },
                { key: 'custom', label: 'הודעה בניסוח שלי' },
            ],
            msg: '',
            // currMsg: 'introInvite',
            currMsg: 'custom',
            msgs: null,
        }
    },
    created() {
        console.log('this.lead: ', this.lead)
        console.log('this.$store.getters.getLoggedinUser: ', this.$store.getters.getLoggedinUser)
        this.initMsgs()
    },
    mounted() {
    },
    methods: {
        initMsgs() {
            this.msgs = {
                introInvite: `היי ${this.lead.firstName}, מה נשמע?
${this.manager.firstName} מקודינג אקדמי בית ספר לתכנות. בהמשך לשיחתנו - הערב ב18:00 ייערך מפגש היכרות עם קורס התכנות שלנו.
המפגש יהיה באמצעות ZOOM, ויועבר על ידי ירון ביטון - מוביל הקורס שלנו ובעברו מוביל קורס התיכנות הצבאי.
במפגש נספר על דרכי הכניסה להייטק, נעביר שיעור היכרות עם עולם התכנות וניתן פרטים על הקורס.
המשתתפים בפגישה יקבלו את ערכת המבוא לעולם התיכנות.
לינק לפגישה:
${this.url}

אשמח לאישור הגעה :)
`,
                unanswered: `היי ${this.lead.firstName}, זה ${this.manager.firstName} מקודינג אקדמי - בי"ס לתכנות. ניסינו לתפוס אותך טלפונית לאחר שהשארת לנו פרטים. אשמח לספר לך על הקורס שלנו - שנתאם שיחה טלפונית? מתי נוח לך? אשמח לענות לשאלות גם כאן בוואטסאפ`,
                introDidntCome: `היי ${this.lead.firstName}, זה ${this.manager.firstName} מקודינג אקדמי - בי"ס לתכנות. ראיתי שלא הצלחת להגיע לערב ההכרות שלנו, נקיים אחד נוסף ב- 28/03 בשעה 18:00 דרך הזום, לרשום אותך? אם יש לך כל שאלה אשמח לענות בשיחה או בוואטסאפ :) `,
                introCame: `היי ${this.lead.firstName}, מה שלומך? זה ${this.manager.firstName} מקודינג אקדמי בית ספר לתיכנות רציתי לשאול אותך איך היה המפגש היכרות אתמול בערב והאם קיבלת את כל החומרים למייל? `,
                introUnanswered: `היי ${this.lead.firstName}, זה ${this.manager.firstName} מקודינג אקדמי - בית ספר לתכנות.
השארת לנו פרטים בנוגע לקורס הבוטקאמפ. יש לנו *היום*, בשעה 18:00 מפגש הכרות שיועבר על ידי ירון ביטון מוביל הקורס שלנו ובעברו מוביל קורס התיכנות הצבאי, דרך הזום.
במהלך המפגש נספר על הקורס, נציג פרוייקטי סיום לדוגמא ואפילו נלמד לתכנת קצת בשיעור תכנות קצר לדוגמא. המפגש אורך כשעה ורבע. לרשום אותך? :)
`,
                custom: ``,
            }
        },
        closeModal() {
            this.$emit('closeModal')
        },
        sendMsg() {
            const msg = this.msgs[this.currMsg].replace(/ /g, '%20').replace(/\n/g, '%0A')
            // const msg = encodeURIComponent(this.msgs[this.currMsg])
            let phone = this.lead.phone.replace(/\D/g, '')
            if (phone.startsWith('0')) phone = phone.replace(/^0/, '+972')
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
            this.openLog()
        },
        openLog() {
            const msgType = this.msgTypes.find(m => m.key === this.currMsg).label
            // this.$emit('setLogInfo', {type: 'whatsapp', desc: msgType})
            this.$emit('setLogInfo', {type: 'whatsapp', desc: `-- ${msgType} --`})
            this.$emit('openModal', 'logModal')
        },
    },
    computed: {
        manager() {
            return this.$store.getters.getLoggedinUser
        },
        url() {
            return this.$store.getters.getIntroLink || 'ZOOMLINK.zoom'
        },
        introInfo() {
            return this.$store.getters.getIntroInfo
        }
    },
    unmounted() { },
    components: {},
    watch: {

    },
}
</script>