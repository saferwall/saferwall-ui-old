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
import Header from "@/common/components/partials/Header.vue"
import Navbar from "@/common/components/partials/Navbar.vue"
import Footer from "@/common/components/partials/Footer.vue"
import Content from "@/common/components/content/Content.vue"

export default {
    components: {
        Header,
        Navbar,
        Footer,
        Content
    },
}
</script>