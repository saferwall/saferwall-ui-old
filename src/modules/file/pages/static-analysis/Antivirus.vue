<template>
  <div class="flex flex-col md:flex-row w-full md:space-x-8 avresults">
    <Card title="First Scan" class="w-full">
      <p class="px-4 text-sm text-gray-medium font-semibold">
        {{ formatDate(getLastScanDate) }}
        <small class="italic">{{ timeAgo(getLastScanDate) }} ago</small>
      </p>
      <div class="border-b mt-7 border-gray-light"></div>
      <TableCols
        :striped="true"
        :bordered="true"
        :columns="[{ title: 'Antivirus' }, { title: 'Output' }]"
        :lines="getFirstScan"
        :htmlFields="[1]"
      />
    </Card>
    <Card title="Last Scan" class="w-full">
      <p class="px-4 text-sm text-gray-medium font-semibold">
        {{ formatDate(getFirstScanDate) }}
        <small class="italic">{{ timeAgo(getFirstScanDate) }} ago</small>
      </p>
      <div class="border-b mt-7 border-gray-light"></div>
      <TableCols
        :striped="true"
        :bordered="true"
        :columns="[{ title: 'Antivirus' }, { title: 'Output' }]"
        :lines="getFirstScan"
        :htmlFields="[1]"
      />
    </Card>
  </div>
</template>

<script>
import Card from "@/common/components/elements/Card.vue";
import TableCols from "@/common/components/tables/TableCols.vue";
import { fileGetters } from "@/state/helpers";
import { timeAgoCounts, timestampToDate } from "@/common/utils/date-format";

export default {
  components: {
    Card,
    TableCols,
  },
  data() {
    return {
      file: null,
    };
  },
  methods: {
    avResult(av) {
      if (av.infected) {
        return `<p class='infected'>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>${av.output}</span>
        </p>`;
      }
      return `<p class='clean'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Clean</span>
      </p>`;
    },
    timeAgo(date) {
      return timeAgoCounts(date);
    },
    formatDate(date) {
      return timestampToDate(date);
    },
  },
  computed: {
    ...fileGetters,
    getFirstScanDate() {
      return Object.values(this.getFileAvs.first_scan).reduce(
        (first, av) => (!first || av.update <= first ? av.update : first),
        null
      );
    },
    getLastScanDate() {
      return Object.values(this.getFileAvs.last_scan).reduce(
        (first, av) => (!first || av.update <= first ? av.update : first),
        0
      );
    },
    getFirstScan() {
      let data = this.getFileAvs.first_scan;
      return Object.keys(data).map((name) => [name, this.avResult(data[name])]);
    },
    getLastScan() {
      let data = this.getFileAvs.last_scan;
      return Object.keys(data).map((name) => [name, this.avResult(data[name])]);
    },
  },
  created() {},
  async beforeMount() {
    this.file = await this.getFile;
  },
};
</script>

<style lang="scss">
.avresults {
  .infected {
    @apply text-red-600;
  }
  .clean {
    @apply text-green-600;
  }

  .infected,
  .clean {
    @apply flex space-x-2;
  }

  .table-cval {
    td:first-of-type {
      @apply capitalize font-medium;
    }
  }
}
</style>