<template>
  <div :id="id" class="comment">
    <div class="flex justify-between">
      <div class="profile">
        <router-link :to="getProfileRoute">
          <avatar :username="author.username" height="46px" width="46px" />
          <div>
            <b>{{ author.username }}</b>
            <p class="text-gray-medium">Member since {{ getMemberSince }}</p>
          </div>
        </router-link>
        <div>
          <btn-follow v-if="!selfComment" :followed="dfollowed" v-on:toggleFollow="toggleFollow"></btn-follow>
        </div>
      </div>

      <button
        class="m-4 px-4 self-start text-red-500"
        v-if="selfComment"
        @click="doDeleteComment()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
    <div class="content">
      <vue-markdown :source="comment" />
    </div>
    <time class="date">{{ getCommentDate }}</time>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown-render";

import Avatar from "@/common/components/elements/Avatar.vue";
import BtnFollow from "@/common/components/elements/button/BtnFollow.vue";

import { timeAgoCounts } from "@/common/utils/date-format";
import { followActions, userGetters, commentMethods } from "@/state/helpers";
import { timestampToDate } from "@/common/utils/date-format";
import { createToast } from "mosha-vue-toastify";

export default {
  components: {
    Avatar,
    BtnFollow,
    VueMarkdown,
  },
  emits: ["commentDeleted"],
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
    selfComment() {
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
    ...commentMethods,
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
    doDeleteComment() {
      this.deleteComment(this.id)
        .then(() => {
          createToast("Comment delete successfully !", {
            type: "success",
            position: "bottom-right",
          });

          this.$emit("commentDeleted", this.id);
        })
        .catch((err) => {
          createToast(
            err.response.status == 404
              ? "Comment not found !"
              : err.response.message,
            {
              type: "danger",
              position: "bottom-right",
            }
          );
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
  @apply bg-light py-6 px-2 w-full flex flex-col space-y-2;

  .profile {
    @apply flex justify-start;

    b {
      font-size: 0.9rem;
    }
    p {
      font-family: "Manrope";
      font-style: normal;
      font-weight: 500;
      font-size: 0.8rem;
      line-height: 19px;

      color: #9b9b9b;
    }

    &,
    a {
      @apply flex items-center space-x-4;
    }
  }
  .content {
    @apply max-w-max break-words px-4 pt-4;
    p {
      font-family: "Manrope";
      font-style: normal;
      font-weight: 500;
      font-size: 0.9rem;
      line-height: 21px;
      color: #000000;
    }
  }
  .date {
    @apply text-gray-medium px-4;
    font-family: "Manrope";
    font-style: normal;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 18px;
    /* identical to box height */

    color: #9b9b9b;
  }
}
</style>