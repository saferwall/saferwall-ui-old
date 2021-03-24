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
import Header from "@/components/partials/Header.vue"
import Navbar from '../components/partials/Navbar.vue'
import Sidebar from '@/components/partials/Sidebar.vue'
import Footer from "@/components/partials/Footer.vue"
import Content from "@/components/partials/page/PageContent.vue"

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