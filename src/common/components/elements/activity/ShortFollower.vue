<template>
  <div class="short-follower space-x-8">
    <div class="fuser-avatar">
      <a :href="`/user/${username}`">
        <avatar :username="username" />
      </a>
    </div>
    <div class="fuser-info flex-grow">
      <a :href="`/user/${username}`">
        <h1 class="fuser-username">
          {{ username }}
        </h1>
      </a>
      <p class="fuser-resgistred">Member since {{ getRegistredTimeAgo }}</p>
    </div>
    <div class="actions">
      <btn-follow
        v-if="notSelfUser"
        :followed="dfollowed"
        v-on:toggleFollow="toggleFollow"
      />
    </div>
  </div>
</template>

<script>
import { timeAgo } from "@/common/functions";
import { followActions, userGetters } from "@/state/helpers";

import Avatar from "../Avatar.vue";
import BtnFollow from "../button/BtnFollow.vue";

export default {
  components: {
    Avatar,
    BtnFollow,
  },
  emits: ["doAction"],
  props: {
    username: {
      type: String,
    },
    follow: {
      default: false,
      type: Boolean,
    },
    member_since: {
      type: [Date, String],
    },
  },
  data() {
    return {
      dfollowed: false,
    };
  },
  computed: {
    ...userGetters,
    getRegistredTimeAgo() {
      return timeAgo(this.member_since);
    },
    notSelfUser() {
      return this.username !== this.getUser && this.getUser.username;
    },
  },
  methods: {
    ...followActions,
    async toggleFollow() {
      if (this.dfollowed) {
        return this.doUnFollow({ id: this.username }).then(() => {
          this.dfollowed = false;
          this.$emit("doAction", { type: "unfollow", target: this.username });
        });
      }
      this.doFollow({ id: this.username }).then(() => {
        this.dfollowed = true;
        this.$emit("doAction", { type: "follow", target: this.username });
      });
    },
  },
  created() {
    this.dfollowed = this.follow;
  },
};
</script>

<style lang="scss" scoped>
.short-follower {
  @apply flex flex-wrap items-center justify-between md:p-6 md:mx-4 my-4;

  .fuser-username {
    @apply font-bold text-base break-all;
  }
  .fuser-resgistred {
    @apply text-gray-medium mt-1;
  }
  .btn-fuser {
    @apply p-2;
  }
}
</style>
