<script lang="ts" setup>
import Header from "@/components/partials/Header.vue";
</script>

<template>
  <slot name="header">
    <Header>
      <slot name="navbar" />
    </Header>
  </slot>

  <slot name="main" />

  <slot name="footer">
    <Footer />
  </slot>
</template>