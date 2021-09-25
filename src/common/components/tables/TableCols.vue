<template >
  <table :class="(striped ? ' striped' : '') + (bordered ? ' bordered' : '')">
    <thead>
      <th v-for="col in columns" v-bind:key="col">
        {{ col.title }}
      </th>
    </thead>
    <tbody :class="hasColumns ? 'table-kval' : 'table-cval'">
      <tr v-for="(line, lindex) in lines" v-bind:key="line">
        <template v-for="(val, jindex) in line" v-bind:key="val">
          <td v-if="isHtmlAllowed(lindex, jindex)" v-html="val"></td>
          <td v-else>{{ val }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: Object,
    lines: Object,
    striped: Boolean,
    bordered: Boolean,
    htmlFields: {
      type: Array(),
      default: [],
    },
  },
  computed: {
    hasColumns() {
      return Object.keys(this.columns || {}).length === 0;
    },
  },
  methods: {
    isHtmlAllowed(lindex, jindex) {
      let tkey = typeof jindex == "number" ? jindex : `${lindex}-${jindex}`;
      return this.htmlFields.includes(tkey);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  @apply m-3 mt-8 w-full;
  th {
    @apply text-gray uppercase text-left;
  }
  tr {
    @apply w-full;
  }

  td,
  th {
    @apply px-3 py-3;
  }
  td:nth-child(2n) {
    @apply text-gray font-normal;
  }

  &.striped {
    tr {
      @apply font-semibold;
    }

    td:nth-child(2n) {
      @apply text-gray;
    }

    tr:nth-child(odd) {
      background: #f6f6f6;
    }
  }

  &.bordered {
    tr {
      border-top: solid 1px #f6f6f6;
    }
  }
}
</style>