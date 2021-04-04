<template>
    <router-link :to="link" class="btn" :class="size">
        <slot />
    </router-link>
</template>

<script>
    export default {
        props : {
            link : {
                default : '/',
                type: String
            },
            size : {
                default: 'md',
                type: String,
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn{
    @apply flex text-primary w-max rounded-md items-center;
    border: 2px solid $border-color;
    
    &:hover{
        @apply bg-primary bg-opacity-10;
        border-color: transparent;
    }
    &.active{
        @apply bg-primary text-white font-bold;
        border-color: transparent;
    }

    
    /** Sizes */
    &.md{
        @apply py-2 px-4;
    }

    &.lg{
        @apply py-3 px-5;
    }

    &.xl{
        @apply py-3 px-6;
    }

}
</style>