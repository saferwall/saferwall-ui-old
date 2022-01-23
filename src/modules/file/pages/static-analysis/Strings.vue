<template>
  <card>
    <div class="flex flex-col gap-y-4">
      <table
        cellspacing="0"
        class="table-strings w-full rounded-lg border border-separate"
      >
        <thead>
          <th>
            <div>
              <h3>Encoding</h3>
              <div class="search-input" @keyup="encodingSearch($event)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input type="text" placeholder="Search Encodings ..." />
              </div>
            </div>
          </th>
          <th>
            <div>
              <h3>Value</h3>
              <div class="search-input" @keyup="valueSearch($event)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input type="text" placeholder="Search Values ..." />
              </div>
            </div>
          </th>
        </thead>
        <tbody>
          <tr v-for="_string in strings" v-bind:key="_string">
            <td>
              {{ _string.encoding }}
            </td>
            <td>
              {{ _string.value }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination flex justify-end items-center gap-2">
        <div>
          <select @change="changeLimit($event)">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div class="flex gap-4">
          <template v-for="index in getPaginateButtons" :key="index">
            <div
              :class="`btn ${
                index == getCurrentPage ? 'bg-green-500' : 'bg-gray-medium'
              }`"
              v-on:click="selectPage(index)"
            >
              {{ index }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import Paginator from "@/common/utils/paginator";
import { fileGetters } from "@/state/helpers";

import Card from "@/common/components/elements/Card.vue";

export default {
  components: { Card },
  data: () => ({
    original_strings: [], // temporary search fields
    strings: [],
    paginator: {},
    encoding_search: null,
    value_search: null,
  }),
  computed: {
    ...fileGetters,
    getCurrentPage() {
      return this.paginator.pagination?.page;
    },
    getPaginateButtons() {
      let pages = [];

      let s_total_btn = 6 / 2;

      let start = this.paginator.pagination?.page || 5;
      let max = this.paginator.pagination?.pages || 1;

      pages.push(1);
      for (let i = -s_total_btn; i < s_total_btn; i++) {
        let b = i + start;
        if (b > 0 && b <= max) pages.push(b);
      }

      pages.push(max);

      return pages.filter((v, i, l) => l.findIndex((x) => v == x) == i);
    },
  },
  methods: {
    mapItems(items) {
      if (!items) {
        return (this.items = []);
      }

      this.original_strings = Object.keys(items).reduce(
        (listItems, encoding) => {
          if (!items[encoding] || items[encoding].length == 0) {
            return listItems;
          }

          items[encoding].forEach((_string) =>
            listItems.push({
              encoding,
              value: _string,
            })
          );

          return listItems;
        },
        []
      );

      this.filterItems(this.original_strings);
    },
    filterItems(items) {
      this.strings = items.filter((v) => {
        return (
          !this.encoding_search ||
          `${v.encoding}`.toLowerCase().match(this.encoding_search)
        );
      });

      this.strings = this.strings.filter((v) => {
        return (
          !this.value_search ||
          `${v.value}`.toLowerCase().match(this.value_search)
        );
      });
    },
    next() {
      this.paginator.nextPage();
    },
    prev() {
      this.paginator.prevPage();
    },
    selectPage(page) {
      if (page == this.getCurrentPage) {
        return;
      }

      this.paginator.setPage(page).fetchItems();
    },
    changeLimit(event) {
      const limit = event.target.value;

      if (limit == this.paginator.pagination.limit) {
        return;
      }

      this.paginator.setLimit(limit).fetchItems();
    },
    encodingSearch({ target }) {
      this.encoding_search = `${target.value}`.toLowerCase();

      this.filterItems(this.original_strings);
    },
    valueSearch({ target }) {
      this.value_search = `${target.value}`.toLowerCase();

      this.filterItems(this.original_strings);
    },
  },
  async created() {
    const file = await this.getFile;

    this.paginator = new Paginator(`files/${file.sha256}/strings`).setLimit(10);

    this.paginator
      .setPage(0)
      .onUpdate((items) => this.mapItems(items))
      .fetchItems();
  },
};
</script>

<style lang="scss" scoped>
.table-strings {
  &,
  thead,
  th,
  tr td {
    @apply border border-gray-light border-opacity-50 break-all;
  }

  * {
    @apply font-mono text-sm;
  }

  th div {
    @apply flex items-center justify-between;
  }

  th,
  tr td {
    @apply px-4 py-2;
  }

  th:first-child {
    @apply md:max-w-[12rem];
  }

  tr:nth-child(2n + 1) {
    @apply bg-gray-2xlight bg-opacity-50;
  }

  .search-input {
    &,
    input::placeholder {
      @apply text-gray-light;
    }

    input {
      @apply focus:outline-none  bg-transparent pl-3 py-4 text-gray;
    }
  }
}

.pagination {
  .btn,
  select {
    @apply select-none;
    @apply cursor-pointer  p-4 py-2 rounded  bg-opacity-70;
  }

  select {
    @apply border border-gray-light rounded;
  }
  .btn {
    @apply text-white hover:bg-green-300;
  }
}
</style>