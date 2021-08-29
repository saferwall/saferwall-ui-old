<template>
  <div class="showmore">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.showmore {
  @apply w-full cursor-pointer py-6 px-0 text-center bg-light md:rounded-md text-primary font-bold shadow;
}
</style>