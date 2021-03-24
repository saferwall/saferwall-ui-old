<template>
    <div class="gallery flex flex-wrap">
        <div v-for="(image) in images" v-bind:key="image" class="item" >
            <div class="image" @click="openPreview(image.source)" :style="{ backgroundImage: `url(${image.source})` }"></div>
        </div>
        <preview :source="gallerySource" v-on:modalClose="modalOpen = false" v-if="modalOpened"/>
    </div>
</template>

<script>
import Preview from '@/common/components/elements/gallery/Preview.vue';

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
    },
    computed: {
        modalOpened(state){
            return state.modalOpen;
        }
    }
}
</script>

<style lang="scss" scoped>
.gallery {
    .image {
        @apply w-80 h-60  rounded-md m-4 cursor-pointer;
        background-color : #EBEBEB;

        background-image : src("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ug8AAi0BVVnWL7QAAAAASUVORK5CYII=");
        background-size: cover;
        background-position: center;
    }
}
</style>