<template>
    <section class="make-call-modal" v-if="true">
        <header class="flex align-center modal-header">
            <svgIcon iconType="phone" className="circle lg-bg" class="phone" />
            <h2>התקשרות עם {{ lead.fullname }}</h2>
        </header>
        <main class="flex align-center space-between">
            <vue-qrcode :width="220" :value="`tel:${tel}`" :color="{ dark: '#444444', light: '#f9f9f9' }" :margin="0" class="qr-code"></vue-qrcode>
            <article class="make-call h100">
                <h4>שיחה באמצעות מיקרוסופט</h4>
            </article>
        </main>
        <button @click="closeModalOpenLog">מעבר ללוג שיחה</button>
    </section>
</template>
<script>
import VueQrcode from 'vue-qrcode'

export default {
    name: 'make-call-modal',
    props: { lead: Object },
    data() {
        return {
            tel: '12345',
        }
    },
    created() {
        console.log('this.lead: ', this.lead)
        this.tel = this.lead.phone
    },
    methods: {
        closeModalOpenLog() {
            this.$emit('openLog', 'log')
            this.$emit('closeCall', 'call')
        }
    },
    computed: {},
    unmounted() { },
    components: {
        VueQrcode
    }
}
</script>
