<template >
  <table>
    <card-tabs
      :tabs="treeList"
      v-on:switchTab="switchTab($event)"
      :active="currentTab"
      mode="vertical"
    >
      <card-tab
        v-for="tree in treeList"
        :key="tree.name"
        :active="tree.name == currentTab"
      >
        <div v-if="!isValANode(tree.value)" class="tree-val">
          {{ tree.value }}
        </div>
        <template v-else>
          <table-tree :lines="tree.value"></table-tree>
        </template>
      </card-tab>
    </card-tabs>
  </table>
</template>

<script>
import CardTab from "../elements/CardTab.vue";
import CardTabs from "../elements/CardTabs.vue";
import { translateKey } from "@/common/utils/translate";

export default {
  components: { CardTab, CardTabs },
  name: "table-tree",
  props: {
    columns: Object,
    lines: Object,
    htmlFields: {
      type: Array(),
      default: [],
    },
  },
  data() {
    return {
      currentTab: null,
      treeList: [],
    };
  },
  computed: {
    hasColumns() {
      return Object.keys(this.columns || {}).length === 0;
    },
    getFirstTree() {
      return (this.lines || []).map((line) => ({
        name: line.title,
        title: translateKey(line.title),
        value: line.value,
      }));
    },
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    isValANode(val) {
      return val instanceof Array;
    },
    isHtmlAllowed(lindex, jindex) {
      let tkey = typeof jindex == "number" ? jindex : `${lindex}-${jindex}`;
      return this.htmlFields.includes(tkey);
    },
  },
  created() {
    this.treeList = this.getFirstTree;
    this.currentTab = this.treeList[0].name;
  },
};
</script>

<style lang="scss" scoped>
.card-tabs {
  @apply px-0 shadow-none;

  &.tab-mode-vertical {
    @apply flex py-0 items-start;
    // lg:grid lg:grid-cols-12;
    .tab-contents {
      @apply py-0;
    }
  }

  .tab-headers {
    @apply col-span-2;
  }
}

.tree-val {
  @apply break-all px-12;
}
</style>

<style lang="scss">
.card-tabs {
  .active {
    @apply font-bold;
  }
}
</style>