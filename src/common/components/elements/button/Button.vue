<template>
    <router-link to="/" class="btn">
        <slot />
    </router-link>
</template>

<script>
    export default {
        name : 'Button'
    }
</script>

<style lang="scss" scoped>
.btn{
    @apply flex py-3 px-8 text-primary w-max rounded-md items-center;
    border: 2px solid $border-color;

    &:hover{
        @apply bg-primary bg-opacity-10;
        border-color: transparent;
    }
    &.active{
        @apply bg-primary text-white font-bold;
        border-color: transparent;
    }
}
</style>