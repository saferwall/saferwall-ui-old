<template>
    <div class="latestactv my-9">
        <div class="header py-3 mt-3">
            <h2 class="text-xl font-bold">Latest Activities</h2>
            <p class="text-sm text-gray mt-2">No Activities available currently</p>
        </div>
        <div class="content">
            <activity-block></activity-block>
            <activity-block></activity-block>
            <activity-block></activity-block>
        </div>
        <div class="more">
            <show-more title="Show more activities" @click="alert('show me more please')" />
        </div>
    </div>
</template>

<script>
import ShowMore from './partials/ShowMore.vue';
import ActivityBlock from './partials/ActivityBlock.vue';

export default {
    name:'LatestActivities',
    components: {ActivityBlock, ShowMore}
}
</script>

<style lang="scss" scoped>

</style>