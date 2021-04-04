<template>
    <div v-if="display" class="dropmenu" >
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props : {
        display: {
            default: true,
            type: Boolean,
        }
    }
}
</script>

<style lang="scss" scoped>
.dropmenu{
    @apply origin-top-right absolute right-1 mt-4 w-60 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full text-left ;
    .content{
        @apply px-2 py-2;
    }
}
</style>