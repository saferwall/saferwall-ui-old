<template>
  <div :id="id" class="comment">
    <div class="profile">
      <router-link :to="getProfileRoute">
        <avatar :username="author.username" height="60px" width="60px" />
        <div>
          <b>{{ author.username }}</b>
          <p class="text-gray-medium">Member since {{ getMemberSince }}</p>
        </div>
      </router-link>

      <div>
        <btn-follow
          v-if="!isSelfUser"
          :followed="dfollowed"
          v-on:toggleFollow="toggleFollow"
        ></btn-follow>
      </div>
    </div>
    <div class="content" v-html="comment"></div>
    <time class="date">{{ getCommentDate }}</time>
  </div>
</template>

<script>
import Avatar from "@/common/components/elements/Avatar.vue";
import BtnFollow from "@/common/components/elements/button/BtnFollow.vue";

import { timeAgoCounts } from "@/common/utils/date-format";
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
  props: ["id", "comment", "author", "date"],
  computed: {
    ...userGetters,
    getCommentDate() {
      return timestampToDate(this.date);
    },
    isSelfUser() {
      return this.getUser && this.author.username === this.getUser.username;
    },
    getProfileRoute() {
      return `/user/${this.author.username}`;
    },
    getMemberSince() {
      return timeAgoCounts(this.author.member_since);
    },
  },
  methods: {
    ...followActions,
    async toggleFollow() {
      if (this.dfollowed) {
        return this.doUnFollow({ id: this.author.username }).then(() => {
          this.dfollowed = false;
        });
      }
      this.doFollow({ id: this.author.username }).then(() => {
        this.dfollowed = true;
      });
    },
  },
  created() {
    this.dfollowed = this.author.author;
  },
};
</script>


<style lang="scss" scoped>
.comment {
  @apply md:rounded-lg shadow-sm content-center justify-center;
  @apply bg-light py-6 px-6 w-full flex flex-col space-y-2;

  .profile {
    @apply flex justify-start;

    &,
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