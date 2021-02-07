<template>
    <div class="app-content h-full">
        <slot />
    </div>
</template>

<script>
export default {
    name : 'Content'
}
</script>

<style scoped lang="scss">
.app-content {
    @apply mt-20; 
}
</style>