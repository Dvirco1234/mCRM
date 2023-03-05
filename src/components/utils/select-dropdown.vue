<template>
    <article class="select-wrapper" >
        <div class="options-wrapper">
            <div class="selected" @click="toggleOptions" v-click-outside="closeOptions" :class="{ open: isOptionsShow }">
                <span>{{ selectedOption.label }}</span>
                <svg-icon iconType="expandDown" :className="isOptionsShow? 'rotate-180': ''" />
            </div>
            <div class="options" :class="{ hide: !isOptionsShow, open: isOptionsShow }">
                <div v-for="(option, idx) in options" :key="option.key" class="option" @click="selectOption(option)">
                    {{ option.label }}
                </div>
            </div>
        </div>
    </article>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            selectedOption: { label: 'בחר', key: '' },
            isOptionsShow: false
        }
    },
    mounted() {
        const defaultOption = { label: 'בחר', key: '' }
        this.selectedOption = this.options.find((option) => option.key === this.value) || defaultOption
    },
    methods: {
        toggleOptions() {
            this.isOptionsShow = !this.isOptionsShow
        },
        closeOptions() {
            this.isOptionsShow = false
        },
        selectOption(option) {
            console.log('option: ', option);
            this.selectedOption = option
            this.closeOptions()
            // this.$emit('change', option.key)
            this.$emit('input', option.key)
        }
    },
    // watch: {
    //     value(val) {
    //         this.selectedOption = this.options.find((option) => option.key === val) || { label: 'בחר', value: '' }
    //     }
    // },
    computed: {
        selectedValue() {
            return this.selectedOption.key
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    }
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
            padding: 8px;
            cursor: pointer;
            min-width: 150px;
            border-radius: 4px;

            &.open {
                border-radius: 4px 4px 0 0;
                border: 1px solid #0081c9;
            }

            transition: rotate .3s;
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
                padding: 8px;
                cursor: pointer;

                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }
    }

    // &.open {
    //     // min-height: 238px;

    //     .selected {
    //         border-radius: 4px 4px 0 0;
    //     }

    //     .options {
    //         transform: scaleY(1);
    //     }
    // }
}
</style>
  




<!-- <template>
    <section>

    </section>
</template>
<script>
export default {
    name: 'select-dropdown',
    props: { options: Array },
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
    components: {}
}
</script>
<style lang="scss">

</style> -->