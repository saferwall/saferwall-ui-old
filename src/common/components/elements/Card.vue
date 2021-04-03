<template>
    <div class="card">
        <h2 class="title" v-if="title">
            {{ title }}
        </h2>
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.card{
    @apply bg-light py-6 px-6 md:rounded-lg shadow-sm content-center items-center;


    .title{
        @apply text-3xl m-4;
    }
}
</style>