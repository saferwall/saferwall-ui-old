<template>
  <div class="profile">
    <profile-box
      :username="username"
      v-bind="{ bio: profile.bio, member_since: profile.member_since }"
    />
    <card-tabs
      :tabs="profileTabs"
      class="profile-stats"
      v-on:switchTab="switchTabEvent($event)"
      :active="activeTab"
    >
      <tab-type-submission
        :active="activeTab == 'likes'"
        :rows="data.likes || []"
      >
        <template v-slot:emptymessage
          >{{ username }} has not liked anything yet for the moment</template
        >
      </tab-type-submission>

      <tab-type-submission
        :active="activeTab == 'submissions'"
        :rows="data.submissions || []"
      >
        <template v-slot:emptymessage
          >{{ username }} has not made any submissions for the moment</template
        >
      </tab-type-submission>

      <tab-type-follow
        :active="activeTab == 'followers'"
        :rows="data.followers || []"
      >
        <template v-slot:emptymessage
          >{{ username }} has no followers for the moment</template
        >
      </tab-type-follow>

      <tab-type-follow
        :active="activeTab == 'following'"
        :rows="data.following || []"
      >
        <template v-slot:emptymessage
          >{{ username }} does not subscribed to anyonefor the moment</template
        >
      </tab-type-follow>

      <tab-type-comment
        :active="activeTab == 'comments'"
        :rows="data.comments || []"
      >
        <template v-slot:emptymessage
          >{{ username }} has not commented on any filesfor the moment</template
        >
      </tab-type-comment>
    </card-tabs>
    <show-more v-if="hasMore" v-on:click="showMore">
      <p>Show more activities</p>
    </show-more>
  </div>
</template>

<script>
import Paginator from "@/common/utils/paginator";
import { userMethods, userGetters } from "@/state/helpers";

import CardTabs from "@/common/components/elements/CardTabs.vue";

import ProfileBox from "../components/ProfileBox.vue";
import TabTypeFollow from "../components/TabTypeFollow.vue";
import TabTypeComment from "../components/TabTypeComment.vue";
import TabTypeSubmission from "../components/TabTypeSubmission.vue";
import ShowMore from "@/common/components/elements/button/ShowMore.vue";

export default {
  components: {
    ProfileBox,
    CardTabs,
    TabTypeSubmission,
    TabTypeFollow,
    TabTypeComment,
    ShowMore,
  },
  pageTitle() {
    return this.username;
  },
  data() {
    return {
      username: null,
      profile: {},
      tabs: {
        likes: {},
        submissions: {},
        followers: {},
        following: {},
        comments: {},
      },
      data: {
        likes: [],
        submissions: [],
        followers: [],
        comments: [],
      },
      profileTabs: [
        {
          name: "likes",
          title: "Likes (0)",
        },
        {
          name: "submissions",
          title: "Submissions (0)",
        },
        {
          name: "followers",
          title: "Followers (0)",
        },
        {
          name: "following",
          title: "Following (0)",
        },
        {
          name: "comments",
          title: "Comments (0)",
        },
      ],
      activeTab: null,
      userExist: false,
    };
  },
  computed: {
    ...userGetters,
    getItems: (tab) => {
      return this.data[tab];
    },
    hasMore() {
      return this.activeTab && this.tabs[this.activeTab].isNextPossible();
    },
  },
  methods: {
    ...userMethods,
    async switchTabEvent(tab) {
      if (!this.userExist) return;

      // Fetch tab
      let paginator = this.tabs[tab];

      paginator
        .setLimit(10)
        .fetchItems()
        .then((data) => this.appendToTab(tab, data));

      // Set new data
      this.activeTab = tab;
      this.$router.replace({ params: { tab: tab } });
    },
    refreshProfile() {
      let profile = this.profile;

      // Update Profile Count & return first Tab
      this.profileTabs.map((tab) => {
        let count = this.tabs[tab.name];
        count = profile[`${tab.name}_count`] || 0;
        tab.title = tab.title.replace(/([\d])/gm, count);
        return tab;
      });
    },
    initPaginators() {
      this.tabs = {
        likes: new Paginator(`users/${this.username}/likes`),
        submissions: new Paginator(`users/${this.username}/submissions`),
        followers: new Paginator(`users/${this.username}/followers`),
        following: new Paginator(`users/${this.username}/following`),
        comments: new Paginator(`users/${this.username}/comments`),
      };
    },
    showMore() {
      // Fetch tab
      let tab = this.activeTab;
      let paginator = this.tabs[tab];

      paginator.nextPage().then((data) => this.appendToTab(tab, data));
    },
    appendToTab(tab, data = []) {
      this.data[tab] = [...(this.data[tab]||[]), ...(data.items||[])];
    },
  },
  async beforeMount() {
    // Profile data
    this.username = this.$route.params.id || this.getUser.username;

    this.profile = await this.fetchProfile(this.username).catch(() => {
      this.$router.push({ path: "/" });
    });

    if (this.username && this.profile.username) {
      this.userExist = true;
      this.initPaginators();
      this.refreshProfile();

      // Active Tabs
      let defaultTab = (this.$route.params.tab || "").toLowerCase();
      if (defaultTab) {
        if (
          Object.values(this.profileTabs).find((tab) => tab.name == defaultTab)
        ) {
          this.switchTabEvent(defaultTab);
          return;
        }
      }

      this.switchTabEvent(this.profileTabs[0].name);

      return;
    }
  },
};
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
