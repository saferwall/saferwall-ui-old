<template>
<div class="latestactv my-9">
    <list-activities :activities="activities" :more="true" />
</div>
</template>

<script>
import { activity } from '@/common/data/data.test';
import ListActivities from './ListActivities.vue';

export default {
    components: {
        ListActivities
    },
    data() {
        return {
            activities: activity({
                examples : 10
            })
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
