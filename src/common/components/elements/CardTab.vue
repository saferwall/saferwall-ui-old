<template>
    <div v-if="active" class="tab-content">
        <slot />
    </div>
</template>

<script>
    export default {
        props : {
            active : {
                type: Boolean,
                default : false
            }
        }
    }
</script>

<style lang="scss" scoped>
.tab-content{
    @apply w-full;
}
</style>