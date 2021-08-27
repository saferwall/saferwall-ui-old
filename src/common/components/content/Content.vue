<template>
  <div class="app-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style scoped lang="scss">
.app-content {
  @apply mt-20 md:w-9/12 lg:w-8/12 justify-start mx-auto flex flex-grow flex-col;
}
</style>