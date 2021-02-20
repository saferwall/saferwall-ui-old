<template>
    <div class="gallery flex flex-wrap">
        <div v-for="(image, index) in images" v-bind:key="image" class="item" @click="openPreview(image.source)">
            <div class="image" :style="{ backgroundImage: `url(${image.source}?i=${index})` }"></div>
        </div>
        <preview :source="gallerySource" :modalOpen="modalOpen"/>
    </div>
</template>

<script>
import Preview from '../elements/gallery/Preview.vue';

export default {
  components: { Preview },
    name: 'Gallery',
    props: {
        images : Array,
    },
    data(){
        return {
            gallerySource : null,
            modalOpen: false
        }
    },
    methods:{
        openPreview(source){
            this.gallerySource = source;
            this.modalOpen = true;
        }
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