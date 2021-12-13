<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AppLayoutDefault from "@/layouts/Default";

import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const layout = shallowRef(AppLayoutDefault);
    const route = useRoute();

    watch(
      () => route.meta,
      async (meta) => {
        const pageTitle =
          (meta.page && meta.page.title) || meta.title || meta.name;
        // tab title
        document.title = (pageTitle ? pageTitle + " - " : "") + "Saferwall";

        // layout
        try {
          const component = await import(`@/layouts/${meta.layout}.vue`);
          layout.value = component?.default || AppLayoutDefault;
        } catch (e) {
          layout.value = AppLayoutDefault;
        }

        return { layout };
      },
      { immediate: true }
    );
    return { layout };
  },
};
</script>