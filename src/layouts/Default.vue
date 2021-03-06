<template>
<NoSidebar>
    <slot />
</NoSidebar>
</template>

<script>
import NoSidebar from './NoSidebar.vue'

export default {
    components: {
        NoSidebar
    },
}
</script>
