<template>
  <div class="card">
    <h2 class="title" v-if="title">{{ title }}</h2>
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
  border-radius: 10px;
  margin-bottom: 20px;

  .title {
    @apply text-xl xl:text-2xl mb-4;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
}
</style>