<template>
  <a
    v-if="link"
    :href="link"
    class="btn"
    :class="`size-${size}`"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <button v-else class="btn" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    link: {
      default: false,
      type: [Boolean, String],
    },
    size: {
      default: "md",
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @apply flex flex-row text-primary w-max rounded-md items-center py-2 px-4 cursor-pointer focus:outline-none;
  border: 2px solid $border-color;

  &:hover {
    @apply bg-primary bg-opacity-10;
    border-color: transparent;
  }
  &.active {
    @apply bg-primary text-white font-bold;
    border-color: transparent;
  }

  /** Sizes */
  &.size-md {
    @apply py-2 px-4;
  }
  &.size-lg {
    @apply py-3 px-5;
  }
  &.size-xl {
    @apply py-3 px-6;
  }
}
</style>