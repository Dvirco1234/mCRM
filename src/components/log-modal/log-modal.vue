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
                <selectDropdown class="form-field" :options="logOptions.types" :value="logInfo.type" @input="handleChange" />
                <!-- <selectDropdown :options="logOptions.types" v-model="logInfo.type" @input="handleChange"/> -->
                <label for="result">תוצאה</label>
                <selectDropdown class="form-field" :options="logOptions.results" :value="logInfo.result" @input="handleChange" />
                <label for="desc">תיאור</label>
                <pre class="form-field field desc" contenteditable ref="pre">{{ logInfo.description }}</pre>
                <div class="actions flex">
                    <button class="clean-btn btn">ביטול</button>
                    <button class="clean-btn btn save" type="submit">שמור</button>
                </div>
            </form>
        </main>
    </section>
</template>
<script>
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
                    { key: 'folowup', label: 'ביקש/ה פולואפ' },
                ],
            },
            logInfo: {
                type: 'phone',
                result: 'phone',
                description: '',
            },
        }
    },
    created() { },
    methods: {
        saveLog() {
            this.logInfo.description = this.$refs.pre.innerText
            console.log('this.logInfo: ', this.logInfo);
        },
        toggleMinimized() {
            this.isMinimized = !this.isMinimized
        },
        minimize() {
            this.isMinimized = true
        },
        closeModal() {
            // if(this.isMinimized) return
            this.$emit('closeModal')
        },
        onInputDesc(ev) {
            console.log('ev.target: ', ev)
            this.logInfo.description = ev.target.innerText
        },
        handleChange(value) {
            // this.logInfo.type = value
            // console.log('Selected value:', value)
            console.log('Selected value:', this.logInfo.type)
        }
    },
    computed: {},
    unmounted() { },
    components: {}
}
</script>