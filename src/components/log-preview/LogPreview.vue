<template>
    <article>
        <header class="flex space-between align-center">
            <h4 class="flex align-center gap-4">
                <svgIcon :iconType="log.type" isSmall className="circle md-bg" :class="log.type" />לוג שיחה
            </h4>
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
        <div class="desc">
            <pre ref="pre" :title="isEdit ? 'Enter לשמירה' : 'לחץ על מנת לערוך'" contenteditable v-click-outside="saveChanges"
                :class="{ editing: isEdit, 'cursor-pointer': !isEdit }" @click="startEditMode" @keydown.enter="saveChanges">{{ log.description }}</pre>
        </div>
        <div class="date-by flex align-center gap-2">
            <svgIcon iconType="user" className="circle" isSmall class="user" />
            <span>{{ log.manager }}</span>
            <span class="date">{{ $filters.formatTime(log.createdAt) }}</span>
            <span v-if="log.editedAt" class="date">עודכן: {{ $filters.formatTime(log.editedAt) }}</span>
        </div>
    </article>
</template>
<script>
export default {
    name: 'LogPreview',
    props: { log: Object },
    data() {
        return {
            logOptions: {
                phone: 'טלפון',
                whatsapp: 'ווצאפ',
                email: 'אימייל',
                followup: 'פולואפ',
            },
            isEdit: false,
        }
    },
    created() { },
    methods: {
        toggleEditable() {
            if (this.isEdit) {
                this.isEdit = false
                // this.$emit('entityNoteAction', { action: 'update', note_id: this.note.note_id, note_text: this.$refs.pre.innerText })
            } else {
                this.isEdit = true
                this.$refs.pre.focus()
                // console.log('this.$refs.pre.innerText: ', this.$refs.pre.innerText);
                // console.log('this.$refs.pre.outerText: ', this.$refs.pre.outerText);
            }
        },
        startEditMode() {
            this.isEdit = true
            console.dir(this.$refs.pre)
            this.$refs.pre.focus()
            // const end = this.$refs.pre.innerText.length
            // this.$refs.pre.setSelectionRange(end, end)
        },
        saveChanges(ev) {
            if (!this.isEdit) return
            if (ev) {
                if (ev?.shiftKey) return
                else ev.preventDefault()
            }
            console.log('this.log: ', this.log);
            const description = this.$refs.pre.innerText
            this.$emit('saveLog', { ...this.log, description })
            this.isEdit = false
            this.$refs.pre.blur()
        }
    },
    computed: {
        statusTxtMap() {
            return this.$store.getters.getStatusTxtMap
        },
    },
    unmounted() { },
    components: {}
}
</script>