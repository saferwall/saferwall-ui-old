<template>
<div class="short-follower space-x-8">
    <div class="fuser-avatar">
        <avatar />
    </div>
    <div class="fuser-info flex-grow">
        <h1 class="fuser-username">
            {{username}}
        </h1>
        <p class="fuser-resgistred">
            Member since {{getRegistredTimeAgo}}
        </p>
    </div>
    <div class="actions">
        <btn-follow :followed="followed"/>
    </div>
</div>
</template>

<script>
import { timeAgo } from '@/common/functions';
import Avatar from "../Avatar.vue"
import BtnFollow from '../button/BtnFollow.vue';

export default {
    components: {
        Avatar,
        BtnFollow,
    },
    props: {
        id: {
            type: String
        },
        username: {
            type: String
        },
        followed :{
            default: false,
            type: Boolean
        },
        member_since : {
            type: [Date, String]
        }
    },
    computed : {
        getRegistredTimeAgo(){
            return timeAgo(this.member_since);
        } 
    }
}
</script>

<style lang="scss" scoped>
.short-follower {
    @apply flex flex-wrap items-center justify-between p-6 m-4;
    
    .btn-fuser{
        @apply p-2;
    }
}
</style>
