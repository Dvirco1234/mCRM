<template>
    <Datepicker v-if="isEditable && !field.isImmutable" v-model="dateToEdit" :start-date="startDate" week-start="0" show-now-button input-class-name="input dp-custom-input"
        @change="pickDate()" format="dd/MM/yyyy HH:mm" :min-date="minDate" auto-apply/>
        <!-- @change="pickDate()" :format="format" /> -->
    <!-- <input v-else class="input date-input" readonly :value="$filters.formatTime(date)" /> -->
    <p v-else class="input date-input">{{ $filters.formatTime(date) }}</p>
</template>
<script>
export default {
    name: 'date-picker',
    props: {
        // date: Number,
        date: {
            type: Number,
            default: Date.now(),
        },
        isEditable: Boolean,
        // isEditable: {
        //     type: Boolean,
        //     default: true,
        // },
        field: Object,
        minDate: {
            type: Date,
            default: null,
        }
    },
    data() {
        return {
            dateToEdit: '',
            startDate: new Date(Date.now()),
        }
    },
    created() {
        this.dateToEdit = JSON.parse(JSON.stringify(this.date || ''))
        console.log('this.isEditable:', this.isEditable)
    },
    methods: {
        pickDate() {
            const date = new Date(this.dateToEdit)
            this.$emit('pickDate', { key: this.field.key, value: date.getTime() })
        },
        // format(date) {
        //     let day = date.getDate()
        //     let month = date.getMonth() + 1
        //     const year = date.getFullYear()
        //     // let hour = date.getHours()
        //     // let minute = date.getMinutes()
        //     if (month.length < 2) month = '0' + month
        //     if (day.length < 2) day = '0' + day
        //     // if (hour.length < 2) hour = '0' + hour
        //     // if (minute.length < 2) minute = '0' + minute
        //     return [day, month, year].join('/') + ' ' + [hour, minute].join(':')
        //     // return `Selected date is ${day}/${month}/${year}`
        // }
    },
    computed: {
    },
    watch: {
        'dateToEdit': {
            handler() {
                this.pickDate()
            }
        }
    },
    unmounted() { },
    components: {}
}
</script>