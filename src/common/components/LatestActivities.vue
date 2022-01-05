<template>
  <div class="latestactv my-9">
    <list-activities
      :activities="getLatestActivities"
      :more="hasMore"
      v-on:showMore="showMore"
    />
  </div>
</template>

<script>
import Paginator from "@/common/utils/paginator";
import ListActivities from "./ListActivities.vue";

import { userGetters } from "@/state/helpers";

export default {
  data: () => ({
    activities: [],
    paginator: {},
  }),
  components: {
    ListActivities,
  },
  computed: {
    ...userGetters,
    getLatestActivities() {
      return this.activities;
    },
    hasMore() {
      return this.paginator.isNextPossible();
    },
  },
  methods: {
    showMore() {
      this.paginator.nextPage().then((data) => {
        if (data.items)
          this.activities = [...this.activities, ...data.items].filter(
            (v, i, l) => l.filter((r) => r.id === v.id).length <= 1
          );
      });
    },
  },
  created() {
    this.paginator = new Paginator(
      "users/activities",
      this.getUsername ? "?user=" + this.getUsername : ""
    ).setLimit(5);

    this.paginator.setPage(0);
    this.showMore();
  },
};
</script>
