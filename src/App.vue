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
</style>