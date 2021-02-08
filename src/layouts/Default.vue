<template>
  <NoSidebar>
    <slot />
  </NoSidebar>
</template>
<script>
import NoSidebar from './NoSidebar.vue'

export default {
  name : 'Default',
  components: {NoSidebar},
}
</script>