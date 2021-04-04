<template>
    <div class="si-group flex flex-col w-full space-y-2">
        <label :for="id" class="font-bold ">{{ title }}</label>
        <slot />
    </div>
</template>

<script>
export default {
    props:{
        id: {
            type: String
        },
        title: {
            type: String
        }
    }
}
</script>