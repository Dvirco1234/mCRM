<template>
    <div class="first-letter flex-center" :style="{ 'background-color': getColor }">{{ $filters.firstLetter(word) }}{{ $filters.firstLetter(secondWord) }}</div>
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
        }
    },
}
</script>
<style>
.first-letter {
    margin: 0 10px;
    letter-spacing: 1px;
}
</style>