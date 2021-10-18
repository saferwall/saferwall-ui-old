<template>
  <Card title="Portable Executable">
    <div class="pe-tree">
      <TableTree :lines="getPE" />
    </div>
  </Card>
</template>


<script>
import { scanGetters } from "@/state/helpers";
import Card from "@/common/components/elements/Card.vue";
import TableTree from "@/common/components/tables/TableTree.vue";
import { capitalize } from "@vue/shared";

export default {
  components: { Card, TableTree },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    mapKeyItems(obj) {
      if (!obj || typeof obj !== "object") return obj;

      return Object.keys(obj).map((item) => {
        return {
          title: capitalize(item),
          value: this.mapKeyItems(obj[item]),
        };
      });
    },
  },
  computed: {
    ...scanGetters,
    getPE() {
      let pe = this.getFilePE;
      return this.mapKeyItems(pe);
    },
  },
  created() {},
  async beforeMount() {
    this.file = await this.getFileSummary;
  },
};
</script>

<style lang="scss" scoped>
.pe-tree {
  @apply p-8;
}
</style>