<template>
  <div class="activity relative" :class="isFollow ? 'followtype' : 'filetype'">
    <div class="header">
      <router-link class="profile-link" :to="`/user/${author.username}`">
        <avatar :username="author.username" />
        <router-link :to="getFileRoute" class="info mt-3">
          <h3 class="text-lg font-bold">{{ author.username }}</h3>
          <p class="text-gray">Member since {{ getJoinedAgo }}</p>
        </router-link>
      </router-link>
      <div v-if="isFollow" class="flex flex-col justify-center">
        <p>Followed</p>
        <p>{{ getActivityTimeAgo }} ago</p>
      </div>
      <div class="buttons mt-3" v-if="isLogged && !isSelfUser && !isFollow">
        <button
          @click="toggleFollow"
          :class="follow ? 'active' : ''"
          class="follow"
        >{{ follow ? "UnFollow" : "Follow" }}</button>
      </div>
      <template v-else-if="isFollow">
        <router-link class="profile-link target" :to="`/user/${target}`">
          <router-link :to="getFileRoute" class="info mt-3">
            <h3 class="text-lg font-bold">{{ target }}</h3>
            <p class="text-gray">Member since {{ getJoinedAgo }}</p>
          </router-link>
          <avatar :username="target" />
        </router-link>
      </template>
    </div>

    <div class="activity-content col-span-4 grid lg:grid-cols-5 z-10" v-if="!isFollow">
      <router-link
        :to="getFileRoute"
        class="info"
        :class="(!hasTags && 'col-span-5') || 'col-span-4'"
      >
        <p class="title">
          <b>{{ author.username }}</b>
          {{ getActivityTitle }} a file
          <span class="text-sm">{{ getActivityTimeAgo }} ago</span>
        </p>
        <hash-input :hash="file.hash" class="mt-4"></hash-input>
        <file-meta :scan="file.multiav" :filename="file.filename" :classification="file.class" />
      </router-link>
      <div v-if="hasTags" class="tags">
        <h3>Tags</h3>
        <ul class="list flex flex-wrap">
          <li v-for="tag in tags" v-bind:key="tag.link" :class="tag.avg && `redbg`">
            <router-link :to="`/tag/${tag.name}`" :title="tag.name">
              {{
              tag.name
              }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapTags } from "@/common/helpers";
import { getClass } from "@/common/classification";
import { followActions, userGetters } from "@/state/helpers";
import { timeAgoCounts, timeAgo } from "@/common/utils/date-format";

import Avatar from "./Avatar.vue";
import FileMeta from "./FileMeta.vue";
import HashInput from "./HashInput.vue";

const typeActivity = [
  { key: "like", title: "Liked" },
  { key: "submit", title: "Submitted" },
  { key: "follow", title: "Followed" },
  { key: "comment", title: "Commented" },
];

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
    date: {
      default: 0,
      type: [String, Number],
    },
    follow: {
      default: true,
      type: Boolean,
    },
    target: {
      default: null,
      type: String,
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
      return timeAgoCounts(this.date);
    },
    getJoinedAgo() {
      return timeAgo(this.author.member_since);
    },
    getActivityTitle() {
      return typeActivity.find((type) => {
        return type.key == this.type;
      })?.title;
    },
    hasTags() {
      return this.tags.length > 0;
    },
    isLogged() {
      return this.getUser;
    },
    isSelfUser() {
      return this.author.username === this.getUser.username;
    },
    getClassification() {
      return getClass(this.file.class);
    },
    getFileRoute() {
      return `/file/${this.file.hash}/summary`;
    },
    isFollow() {
      return this.type == "follow" || this.target != null;
    },
  },
  methods: {
    ...followActions,
    toggleFollow() {
      if (this.followed) return this.doUnFollow({ id: this.author.username });
      this.doFollow({ id: this.author.username });
    },
  },
  created() {
    this.tags = mapTags(this.file.tags);
  },
};
</script>

<style lang="scss" scoped>
.activity {
  @apply items-center justify-center bg-white py-2 lg:py-0 my-3 sm:rounded-xl;

  &.filetype {
    @apply lg:grid-cols-5  lg:grid;

    .header {
      @apply flex border text-center z-10 md:justify-center;
      border-right: 1px solid #e8e8e8;
      padding: 30px 0;

      .profile-link {
        @apply flex justify-center space-x-4 lg:block lg:space-x-0;
        a {
          p {
            color: #9b9b9b;
            font-weight: 500;
          }
        }
      }
    }
  }

  &.followtype {
    @apply flex md:flex-row w-full;

    .profile-link {
      @apply text-xs sm:text-base flex flex-col lg:flex-row items-center justify-start gap-x-4;

      &.target {
        @apply flex-col-reverse lg:flex-row;
      }
    }

    .header {
      @apply flex flex-row;
    }
  }

  .header {
    @apply flex flex-col items-center w-full justify-between flex-grow border-none;
  }

  > * {
    @apply px-4 py-3 lg:py-4;
  }

  .activity-content {
    @apply my-3 break-all;

    &,
    .tags {
      @apply border-l-0  lg:border-gray lg:border-opacity-10;
    }

    .info {
      p {
        font-weight: 500;
      }
      .title span {
        @apply text-gray;
        color: #b2b2b2;
        font-weight: 500;
      }
    }

    .tags {
      @apply mt-8 ml-4 mx-0 px-0 lg:px-4 w-full;
      h3 {
        text-transform: uppercase;
        color: #b2b2b2;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .list {
        @apply flex flex-wrap;
      }
      .list li {
        @apply py-1 px-2 bg-blue-500 m-1 rounded text-light text-sm;
        background-color: #e3f1ff;
        color: #3e83c9;
        font-weight: 500;
        font-size: 0.85rem;

        &.redbg {
          @apply bg-red-500;
          background-color: #fceaee;
          color: #ed4060;
        }
      }
    }
  }
  .buttons {
    .follow {
      @apply border-gray-light;
      &:hover,
      &.active {
        @apply bg-primary bg-opacity-10;
      }
    }
  }

  .follow {
    @apply inline-grid font-bold text-primary border rounded-md border-gray py-2 w-max px-6 cursor-pointer;
  }
}
</style>