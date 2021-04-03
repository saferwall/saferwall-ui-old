<template>
    <btn :class="followed ? 'btn-active':''">
        {{ followed ?  'UnFollow' : 'Follow' }}
    </btn>
</template>

<script>
import Btn from './Btn.vue'
export default {
    components: {
        Btn
    },
    props : {
        followed: {
            default: false,
            type: Boolean
        }
    }
}
</script>

<style scoped>
.btn-active{
    @apply bg-primary bg-opacity-10 border-none font-medium;
}
</style>