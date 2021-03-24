<template>
<div class="activities my-9">
    <div v-if="latestActivities"  class="content">
        <template v-for="activity in getActivities" v-bind:key="activity.hash">
            <activity-block :file="activity.file" :author="activity.author" :avatar="activity.author.avatar" :follow="activity.follow"></activity-block>
        </template>
    </div>
    <div v-else class="header py-3 mt-3" >
        <p class="text-sm text-gray mt-2" >No Activities available currently</p>
    </div>
    <div v-if="more" class="more">
        <show-more v-on:click="$emit('showMore', $event.target)">
            <p>Show more activities</p>
        </show-more>
    </div>
</div>
</template>

<script>
import ShowMore from './elements/button/ShowMore.vue';
import ActivityBlock from './elements/ActivityBlock.vue';

export default {
    components: {
        ActivityBlock,
        ShowMore
    },
    props : {
        more : {
            type : Boolean,
            default: true,
        },
        activities : {
            type: Array,
            default : ()=>{
                return []
            }
        }
    },
    computed: {
        latestActivities() {
            return this.activities && this.activities.length || 0;
        },
        getActivities() {
            return this.activities;
        }
    }
}
</script>
