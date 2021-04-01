<template>
   <card-tab :active="active" class="tab-likes" >
        <div v-if="likes.length == 0" class="empty-tab"><h2>You haven't liked anything yet <br> for the moment</h2></div>
        <template v-else>
            <like-box v-for="like in likes" :key="like.id" v-bind="like" />
        </template>
    </card-tab>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import LikeBox from './LikeBox.vue'

export default {
    components: { 
        CardTab,
        LikeBox,
    },
    props : {
        likes : {
            default : [],
        },
        active : {
            type: Boolean,
            default : true,
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-likes {
    @apply divide-y divide-gray divide-opacity-10;
}
</style>