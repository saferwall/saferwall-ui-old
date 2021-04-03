<template>
   <card-tab :active="active" class="tab-follow" >
        <div v-if="rows.length == 0" class="empty-tab"><h2><slot name="emptymessage" /></h2></div>
        <template v-else>
            <short-comment v-for="row in rows" :key="row.id" v-bind="row" />
        </template>
    </card-tab>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import ShortComment from '@/common/components/elements/activity/ShortComment.vue'

export default {
    components: { 
        CardTab,
        ShortComment,
    },
    props : {
        rows : {
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
.tab-follow {
    @apply divide-y divide-gray divide-opacity-10;
}
</style>