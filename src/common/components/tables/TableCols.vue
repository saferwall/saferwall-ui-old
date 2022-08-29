<template >
  <h2 class="title" v-if="title">{{ title }}</h2>
  <table :class="(striped ? ' striped' : '') + (bordered ? ' bordered' : '')">
    <thead>
      <th v-for="col in columns" v-bind:key="col">{{ col.title }}</th>
    </thead>
    <tbody :class="hasColumns ? 'table-kval' : 'table-cval'">
      <tr v-for="(line, lindex) in lines" v-bind:key="line">
        <template v-for="(val, jindex) in line" v-bind:key="val">
          <td v-if="isHtmlAllowed(lindex, jindex)">
            <template v-if="isCopyActive(jindex)">
              <btn-copy v-html="val"></btn-copy>
            </template>
            <template v-else>
              <div v-html="val"></div>
            </template>
          </td>
          <td v-else>
            <template v-if="isCopyActive(jindex)">
              <btn-copy>{{ val }}</btn-copy>
            </template>
            <template v-else>{{ val }}</template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import BtnCopy from "../elements/button/BtnCopy.vue";

export default {
  components: {
    BtnCopy,
  },
  props: {
    title: String,
    columns: Object,
    lines: Object,
    striped: Boolean,
    bordered: Boolean,
    customFields: {
      type: Boolean,
      default: true,
    },
    htmlFields: {
      type: Array(),
      default: [],
    },
    copyFields: {
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
      return this.htmlFields.includes(this.customFields ? tkey : jindex);
    },
    isCopyActive(index) {
      return this.copyFields.length > 0 && this.copyFields.includes(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  @apply text-xl font-bold p-3;
}

table {
  @apply w-full;

  th {
    @apply text-gray uppercase text-left;
  }
  tr {
    @apply w-full;
  }

  td,
  th {
    @apply px-3 py-2 text-sm xl:text-base;
    font-size: 0.9rem;
  }
  td:nth-child(2n) {
    @apply text-gray font-normal;
  }

  &.striped {
    tr {
      @apply font-semibold;
      td {
        padding: 13px 20px;
      }
    }

    td:nth-child(2n) {
      @apply text-gray;
    }

    tr:nth-child(odd) {
      background: #f6f6f6;
    }

    tr:nth-child(odd) td:first-child {
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    tr:nth-child(odd) td:last-child {
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
    }
  }

  &.bordered {
    tr {
      border-top: solid 1px #f6f6f6;
    }
  }
}
</style>