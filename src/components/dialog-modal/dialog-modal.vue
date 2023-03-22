<template>
    <section class="dialog-modal" :class="{ minimized: isMinimized }" v-click-outside="minimize">
        <header class="dialog-header flex" @[isMinimized&&`click`]="toggleMinimized">
            <h3>{{ modal.label }}</h3>
            <div class="close-actions flex gap-2">
                <svgIcon iconType="minimize" className="circle hover pointer lg-bg" @click="toggleMinimized" />
                <svgIcon iconType="x" className="circle hover pointer lg-bg" @click="closeModal" />
            </div>
        </header>
        <main class="dialog-main">
            <slot></slot>
            <component v-if="modal?.type" :is="modal.type" @closeModal="closeModal" @openModal="openModal" :lead="lead"/>

        </main>
    </section>
</template>
<script>
import CallModal from '../call-modal/call-modal.vue'
import LogModal from '../log-modal/log-modal.vue'
import datePicker from '../utils/date-picker/date-picker.vue'


export default {
    name: 'dialog-modal',
    props: {
        modal: {type: Object},
        lead: {type: Object, default: null},
    },
    
    data() {
        return {
            isMinimized: false,
        }
    },
    created() { },
    methods: {
        // saveLog() {
        //     this.logInfo.description = this.$refs.pre.innerText
        //     console.log('this.logInfo: ', this.logInfo)
        // },
        toggleMinimized() {
            this.isMinimized = !this.isMinimized
        },
        minimize() {
            this.isMinimized = true
        },
        closeModal() {
            this.$emit('closeModal')
        },
        openModal(type) {
            this.$emit('openModal', type)
        },
        // onInputDesc(ev) {
        //     // console.log('ev.target: ', ev)
        //     this.logInfo.description = ev.target.innerText
        //     console.log('this.logInfo.description: ', this.logInfo.description)
        // },
        // handleChange(value) {
        //     // this.logInfo.type = value
        //     // console.log('Selected value:', value)
        //     console.log('Selected value:', this.logInfo.type)
        // }
    },
    computed: {},
    unmounted() { },
    components: {
    datePicker,
    LogModal,
    CallModal
}
}
</script>