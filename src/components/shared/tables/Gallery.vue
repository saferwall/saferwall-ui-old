<template>
    <div class="gallery flex flex-wrap">
        <div v-for="(image, index) in images" v-bind:key="image" class="item">
            <div class="image" :style="{ backgroundImage: `url(${image.source}?i=${index})` }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Gallery',
        props: {
            images : Array
        }
    }
</script>

<style lang="scss" scoped>
.gallery {
    .image {
        @apply w-80 h-60  rounded-md m-4;
        background-color : #EBEBEB;

        background-image : src("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ug8AAi0BVVnWL7QAAAAASUVORK5CYII=");
        background-size: cover;
        background-position: center;
    }
}
</style>