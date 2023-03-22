<template>
    <div class="first-letter flex-center" :style="{ 'background-color': getColor, ...letterSize }">{{ $filters.firstLetter(word) }}{{ $filters.firstLetter(secondWord) }}</div>
</template>
<script>
export default {
    name: 'first-letter',
    props: {
        word: String,
        isTwoLetters: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 40,
        }
    },
    data() {
        return {
            secondWord: ''
        }
    },
    created() {
        if (!this.isTwoLetters) return
            const words = this.word.split(' ')
            this.secondWord = words.length > 1 ? words[1] : ''
    },
    computed: {
        getColor() {
            return "hsl(" + 360 * Math.random() + ',' +
                (15 + 70 * Math.random()) + '%,' +
                (75 + 10 * Math.random()) + '%)'
        },
        letterSize() {
            return {width: `${this.size}px`, height: `${this.size}px`, 'font-size': `${this.size / 2}px`}
        }
    },
    watch: {
        word() {
            if (!this.isTwoLetters) return
            const words = this.word.split(' ')
            this.secondWord = words.length > 1 ? words[1] : ''
        }
    }
}
</script>
<style>
.first-letter {
    /* margin: 0 10px; */
    letter-spacing: 1px;
}
</style>