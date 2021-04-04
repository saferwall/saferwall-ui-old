<template>
<div>
    <Header>
        <Navbar />
    </Header>
    <Content class="content" :title="this.$route.name">
        <slot />
    </Content>
    <Footer />
</div>
</template>

<script>
import Header from "@/common/components/partials/Header.vue"
import Navbar from '@/common/components/partials/Navbar.vue'
import Footer from "@/common/components/partials/Footer.vue"
import Content from "@/common/components/content/HeaderContent.vue"

export default {
    components: {
        Header,
        Footer,
        Content,
        Navbar
    },
    props: {
        title: String
    }
}
</script>
