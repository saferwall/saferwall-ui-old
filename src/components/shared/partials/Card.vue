<template>
    <div class="card">
        <slot />
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.card{
    @apply bg-light py-6 px-6 rounded-md shadow-sm content-center items-center;
}
</style>