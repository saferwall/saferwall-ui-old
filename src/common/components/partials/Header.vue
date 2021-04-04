<template>
  <nav class="navbar z-40">
    <div class="nav-content">
      <slot />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  @apply bg-white fixed w-full top-0 h-navbar;
  border-bottom: 1px solid $border-color;

  .nav-content {
    @apply mx-auto flex h-full flex-wrap;
  }
}
</style>
