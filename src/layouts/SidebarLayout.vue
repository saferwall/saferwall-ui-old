<template>
  <main>
    <base-layout>
      <template v-slot:navbar>
        <Navbar />
      </template>
      <template v-slot:sidebar>
        <Sidebar class="sidebar" v-show="sidebarActive" />
      </template>
      <template v-slot:main>
        <div class="flex flex-col w-full app-content">
          <Content class="content" :title="getCurrentTitle" :class="sidebarActive ? 'sactive' : ''">
            <slot />
          </Content>
          <div class="footer-sidebar">
            <Footer />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div></div>
      </template>
    </base-layout>
  </main>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

import Navbar from "@/common/components/partials/Navbar.vue";
import Sidebar from "@/common/components/partials/Sidebar.vue";
import Content from "@/common/components/content/FileContent.vue";
import Footer from "@/common/components/partials/Footer.vue";

export default {
  components: {
    BaseLayout,
    Content,
    Sidebar,
    Navbar,
    Footer,
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
main {
  @apply flex;

  .content {
    @apply mt-20 p-4 px-20 xl:px-20;
    margin-top: 10rem;
  }

  .app-content {
    @apply mt-0;
  }
}
</style>

<style lang="scss" scoped>
.footer-sidebar {
  @apply lg:py-4 lg:px-8 w-full;

  > * {
    @apply lg:shadow lg:rounded-md;
  }

  // .content {
  //   width: 100% !important;

  //   > div {
  //     @apply flex px-8;
  //   }
  // }
}
</style>
