<template>
  <div :id="id" class="comment">
    <div class="profile">
      <router-link :to="getProfileRoute">
        <avatar :username="username" height="60px" width="60px" />
        <div>
          <b>{{ username }}</b>
          <p class="text-gray-medium">Member since 2021</p>
        </div>
        <btn-follow
          v-if="!isSelfUser"
          :followed="dfollowed"
          v-on:toggleFollow="toggleFollow"
        ></btn-follow>
      </router-link>
    </div>
    <div class="content" v-html="comment"></div>
    <time class="date">{{ getCommentDate }}</time>
  </div>
</template>

<script>
import Avatar from "@/common/components/elements/Avatar.vue";
import BtnFollow from "@/common/components/elements/button/BtnFollow.vue";

import { followActions, userGetters } from "@/state/helpers";
import { timestampToDate } from "@/common/utils/date-format";

export default {
  components: {
    Avatar,
    BtnFollow,
  },
  data() {
    return {
      dfollowed: false,
    };
  },
  props: ["id", "comment", "username", "date", "follow"],
  computed: {
    ...userGetters,
    getCommentDate() {
      return timestampToDate(this.date);
    },
    isSelfUser() {
      return this.getUser && this.username === this.getUser.username;
    },
    getProfileRoute() {
      return `/user/${this.username}`;
    },
  },
  methods: {
    ...followActions,
    async toggleFollow() {
      if (this.dfollowed) {
        return this.doUnFollow({ id: this.username }).then(() => {
          this.dfollowed = false;
        });
      }
      this.doFollow({ id: this.username }).then(() => {
        this.dfollowed = true;
      });
    },
  },
  created() {
    this.dfollowed = this.follow;
  },
};
</script>


<style lang="scss" scoped>
.comment {
  @apply md:rounded-lg shadow-sm content-center justify-center;
  @apply bg-light py-6 px-6 w-full flex flex-col space-y-2;

  .profile {
    @apply justify-start;

    a {
      @apply flex items-center space-x-4;
    }
  }
  .content {
    @apply max-w-max break-words px-4 pt-4;
  }
  .date {
    @apply text-gray-medium px-4;
  }
}
</style>