<template>
    <article class="lead-preview">
        <!-- <img v-if="lead.status !== 'New'" :src="lead.img" alt=""> -->
        <div class="grid preview-content">
            <h4 class="name" ><span @click="openContactDetails">{{ lead.fullname }}</span></h4>
            <h5 class="details">טלפון: </h5>
            <!-- <span class="content" @click.stop="onPhoneCall(lead.phone)">{{ lead.phone }}</span> -->
            <span class="content phone" @click.stop="onPhoneCall(lead.phone)">{{ formattedPhoneNumber }}</span>
            <h5 class="details">מייל:</h5>
            <span class="content email" @click.stop="onSendEmail(lead.email)">{{ lead.email }}</span>
        </div>
        <!-- <button v-if="lead.status === 'New'" @click="onTakeLead(lead._id)">+</button> -->
    </article>
</template>

<script>
export default {
    name: '',
    props: {
        lead: Object,
    },
    data() {
        return {

        }
    },
    methods: {
        openContactDetails() {
            console.log('here');
        },
        onPhoneCall(phone) {
            const cleanPhone = phone.replace(/\D/g, '')
            console.log('cleanPhone: ', cleanPhone);
        },
        onSendEmail(email) {
            console.log('email: ', email)

        },
        // cleanPhoneNumber(phone) {
        //     return phone.replace(/\D/g, '')
        // }
    },
    computed: {
        formattedPhoneNumber() {
            if(!this.lead.phone) return ''
            const clean = this.lead.phone.replace(/\D/g, '')
            return clean.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        },
    },
    created() {

    },
    components: {

    },
}
</script>

<style>

</style>