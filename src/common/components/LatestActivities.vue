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
import ListActivities from "./ListActivities.vue";
import { activityGetters, activityMethods } from "@/state/helpers";

export default {
  data: () => ({
    activities: [],
    pagination: {
      rows: 5,
      page: 0,
      pages: 0,
    },
  }),
  components: {
    ListActivities,
  },
  computed: {
    getLatestActivities() {
      return this.activities;
    },
    ...activityGetters,
    hasMore() {
      return this.pagination.page < this.pagination.pages;
    },
  },
  methods: {
    ...activityMethods,
    showMore() {
      console.log(this.pagination);
      this.pagination.page++;

      this.fetchActivities({
        pagination: this.pagination,
      }).then((data = { activities: [], pagination: {} }) => {
        this.activities = [
          ...this.activities,
          ...data.activities.filter(
            (item) => !this.activities.find((a) => a.id === item.id)
          ),
        ];
        this.pagination = { ...this.pagination, pages: data.pagination.pages };
      });
    },
  },
  created() {
    this.showMore();
  },
};
</script>
