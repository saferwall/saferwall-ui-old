<template>
  <div
    class="
      activity
      lg:grid
      items-center
      justify-center
      lg:grid-cols-5
      lg:gap-4
      bg-white
      my-3
      lg:rounded-xl
    "
  >
    <div class="header border text-center">
      <router-link class="profile-link" :to="`/user/${author.username}`">
        <avatar
          :username="author.username"
          :source="`//avatar.saferwall.com/${author.username}`"
        />
        <div class="info mt-3">
          <h3 class="text-xl font-bold">{{ author.username }}</h3>
          <p class="text-gray">Member since {{ getJoinedAgo }}</p>
        </div>
      </router-link>
      <div class="buttons mt-3" v-if="!isSelfUser">
        <button
          @click="toggleFollow"
          :class="follow ? 'active' : ''"
          class="
            follow
            inline-grid
            font-bold
            text-primary
            border
            rounded-md
            border-gray
            py-2
            w-max
            px-6
            cursor-pointer
          "
        >
          {{ follow ? "UnFollow" : "Follow" }}
        </button>
      </div>
    </div>
    <div class="activity-content col-span-4 grid lg:grid-cols-4">
      <div
        class="info mr-10"
        :class="(!hasTags && 'col-span-4') || 'col-span-3'"
      >
        <router-link :to="getFileSummaryRoute">
          <p class="title">
            <b>{{ author.username }}</b> {{ getActivityTitle }} a file
            <span class="text-sm">{{ getActivityTimeAgo }} ago</span>
          </p>
          <hash-input :hash="file.hash" class="mt-4"></hash-input>
        </router-link>
        <file-meta
          :filename="file.filename"
          :classification="getClassification"
          :scan="file.multiav"
        />
      </div>
      <div v-if="hasTags" class="tags">
        <h3>Tags</h3>
        <ul class="list flex flex-wrap">
          <li
            v-for="tag in getTags"
            v-bind:key="tag.link"
            :class="tag.avg && `redbg`"
          >
            <router-link :to="`/tag/${tag.name}`" :title="tag.name">{{
              tag.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgoCounts, timeAgo, isAnAVG } from "@/common/functions";
import { followActions, userGetters } from "@/state/helpers";
import { getClass } from "@/common/classification";

import HashInput from "./HashInput.vue";
import FileMeta from "./FileMeta.vue";
import Avatar from "./Avatar.vue";

export default {
  components: {
    HashInput,
    Avatar,
    FileMeta,
  },
  props: {
    id: String,
    author: {
      default: function () {
        return {
          username: null,
          member_since: 0,
        };
      },
      type: Object,
    },
    file: {
      default: function () {
        return {
          hash: null,
          name: null,
          class: null,
          score: {
            value: 0,
            total: 0,
          },
          tags: [],
        };
      },
      type: Object,
    },
    timestamp: {
      default: 0,
      type: [String, Number],
    },
    follow: {
      default: true,
      type: Boolean,
    },
    type: {
      default: "submit",
      type: String,
    },
  },
  data: () => ({
    tags: [],
  }),
  computed: {
    ...userGetters,
    getActivityTimeAgo() {
      return timeAgoCounts(this.timestamp);
    },
    getJoinedAgo() {
      return timeAgo(this.author.member_since);
    },
    getActivityTitle() {
      let typeActivity = [
        { key: "like", title: "Liked" },
        { key: "submit", title: "Submitted" },
        { key: "follow", title: "Followed" },
        { key: "comment", title: "Commented" },
      ].find((type) => {
        return type.key == this.type;
      });
      return (typeActivity && typeActivity.title) || "Unknown";
    },
    getTags() {
      return this.tags;
    },
    hasTags() {
      return this.getTags.length > 0;
    },
    isSelfUser() {
      return this.author.username !== this.getUser && this.getUser.username;
    },
    getClassification() {
      console.log(this.file.class);
      return getClass(this.file.class);
    },
    getFileSummaryRoute() {
      return `/file/${this.file.hash}/summary`;
    },
  },
  methods: {
    ...followActions,
    toggleFollow() {
      if (this.followed) return this.doUnFollow({ id: this.author.username });
      this.doFollow({ id: this.author.username });
    },
    filterTags() {
      let tags = this.file.tags;
      let tagkeys = Object.keys(tags || {});

      this.tags = tagkeys.reduce((all, tagKey) => {
        return [
          ...all,
          ...(tags[tagKey] || []).map((tag) => ({
            name: tag,
            avg: isAnAVG(tag),
          })),
        ];
      }, []);
    },
  },
  created() {
    this.filterTags();
  },
};
</script>

<style lang="scss" scoped>
.activity {
  > * {
    @apply py-4 px-6 lg:p-10;
  }
  .header {
    @apply flex flex-wrap w-full justify-between lg:justify-center flex-grow border-none;

    .profile-link {
      @apply flex space-x-4 lg:block lg:space-x-0;
    }
  }
  .activity-content {
    @apply my-3 break-all;

    &,
    .tags {
      @apply border-l-0 lg:border-l lg:border-gray lg:border-opacity-10;
    }

    .info {
      .title span {
        @apply text-gray;
      }
    }

    .tags {
      @apply mt-8 mx-0 px-0 lg:px-4 w-full;
      .list li {
        @apply flex py-1 px-2 bg-blue-500 m-1 rounded text-light;

        &.redbg {
          @apply bg-red-500;
        }
      }
    }
  }
  .buttons {
    .follow {
      border-color: #dedede;
      &.active {
        @apply bg-primary bg-opacity-10 border-none;
      }
    }
  }
}
</style>