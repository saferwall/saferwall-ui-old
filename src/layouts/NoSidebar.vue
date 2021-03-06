<template>
<div>
    <Header>
      <Navbar />
    </Header>
    <Content>
        <slot />
    </Content>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/partials/Header.vue"
import Navbar from "@/components/partials/Navbar.vue"
import Footer from "@/components/partials/Footer.vue"
import Content from "@/components/partials/Content.vue"

export default {
    components: {
        Header,
        Navbar,
        Footer,
        Content
    },
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
