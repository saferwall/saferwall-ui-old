<template>
  <div>
    <Header>
      <Navbar />
    </Header>
    <Sidebar class="sidebar" v-show="sidebarActive" />
    <Content class="content" :class="sidebarActive ? 'sactive':''" >
      <slot />
    </Content>
    <Footer :class="sidebarActive ? 'sactive':''" />
  </div>
</template>

<script>
import Header from "@/common/components/partials/Header.vue"
import Navbar from '../common/components/partials/Navbar.vue'
import Sidebar from '@/common/components/partials/Sidebar.vue'
import Footer from "@/common/components/partials/Footer.vue"
import Content from "@/common/components/content/PageContent.vue"

export default {
  components: {Header , Footer , Content, Sidebar, Navbar},

  setup(props){
    const sidebarActive = props.sidebarActive || true;

    return { sidebarActive }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  @apply w-sidebar;
}

.sactive{
  @apply md:w-scontent md:m-0 md:ml-auto md:px-16;
}
</style>