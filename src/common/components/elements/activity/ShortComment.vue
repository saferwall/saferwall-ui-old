<template>
<div class="short-comment space-x-8">
    <div class="cmt-info">
        <p class="cmt-content">
            {{content}}
        </p>
        <p class="cmt-date">
            {{getCommentedDate}}
        </p>
    </div>
    <div class="cmt-file w-full">
        <router-link :to="`file/${hash}/summary`">
            <hash-input :hash="hash" />
        </router-link>
    </div>
</div>
</template>

<script>
import HashInput from '../HashInput.vue';
export default {
    components: {
        HashInput,
    },
    props: {
        id: {
            type: String
        },
        hash : {
            type: String
        },
        content: {
            type: String
        },
        followed: {
            default: false,
            type: Boolean
        },
        created_at: {
            type: [Date, String]
        }
    },
    computed : {
        getCommentedDate(){
            return new Date(this.created_at).toDateString();
        } 
    }
}
</script>

<style lang="scss" scoped>
.short-comment {
    @apply flex flex-wrap items-center justify-between p-6 m-4 space-y-6;

    .cmt-info{
        @apply flex flex-col space-y-2;
    }

    .cmt-date{
        @apply text-gray-medium;
    }
    .cmt-file{
        @apply cursor-pointer mx-0 py-1;
        input{
            @apply cursor-pointer;
        }
    }

    .btn-cmt{
        @apply p-2;
    }
}
</style>
