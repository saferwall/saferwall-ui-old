<template>
    <div class="account-settings">
        <card-tabs :tabs="settingsTabs" v-on:switchTab="switchTab($event)" mode="vertical">
            <tab-information :active="activeTab == 'information'" />
            <tab-email :active="activeTab == 'email'" />
            <tab-password :active="activeTab == 'password'" />
            <tab-delete-account :active="activeTab == 'delete'" />
        </card-tabs>
    </div>
</template>

<script>
import CardTabs from '@/common/components/elements/CardTabs.vue'
import TabInformation from '../components/TabInformation.vue'
import TabEmail from '../components/TabEmail.vue'
import TabPassword from '../components/TabPassword.vue'
import TabDeleteAccount from '../components/TabDeleteAccount.vue'
export default {
    components:{
        CardTabs,
        TabInformation,
        TabEmail,
        TabPassword,
        TabDeleteAccount,
    },
    data(){
        return {
            settingsTabs: [
                { name: 'information', title: 'Account information' },
                { name: 'email', title: 'Change Email address' },
                { name: 'password', title: 'Change password' },
                { name: 'delete', title: 'Delete account' },
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
        this.activeTab = this.settingsTabs[0].name;
    }
}
</script>

<style lang="scss" scoped>
.account-settings{
    .tab-mode-vertical{
        @apply py-14;

        .tab-content{
            @apply  px-10;
        }
    }
}
</style>