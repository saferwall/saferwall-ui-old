<template>
  <card-tab :active="active" class="tab-follow">
    <div v-if="rows.length == 0" class="empty-tab">
      <h2><slot name="emptymessage" /></h2>
    </div>
    <template v-else>
      <short-follower
        v-for="row in rows"
        :key="row.id"
        @doAction="$emit('doAction', $event)"
        v-bind="{ ...row, username: row.username || row.user }"
      />
    </template>
  </card-tab>
</template>

<script>
import CardTab from "@/common/components/elements/CardTab.vue";
import ShortFollower from "@/common/components/elements/activity/ShortFollower.vue";

export default {
  components: {
    CardTab,
    ShortFollower,
  },
  emits: ["doAction"],
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-follow {
  @apply grid grid-cols-1 md:grid-cols-2 divide-gray divide-opacity-10;

  .empty-tab {
    @apply col-span-2;
  }
}
</style>