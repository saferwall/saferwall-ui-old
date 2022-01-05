<template>
  <div
    class="
      flex
      md:flex-row
      justify-center
      items-center
      lg:justify-between
      md:p-6 md:mx-4
      my-4
      gap-2
    "
  >
    <div>
      <a :href="`/user/${username}`">
        <avatar :username="username" />
      </a>
    </div>

    <div class="flex flex-col justify-center">
      <a :href="`/user/${username}`">
        <h1 class="font-bold text-base break-all">
          {{ username }}
        </h1>
      </a>
      <p class="text-gray-medium mt-1">
        Member since {{ getRegistredTimeAgo }}
      </p>
    </div>

    <div class="actions">
      <btn-follow
        v-if="!isSelfUser"
        :followed="dfollowed"
        v-on:toggleFollow="toggleFollow"
      />
    </div>
  </div>
</template>

<script>
import { timeAgo } from "@/common/utils/date-format";
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
    isSelfUser() {
      return this.getUser && this.username === this.getUser.username;
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

