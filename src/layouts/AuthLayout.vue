<template>
<div>
    <Header>
        <div class="logo">
            <logo />
        </div>
    </Header>
    <Content class="main-content">
        <slot />
    </Content>
</div>
</template>

<script>
import Header from "@/components/partials/Header.vue"
import Logo from '@/components/shared/elements/Logo.vue'
import Content from "@/components/partials/Content.vue"

export default {
    components: {
        Header,
        Content,
        Logo
    },
}
</script>

<style lang="scss" scoped>
.logo {
    @apply w-full md:w-sidebar md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
    height: 100%;
}
.main-content{
    @apply flex items-center justify-center py-10;
}
</style>

<style lang="scss" >
.form-input {
  @apply w-full px-6 py-4 border rounded-md border-gray-light placeholder-gray-medium text-lg;
}
.form-group {
  @apply w-full my-4 flex flex-wrap items-center;
}
.btn-submit{
    @apply w-full px-6 py-5 bg-primary rounded-md text-light font-bold text-lg;
}
.auth-card{
    @apply mt-4 flex min-w-full md:min-w-6/7 lg:min-w-5/7 xl:min-w-3/7 bg-light md:rounded-2xl pt-20 pb-8 px-24 shadow-sm;
}
</style>

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
