<template>
<div class="profile">
    <profile-box />
    <card-tabs :tabs="profileTabs" class="profile-stats" v-on:switchTab="switchTab($event)">
        <tab-type-submission :active="activeTab == 'likes'" :rows="dataTabs.likes">
            <template v-slot:emptymessage>You haven't liked anything yet <br> for the moment</template>
        </tab-type-submission>

        <tab-type-submission :active="activeTab == 'submissions'" :rows="dataTabs.submissions">
            <template v-slot:emptymessage>You have not made any submissions <br> for the moment</template>
        </tab-type-submission>
        
        <tab-type-follow :active="activeTab == 'followers'" :rows="dataTabs.followers">
            <template v-slot:emptymessage>You have no followers <br> for the moment</template>
        </tab-type-follow>
        
        <tab-type-follow :active="activeTab == 'following'" :rows="dataTabs.following">
            <template v-slot:emptymessage>You are not subscribed to anyone<br> for the moment</template>
        </tab-type-follow>
        
        <tab-type-comment :active="activeTab == 'comments'" :rows="dataTabs.comments">
            <template v-slot:emptymessage>You have not commented on any files<br> for the moment</template>
        </tab-type-comment>
    </card-tabs>
</div>
</template>

<script>
import {
    like,
    submissions,
    followers,
    following,
    comments
} from '@/common/data/data.test';

import CardTabs from '@/common/components/elements/CardTabs.vue'
import ProfileBox from '../components/ProfileBox.vue'
import TabTypeSubmission from '../components/TabTypeSubmission.vue'
import TabTypeFollow from '../components/TabTypeFollow.vue'
import TabTypeComment from '../components/TabTypeComment.vue'

export default {
    components: {
        ProfileBox,
        CardTabs,
        TabTypeSubmission,
        TabTypeFollow,
        TabTypeComment,
    },
    data() {
        return {
            dataTabs: {
                likes: like({
                    examples: (Math.random() * 10) +1
                }),
                submissions: submissions({
                    examples: (Math.random() * 10) +1
                }),
                followers : followers({
                    examples: (Math.random() * 10) +1
                }),
                following : following({
                    examples: (Math.random() * 10) +1
                }),
                comments : comments({
                    examples: (Math.random() * 10) +1
                })
            },
            profileTabs: [{
                    name: 'likes',
                    title: 'Like (0)'
                },
                {
                    name: 'submissions',
                    title: 'Submissions (0)'
                },
                {
                    name: 'followers',
                    title: 'Followers (0)'
                },
                {
                    name: 'following',
                    title: 'Following (0)'
                },
                {
                    name: 'comments',
                    title: 'Comments (0)'
                },
            ],
            activeTab: null
        }
    },
    methods: {
        switchTab(tab) {
            this.activeTab = tab;
        }
    },
    created() {
        this.activeTab = this.profileTabs[0].name;
        
        // Update Profile Count
        this.profileTabs.map(tab=> {
            let count = this.dataTabs[tab.name];
            count = count && count.length || 0;
            tab.title = tab.title.replace(/([\d])/gm, count);
            return tab;
        })
    }
}
</script>

<style lang="scss" scoped>
.profile {
    @apply space-y-4;
}
</style>

<style lang="scss">
.profile-stats {
    .empty-tab {
        @apply flex justify-center items-center text-center py-8 mt-4 text-gray text-sm;
    }
}
</style>
