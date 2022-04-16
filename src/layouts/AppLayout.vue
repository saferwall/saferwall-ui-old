<script lang="ts" setup>
import AppLayoutDefault from "./DefaultLayout.vue";

import { markRaw, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layout = ref();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component =
        metaLayout && (await import(/* @vite-ignore */ `./${metaLayout}.vue`));
      layout.value = markRaw(component?.default || AppLayoutDefault);
    } catch (e) {
      layout.value = markRaw(AppLayoutDefault);
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout">
    <slot />
  </component>
</template>