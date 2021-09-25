<template>
  <base-layout>
    <template v-slot:navbar>
      <Navbar />
    </template>
    <template v-slot:main>
      <Sidebar class="sidebar" v-show="sidebarActive" />
      <Content
        class="content"
        :title="getCurrentTitle"
        :class="sidebarActive ? 'sactive' : ''"
      >
        <slot />
      </Content>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

import Navbar from "@/common/components/partials/Navbar.vue";
import Sidebar from "@/common/components/partials/Sidebar.vue";
import Content from "@/common/components/content/PageContent.vue";

export default {
  components: {
    BaseLayout,
    Content,
    Sidebar,
    Navbar,
  },
  data: () => ({
    title: "Summary",
  }),
  computed: {
    getCurrentTitle() {
      return this.title;
    },
  },
  created() {
    this.title = this.$route.meta.title;
  },
  setup(props) {
    const sidebarActive = props.sidebarActive || true;

    return {
      sidebarActive,
    };
  },
  watch: {
    $route(to) {
      this.title = to.meta.title || this.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply w-sidebar;
}

.sactive {
  @apply md:w-scontent md:m-0 md:ml-auto md:px-16;
}
</style>
