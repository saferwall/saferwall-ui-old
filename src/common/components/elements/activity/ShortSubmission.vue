<template>
    <div class="like-box">
        <div class="row-hash">
            <hash-input :hash="sha256" class="input-hash" />
            <btn-like :liked="liked" @click="toggleLike" />
        </div>
        <file-meta :classification="classification" :scan="getScore" :filename="filename" />
    </div>
</template>

<script>
import { fileActions } from '@/state/helpers'

import HashInput from '@/common/components/elements/HashInput.vue'
import FileMeta from '../FileMeta.vue'
import BtnLike from '../button/BtnLike.vue'

export default {
    components: {
        HashInput,
        FileMeta,
        BtnLike,
    },
    props: {
        id: {
            type: String
        },
        sha256: {
            type: String
        },
        classification: {
            type: Object
        },
        filename: {
            type: String
        },
        multiav: {
            type: String
        },
        liked: {
            type: Boolean
        }
    },
    computed:{
        getScore(){
            let s = (this.multiav || "").split('/');
            return {
                value: s[0],
                total: s[1]
            }
        }
    },
    methods : {
        ...fileActions,
        toggleLike(){
            if (this.liked) 
                return this.doUnLike({ id: this.sha256 }) 
            this.doLike({ id: this.sha256 });
        }
    }
}
</script>

<style lang="scss" scoped>
.like-box {
    @apply px-8 py-8;

    .row-hash{
        @apply flex items-center ;

        .input-hash{
            @apply flex-grow;
        }

    }
}
</style>
