<template>
    <div class="latestactv my-9">
        <div class="header py-3 mt-3">
            <h2 class="text-xl font-bold">Latest Activities</h2>
            <p class="text-sm text-gray mt-2" v-show="!latestActivities">No Activities available currently</p>
        </div>
        <div class="content">
            <template  v-for="activity in getActivities" v-bind:key="activity.hash" >
                <activity-block :file="activity.file" :author="activity.author" :avatar="activity.author.avatar" :follow="activity.follow"></activity-block>
            </template>
        </div>
        <div class="more">
            <show-more ><p>Show more activities</p></show-more>
        </div>
    </div>
</template>

<script>
import ShowMore from './partials/button/ShowMore.vue';
import ActivityBlock from './partials/ActivityBlock.vue';

export default {
    name:'LatestActivities',
    components: {ActivityBlock, ShowMore},
    data(){
        return {
            activities: [
                {hash:'85518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',file:{name:'virus.exe',classification:{name:'Malware',color:'danger',icon:'malware'},scan:{value:12,total:12},submitted_at:Date.now()-20000},author:{name:'Yassin',joined_at:Date.now()-50000,avatar:'https://i.pravatar.cc/160?i=5',},follow:false,tags:[{title:'virus',link:'#'},{title:'trojan',link:'#'},]},
                {hash:'55518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',file:{name:'google.exe',classification:{name:'No specific threat',color:'success',icon:'safegreen'},scan:{value:12,total:12},submitted_at:Date.now()-20000},author:{name:'Ali',joined_at:Date.now()-50000,avatar:'https://i.pravatar.cc/160?i=6',},follow:false,tags:[{title:'virus',link:'#'},{title:'trojan',link:'#'},]},
                {hash:'75518d00317a597dc83ee3fb78743538b9444664273bd592df16603d2c3e4c28',file:{name:'redsoftware.exe',classification:{name:'Souspicious',color:'warning',icon:'souspicious'},scan:{value:12,total:12},submitted_at:Date.now()-20000},author:{name:'Remy',joined_at:Date.now()-50000,avatar:'https://i.pravatar.cc/160?i=7',},follow:false,tags:[{title:'virus',link:'#'},{title:'trojan',link:'#'},]},
            ]
        }
    },
    computed: {
        latestActivities(){
            return this.activities?.length > 0;
        },
        getActivities(){
            return this.activities;
        }
    }
}
</script>
