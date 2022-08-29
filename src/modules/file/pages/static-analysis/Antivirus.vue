<template>
  <div class="antivirus">
    <Card title="First Scan" class="w-full">
      <p class="meta" v-if="getFirstScanDate">
        {{ formatDate(getFirstScanDate) }}.
        <span>{{ timeAgo(getFirstScanDate) }} ago</span>
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
      <p class="meta" v-if="getLastScanDate">
        {{ formatDate(getLastScanDate) }}.
        <span>{{ timeAgo(getLastScanDate) }} ago</span>
      </p>
      <div class="border-b mt-7 border-gray-light"></div>
      <TableCols
        :striped="true"
        :bordered="true"
        :columns="[{ title: 'Antivirus' }, { title: 'Output' }]"
        :lines="getLastScan"
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
            <svg class="h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 21 17">
              <path data-name="Polygone 2" d="M8.8,2.755a2,2,0,0,1,3.4,0l6.914,11.194A2,2,0,0,1,17.414,17H3.586a2,2,0,0,1-1.7-3.051Z" fill="#eb5050"/>
              <text data-name="!" transform="translate(9 14)" fill="#fff" font-size="11" font-family="OpenSans-Semibold, Open Sans" font-weight="600"><tspan x="0" y="0">!</tspan></text>
            </svg>
            <a>${av.output}</a>
        </p>`;
      }
      return `<p class='clean'>
        <svg  xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 18 18">
          <circle data-name="Ellipse 6" cx="9" cy="9" r="9" fill="#159677"/>
          <path  data-name="Tracé 22" d="M187.121,183.54l2.7,2.712,5.383-5.4" transform="translate(-182.127 -174.709)" fill="none" stroke="#fff" stroke-width="1.3"/>
        </svg>
        <a>Clean</a>
      </p>`;
    },
    timeAgo: timeAgoCounts,
    formatDate(date) {
      return timestampToDate(date);
    },
    mapScans(data) {
      return Object.keys(data).map((name) => [name, this.avResult(data[name])]);
    },
  },
  computed: {
    ...fileGetters,
    getLastScanDate() {
      return this.getFileAvs.last_scanned;
    },
    getFirstScanDate() {
      return this.getFileAvs.first_seen;
    },
    getFirstScan() {
      return this.mapScans(this.getFileAvs.multiav.first_scan);
    },
    getLastScan() {
      return this.mapScans(this.getFileAvs.multiav.last_scan);
    },
  },
  created() {},
  async beforeMount() {
    this.file = await this.getFile;
  },
};
</script>

<style lang="scss">
.antivirus {
  @apply flex flex-col md:flex-row w-full md:space-x-8;

  .title {
    color: #000000 !important;
    font-weight: 500 !important;
    font-size: 1.3rem !important;
    margin-left: 10px !important;
    margin-bottom: 0px !important;
  }

  .meta {
    @apply ml-1 text-sm text-gray-medium font-semibold;
    margin-left: 10px;
    margin-top: 5px;
    color: #a7a7a7;
    font-weight: 500;
    span {
      margin-left: 5px;
      display: inline-block;
    }
  }
  .infected {
    @apply text-red-600;
  }
  .clean {
    @apply text-green-600;
  }

  .infected,
  .clean {
    @apply flex space-x-2 items-center;
  }
  table {
    th {
      text-transform: none;
      color: #050505;
      font-weight: 800;
      font-size: 0.9rem;
    }
    td {
      font-size: 0.8rem;
    }
  }

  .table-cval {
    td:first-of-type {
      @apply capitalize font-medium;
    }
  }
}
</style>