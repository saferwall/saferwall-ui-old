<template>
   <card-tab :active="active" class="tab-submissions" >
        <div v-if="rows.length == 0" class="empty-tab"><h2><slot name="emptymessage" /></h2></div>
        <template v-else>
            <short-activity v-for="row in rows" :key="row.id" v-bind="row" />
        </template>
    </card-tab>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import ShortActivity from '@/common/components/elements/activity/ShortActivity.vue'

export default {
    components: { 
        CardTab,
        ShortActivity,
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
.tab-submissions {
    @apply divide-y divide-gray divide-opacity-10;
}
</style>