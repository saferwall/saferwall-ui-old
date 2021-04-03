<template>
    <div>
        User : {{username}}
    </div>
</template>

<script>
    export default {
        props : {
            username : {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>