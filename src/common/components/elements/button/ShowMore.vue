<template>
    <div class="showmore w-full cursor-pointer py-6 px-0 text-center h-30 bg-light rounded-md text-primary font-bold shadow">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'ShowMore'
    }
</script>


<style lang="scss" scoped>
.showmore{

}
</style>