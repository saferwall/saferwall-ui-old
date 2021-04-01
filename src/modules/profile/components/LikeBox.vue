<template>
    <div class="like-box">
        <div class="row-hash">
            <hash-input :hash="hash" class="input-hash" />
            <button class="btn-like">
                <svg xmlns="http://www.w3.org/2000/svg" width="16.791" height="15.005" viewBox="0 0 16.791 15.005">
                    <path d="M8.1,14.4a.949.949,0,0,1-.626-.235c-.654-.572-1.285-1.109-1.841-1.583l0,0A34.241,34.241,0,0,1,1.606,8.81,6.026,6.026,0,0,1,0,4.866,5.06,5.06,0,0,1,1.284,1.41,4.354,4.354,0,0,1,4.523,0,4.072,4.072,0,0,1,7.067.878,5.2,5.2,0,0,1,8.1,1.952,5.205,5.205,0,0,1,9.124.878,4.072,4.072,0,0,1,11.668,0a4.354,4.354,0,0,1,3.239,1.41,5.06,5.06,0,0,1,1.284,3.456A6.026,6.026,0,0,1,14.585,8.81a34.233,34.233,0,0,1-4.019,3.773c-.557.475-1.189,1.013-1.844,1.586A.95.95,0,0,1,8.1,14.4Zm-6.114-6.5C1,7.909,1.6,4.154.948,4.866s0-1.091,0,0a5.071,5.071,0,0,0,1.388,3.34,33.694,33.694,0,0,0,3.9,3.656l0,0c.558.476,1.192,1.016,1.85,1.592.663-.577,1.3-1.118,1.856-1.594a33.7,33.7,0,0,0,3.9-3.656c.96-1.158-.9,2.35-.9,1.2,0-1.091-1.723,2.706-2.39,1.983s.982-8.308,0-8.308c0,0,.972-2.729.543,0S9.95,11.864,9.95,11.864A12.02,12.02,0,0,0,8.1,13.456c-.109.183-1.642-1.594-1.855-1.594A10.783,10.783,0,0,1,4.523,9.99c-.212-.356-.083.4-.6,0C3.336,9.539,2.7,7.909,1.982,7.909Zm.354,0" transform="translate(0.3 0.3)" stroke-width="0.6" />
                </svg>

                Unlik
            </button>
        </div>
        <file-meta :classification="classification" :scan="scan" :filename="filename" />
    </div>
</template>

<script>
import HashInput from '@/common/components/elements/HashInput.vue'
import FileMeta from '../../../common/components/elements/FileMeta.vue'
export default {
    components: {
        HashInput,
        FileMeta,
    },
    props: {
        id: {
            type: String
        },
        hash: {
            type: String
        },
        classification: {
            type: String
        },
        filename: {
            type: String
        },
        scan: {
            type: Object
        }
    },
}
</script>

<style lang="scss" scoped>
.like-box {
    @apply px-8 py-8;

    .row-hash{
        @apply flex items-center;
        .input-hash{
            @apply flex-grow;
        }

    }
    .btn-like{
        @apply m-1 p-4 flex items-center fill-primary;

        svg{
            @apply mr-2;
        }
    }
}
</style>
