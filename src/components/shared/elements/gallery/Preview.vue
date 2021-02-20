<template>
    <div class="gallery-preview" v-if="modalOpen">
        <div class="overlay" @click="closeModal"></div>
        <div class="modal">
            <img :src="source" />
        </div>
    </div>
</template>

<script>
import { toRefs } from 'vue';
export default {
    name: 'Preview',
    props: {
        source : {
            type: String
        },
        title : {
            type: String,
            default : ''
        }
    },
    setup(props){
        const  { modalOpen } = toRefs(props)

        const closeModal = ()=>{
            modalOpen.value = false;
        }
            console.log('modalOpen:', modalOpen);

        return { modalOpen, closeModal }
    }
}
</script>

<style lang="scss" scoped>
.gallery-preview{
    .overlay {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 101;
        cursor: pointer;
    }

    .modal{
        z-index: 102;
    }
}
</style>