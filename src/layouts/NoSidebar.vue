<template>
  <div>
    <Header />
    <Content>
      <slot />
    </Content>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/partials/Header"
import Footer from "@/components/partials/Footer"
import Content from "@/components/partials/Content"

export default {
  name : 'NoSidebar',
  components: {Header , Footer , Content},

  setup(){
    console.log('Setup Layout Authentified');
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition-property: transform;
  transition-duration: 0.25s;
}
.slideLeft-enter,
.slideLeft-leave-active {
  transform: translateX(-100%);
}
</style>