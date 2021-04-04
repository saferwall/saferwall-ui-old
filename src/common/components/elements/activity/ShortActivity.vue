<template>
    <div class="like-box">
        <div class="row-hash">
            <hash-input :hash="hash" class="input-hash" />
            <btn-like :liked="liked" />
        </div>
        <file-meta :classification="classification" :scan="scan" :filename="filename" />
    </div>
</template>

<script>
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
        hash: {
            type: String
        },
        classification: {
            type: Object
        },
        filename: {
            type: String
        },
        scan: {
            type: Object
        },
        liked: {
            type: Boolean
        }
    },
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
