<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
export default {
  name: "App",
};
</script>


<style lang="scss">
body,
html {
  background: $background-color;
  min-height: 100%;
}

body * {
  max-width: 100%;
}

#app {
  @apply min-h-screen flex flex-col justify-start;
}
</style>