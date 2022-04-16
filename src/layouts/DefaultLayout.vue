<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import Navbar from "@/components/nav/Navbar.vue";
</script>

<template>
  <base-layout>
    <template v-slot:navbar>
      <Navbar />
    </template>
    <template v-slot:main>
      <Content class="content">
        <slot />
      </Content>
    </template>
  </base-layout>
</template>