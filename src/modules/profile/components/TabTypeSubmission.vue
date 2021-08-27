<template>
  <card-tab :active="active" class="tab-submissions">
    <div v-if="getRows.length == 0" class="empty-tab">
      <h2><slot name="emptymessage" /></h2>
    </div>
    <template v-else>
      <short-submission v-for="row in getRows" :key="row.id" v-bind="row" />
    </template>
  </card-tab>
</template>

<script>
import CardTab from "@/common/components/elements/CardTab.vue";
import ShortSubmission from "@/common/components/elements/activity/ShortSubmission.vue";

export default {
  components: {
    CardTab,
    ShortSubmission,
  },
  props: {
    rows: {
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getRows() {
      return this.rows.filter((item) => item.file && item.file.hash);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-submissions {
  @apply divide-y divide-gray divide-opacity-10;
}
</style>