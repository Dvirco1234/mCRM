<template>
    <section class="modal position-absolute">
        <ul class="clean-list">
            <Container :get-ghost-parent="getGhostParent" :get-child-payload="getChildPayload" @drop="onDrop" @drop-ready="onDropReady"
                @drop-not-allowed="dropNotAllowed">
                <Draggable v-for="(field, idx) in activeTableFields" :key="field.key">
                    <!-- <li class="field flex align-center" @click="$emit('toggleTableFields', idx, field)"> -->
                    <li class="field flex align-center" @click="$emit('toggleCurrViewFields', field.id)">
                        <svgIcon iconType="drag20" :isSmall="true" />
                        <toggleBtn :checked="field.isActive" />
                        <span class="field-txt">{{ field.txt }}</span>
                    </li>
                </Draggable>
            </Container>
            <!-- @click="$emit('toggleCurrViewFields', idx + activeTableFields.length, field.id)"> -->
            <li class="field flex align-center" v-for="field, idx in inactiveTableFields" :key="field.key"
                @click="$emit('toggleCurrViewFields', field.id)">
                <svgIcon iconType="drag20" :isSmall="true" />
                <toggleBtn :checked="field.isActive" />
                <span class="field-txt">{{ field.txt }}</span>
            </li>
        </ul>
    </section>
</template>
<script>
import { Container, Draggable } from 'vue-dndrop'
import svgIcon from '../svg-icon.vue'
import toggleBtn from '../toggle-btn.vue'
import { dndService } from '../../services/dnd-service.js'

export default {
    name: 'table-fields-modal',
    props: { tableFields: Array },
    data() {
        return {
            lists: [
                {}
            ]
        }
    },
    created() { 
        console.log('tableFields: ', this.tableFields);

    },
    methods: {
        onDrop(dropResult) {
            // console.log("drop result ", dropResult)
            const activeTableFields = dndService.applyDrag(this.activeTableFields, dropResult)
            const fields = [...activeTableFields, ...this.inactiveTableFields]
            this.$emit('updateTableFields', fields)
        },
        getGhostParent() {
            return document.body
        },
        onDropReady(dropResult) {
            // console.log("drop ready", dropResult)
        },
        dropNotAllowed({ payload, container }) {
            // console.log("drop not allowed")
        },
        getChildPayload(index) {
            // console.log('index: ', index)
            //   return this.items[index];
        },
    },
    computed: {
        activeTableFields() {
            return this.tableFields.filter(field => field.isActive)
        },
        inactiveTableFields() {
            return this.tableFields.filter(field => !field.isActive)
        },
    },
    unmounted() { },
    components: {
        svgIcon,
        toggleBtn,
        Container,
        Draggable
    }
}
</script>
