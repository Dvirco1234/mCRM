<template>
    <section class="make-call-modal dialog-form">
        <main class="flex flex-column justify-center h100">
            <h3>סרוק כדי להתקשר</h3>
            <h2>{{ lead.phone }}</h2>
            <vue-qrcode :width="220" :value="`tel:${tel}`" :color="{ dark: '#444444', light: '#f9f9f9' }" :margin="0"
                class="qr-code" :type="'image/png'"></vue-qrcode>
            <article class="make-call h100">
                <h3>שיחה באמצעות מיקרוסופט</h3>
            </article>
            <div class="actions flex">
                <button class="clean-btn btn" @click="closeModal">ביטול</button>
                <button class="clean-btn btn save" @click.stop="openLogModal">מעבר ללוג שיחה</button>
            </div>
        </main>
        <!-- <button @click="closeModalOpenLog">מעבר ללוג שיחה</button> -->
    </section>
</template>
<script>
import VueQrcode from 'vue-qrcode'

export default {
    name: 'make-call-modal',
    props: { lead: Object },
    data() {
        return {
            tel: '1234567890',
            showQrCode: false,
        }
    },
    created() {
        console.log('this.lead: ', this.lead)
        this.tel = this.lead.phone
    },
    mounted() {
        this.showQrCode = true
    },
    methods: {
        openLogModal() {
            this.$emit('openModal', 'logModal')
        },
        closeModal() {
            this.$emit('closeModal')
        },
    },
    computed: {},
    unmounted() { },
    components: {
        VueQrcode,
    }
}
</script>
