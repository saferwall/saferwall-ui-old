<template >
  <base-layout>
    <template v-slot:navbar>
      <Navbar>
        <div class="logo">
          <logo />
        </div>
      </Navbar>
    </template>
    <template v-slot:main>
      <Content>
        <slot />
      </Content>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import Logo from "@/common/components/elements/Logo.vue";
import Content from "@/common/components/content/Content.vue";
import Navbar from "@/common/components/partials/Navbar.vue";

export default {
  components: {
    BaseLayout,
    Content,
    Navbar,
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  @apply flex w-full md:w-sidebar px-5  justify-center text-black font-extrabold;
}
</style>