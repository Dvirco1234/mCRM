<template>
    <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" :checked="checked">
        <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
        </label>
    </div>
</template>

<script>

export default {
    name: 'toggle-btn',
    props: {
        // typeBold: {
        //     default: false
        // },
        checked: {
            default: true
        },
        color: {
            default: 'default'
        },
        isSmall: {
            default: true,
        }
    },

    mounted() {
        if (this.emitOnMount) {
            this.$emit('input', this.value)
        }
    },

    methods: {
        trigger(e) {
            this.$emit('input', e.target.checked)
        }
    },

    computed: {}

}

</script>
<style lang="scss">
.onoffswitch {
    position: relative;
    width: 32px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.onoffswitch-label {
    display: block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    // border: 1px solid #999999;
    border-radius: 20px;
}

.onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    // transition: margin 0.3s ease-in 0s;
    transition: translate 0.3s ease-in 0s;
}

.onoffswitch-inner:before,
.onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 15px;
    padding: 0;
    line-height: 15px;
    font-size: 12px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
}

.onoffswitch-inner:before {
    content: "";
    padding-left: 5px;
    background-color: #37C998;
    color: #FFFFFF;
}

.onoffswitch-inner:after {
    content: "";
    padding-right: 5px;
    background-color: #EEEEEE;
    color: #999999;
    text-align: right;
}

.onoffswitch-switch {
    display: block;
    position: absolute;
    top: 50%;
    translate: 0 -53%;
    // bottom: 0;
    height: 14px;
    width: 14px;
    margin: 1px 1px 1px 0;
    background: #FFFFFF;
    right: 15px;
    border: 1px solid #c5c5c5;
    border-radius: 50%;
    transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner {
    margin-left: 0px;
    translate: 50% 0;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-switch {
    right: 1px;
}
</style>