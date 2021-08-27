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

export default {
  data: () => ({
    activities: [],
    paginator: new Paginator("users/activities"),
  }),
  components: {
    ListActivities,
  },
  computed: {
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
            (v, i, l) => l.indexOf(v) === i
          );
      });
    },
  },
  created() {
    this.showMore();
  },
};
</script>
