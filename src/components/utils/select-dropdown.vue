<template>
    <article class="select-wrapper" >
        <!-- <div class="options-wrapper" v-if="isEditable"> -->
        <div class="options-wrapper">
            <div class="selected" @click="toggleOptions" v-click-outside="closeOptions" :class="{ open: isOptionsShow }">
                <!-- <span>{{ selectedOption.label }}</span> -->
                <div class="flex flex-column">
                    <label class="select-label">{{selectLabel}}</label>
                    <span class="value">{{ selectedOption.label }}</span>
                </div>
                <svg-icon iconType="expandDown" :className="isOptionsShow? 'rotate-180': ''" />
            </div>
            <div class="options" :class="{ hide: !isOptionsShow, open: isOptionsShow }">
                <div v-for="option in optionsFormat" :key="option.key" class="option" @click="selectOption(option)">
                    {{ option.label }}
                </div>
            </div>
        </div>
        <!-- <p v-else class="selected" style="padding-inline: 0;">{{ selectedOption.label }}</p> -->
    </article>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        iconColor: {
            type: String,
            default: '#005FAA'
        },
        primaryColor: { type: String, default: '#005faa' },
        selectLabel: { type: String, default: '' },
        bgColor: { type: String, default: '#fff' },
        defaultOption: {
            type: Object,
            default: () => ({ label: 'בחר', key: '' })
        },
        isEditable: { type: Boolean, default: true },
        // value: {
        //     type: String,
        //     default: ''
        // },
        modelValue: String,
    },
    data() {
        return {
            selectedOption: { label: 'בחר', key: '' },
            isOptionsShow: false
        }
    },
    mounted() {
        this.selectedOption = this.optionsFormat.find((option) => option.key === this.modelValue) || this.defaultOption
    },
    methods: {
        toggleOptions() {
            this.isOptionsShow = !this.isOptionsShow
        },
        closeOptions() {
            this.isOptionsShow = false
        },
        selectOption(option) {
            this.selectedOption = option
            this.closeOptions()
            this.$emit('update:modelValue', option.key)
            // this.$emit('input', option.key)
        }
    },
    computed: {
        selectedValue() {
            return this.selectedOption.key
        },
        optionsFormat() {
            if(!this.options || !this.options.length) return []
            if (typeof this.options[0] === 'object') return this.options
            else return this.options.map(o => ({label: o, key: o}))
        },
    },
}
</script>
<style lang="scss">
.select-wrapper {
    position: relative;
    // z-index: 20;
    overflow: visible;
    width: 100%;
    // min-height: 40px;
    // transition: min-height .2s;
    
    .options-wrapper {
        position: relative;
        overflow: visible;

        .selected {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #ccc;
            // padding: 8px;
            padding: 8px 12px;
            cursor: pointer;
            min-width: 150px;
            border-radius: 4px;

            &.open {
                border-radius: 4px 4px 0 0;
                border: 1px solid #0081c9;
            }

            transition: rotate .3s;

            .flex-column {
                row-gap: 2px;
            }
            .select-label {
                color: #7B97AC;
                font-size: 13px;
                line-height: 1;
            }
            
            .value {
                // color: #002644;
                // color: rgb(33, 33, 33);
                color: rgb(35, 31, 32);
                font-size: 16px;
                // padding-inline-start: 4px;
                line-height: 1;
            }
        }

        .options {
            position: absolute;
            /* top: 100%; */
            /* left: 0; */
            width: 100%;
            border: 1px solid #ccc;
            background-color: #fff;
            z-index: 30;
            max-height: 200px;
            overflow-y: auto;
            border-radius: 0 0 4px 4px;
            transition: transform .2s ease-in-out;
            transform-origin: top;
            
            
            &.open {
                transform: scaleY(1);
                border: 1px solid #0081c9;
                border-top: none;
            }

            &.hide {
                transform: scaleY(0);
            }

            .option {
                // padding: 8px;
                padding: 8px 12px;
                cursor: pointer;

                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }
}
</style>