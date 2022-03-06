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
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  @apply bg-light p-4 xl:p-6 md:rounded-lg shadow-sm content-center items-center;

  .title {
    @apply text-xl xl:text-2xl mb-4;
  }
}
</style>