<template>
  <nav class="navbar">
    <slot />
  </nav>
</template>


<style lang="scss">
nav.navbar {
  @apply flex items-center h-[4.3rem] w-full border-b border-gray-100;

  & > div:first-child {
    @apply border-r border-gray-100;
  }
}
</style>