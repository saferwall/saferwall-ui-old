<template>
    <div class="profile">
        <profile-box />
        <card-tabs :tabs="profileTabs"  class="profile-stats" v-on:switchTab="switchTab($event)">
            <tab-likes :active="activeTab == 'likes'" :likes="dataTabs.likes">
                <div class="empty-tab"><h2>You haven't liked anything yet <br> for the moment</h2></div>
            </tab-likes>
            <card-tab :active="activeTab == 'submissions'" class="tab-submissions" >
                <div class="empty-tab"><h2>You have not made any submissions <br> for the moment</h2></div>
            </card-tab>
            <card-tab :active="activeTab == 'followers'" class="tab-followers" >
                <div class="empty-tab"><h2>You have no followers <br> for the moment</h2></div>
            </card-tab>
            <card-tab :active="activeTab == 'following'" class="tab-following" >
                <div class="empty-tab"><h2>You are not subscribed to anyone<br> for the moment</h2></div>
            </card-tab>
            <card-tab :active="activeTab == 'comments'" class="tab-comments" >
                <div class="empty-tab"><h2>You have not commented on any files<br> for the moment</h2></div>
            </card-tab>
        </card-tabs>
    </div>
</template>

<script>
import { like } from '@/common/data/data.test'; 

import CardTab from '@/common/components/elements/CardTab.vue'
import CardTabs from '@/common/components/elements/CardTabs.vue'
import ProfileBox from '../components/ProfileBox.vue'
import TabLikes from '../components/TabLikes.vue'

export default {
    components: { 
        ProfileBox,
        CardTabs,
        CardTab,
        TabLikes,
    },
    data(){
        return {
            profileTabs: [
                { name:'likes', title:'Like' },
                { name:'submissions', title:'Submissions' },
                { name:'followers', title:'Followers' },
                { name:'following', title:'Following' },
                { name:'comments', title:'Comments' },
            ],
            dataTabs : {
                likes : like({ examples : 10 }) 
            },
            activeTab : null
        }
    },
    methods : {
        switchTab(tab){
            console.log(tab);
            this.activeTab = tab;
        }
    },
    created(){
        this.activeTab = this.profileTabs[0].name;
    }
}
</script>


<style lang="scss" scoped>
.profile{
    @apply space-y-4;
}
</style>


<style lang="scss">
.profile-stats{
    .empty-tab{
        @apply flex justify-center items-center text-center py-8 mt-4 text-gray text-sm;
    }
}
</style>