<template>
    <div class="profile">
        <profile-box />
        <card-tabs :tabs="profileTabs"  class="profile-stats" v-on:switchTab="switchTab($event)">
            <card-tab :active="activeTab == 'likes'" class="tab-likes" >
                <h2>Likes here</h2>
            </card-tab>
            <card-tab :active="activeTab == 'submissions'" class="tab-submissions" >
                <h2>Submissions here</h2>
            </card-tab>
            <card-tab :active="activeTab == 'followers'" class="tab-followers" >
                <h2>Followers here</h2>
            </card-tab>
            <card-tab :active="activeTab == 'following'" class="tab-following" >
                <h2>Following here</h2>
            </card-tab>
            <card-tab :active="activeTab == 'comments'" class="tab-comments" >
                <h2>Comments here</h2>
            </card-tab>
        </card-tabs>
    </div>
</template>

<script>
import CardTab from '@/common/components/elements/CardTab.vue'
import CardTabs from '@/common/components/elements/CardTabs.vue'
import ProfileBox from '../components/Profile.vue'
export default {
    components: { 
        ProfileBox,
        CardTabs,
        CardTab,
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


.profile-stats{

}
</style>