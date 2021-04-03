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
        <btn class="fuser-btn">
            Follow
        </btn>
    </div>
</div>
</template>

<script>
import { timeAgo } from '@/common/functions';
import Avatar from "../Avatar.vue"
import Btn from '../button/Button.vue'

export default {
    components: {
        Avatar,
        Btn,
    },
    props: {
        id: {
            type: String
        },
        username: {
            type: String
        },
        member_since : {
            type: String
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
