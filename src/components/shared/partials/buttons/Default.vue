<template>
    <a href="/" class="btn">
        <slot />
    </a>
</template>

<script>
    export default {
        name : 'Default'
    }
</script>

<style lang="scss" scoped>
.btn{
    @apply flex py-3 px-8 text-primary w-max mx-auto mt-12 rounded ;
    border: 2px solid $border-color;

    &:hover{
        @apply bg-primary bg-opacity-10;
        border-color: transparent;
    }
}
</style>