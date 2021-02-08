<template>
    <div class="showmore w-full cursor-pointer py-6 px-0 text-center h-30 bg-light rounded-md text-secondary font-bold shadow">
        <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: 'ShowMore',
        props: {
            title : {
                default: 'Show more',
                type: String
            }
        }
    }
</script>


<style lang="scss" scoped>
.showmore{

}
</style>