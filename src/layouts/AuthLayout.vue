<template >
  <base-layout>
    <template v-slot:navbar>
      <div class="logo">
        <logo />
      </div>
    </template>
    <template v-slot:main>
      <Content class="main-content">
        <slot />
      </Content>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import Logo from "@/common/components/elements/Logo.vue";
import Content from "@/common/components/content/Content.vue";

export default {
  components: {
    BaseLayout,
    Content,
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  @apply w-full md:w-sidebar md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
  height: 100%;
}
.main-content {
  @apply flex items-center justify-center py-10;
}
</style>