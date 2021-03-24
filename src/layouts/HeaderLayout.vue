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
import Header from "@/components/partials/Header.vue"
import Navbar from '../components/partials/Navbar.vue'
import Footer from "@/components/partials/Footer.vue"
import Content from "@/components/partials/page/HeaderContent.vue"

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
