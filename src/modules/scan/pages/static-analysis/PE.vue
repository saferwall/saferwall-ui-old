<template >
  <div class="pe-tree">
    <Card title="Portable Executable">
      <div>
        <card-tabs
          :tabs="treeList"
          v-on:switchTab="switchTab($event)"
          :active="currentTab"
          mode="vertical"
        >
          <card-tab :active="'DosHeader' == currentTab">
            <table-cols
              :bordered="true"
              :columns="[
                { key: 'member', title: 'Member' },
                { key: 'value', title: 'Value' },
              ]"
              :lines="get_DosHeader"
            />
          </card-tab>
          <card-tab :active="'IAT' == currentTab">
            <table-cols
              :bordered="true"
              :columns="[
                { key: 'index', title: '#' },
                { key: 'rva', title: 'Entry RVA' },
                { key: 'value', title: 'Value' },
                { key: 'meaning', title: 'Meaning' },
              ]"
              :lines="get_IAT"
            />
          </card-tab>
          <card-tab :active="'Header' == currentTab">
            <code>{{ get_Header }}</code>
          </card-tab>
          <card-tab :active="'NtHeader' == currentTab">
            <table-cols
              title="File Header"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="true"
              :lines="get_NtHeader.fileHeader"
            />
            <div class="divider"></div>
            <table-cols
              title="Optional Header"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="true"
              :lines="get_NtHeader.optionalHeader"
            />
            <div class="divider"></div>
            <table-cols
              title="Data Directory"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="true"
              :columns="[
                { key: 'key', title: 'Virtual Address' },
                { key: 'value', title: 'Size' },
                { key: 'format', title: '' },
              ]"
              :lines="get_NtHeader.dataDirevtory"
            />
          </card-tab>
          <card-tab :active="'Imports' == currentTab">
            <card-tabs
              :tabs="get_Imports_tabs"
              :mode="'vertical'"
              :active="currentImport"
              v-on:switchTab="switchImport($event)"
            >
              <card-tab
                v-for="(importItem, index) in get_Imports"
                :key="index"
                :active="importItem.Name == currentImport"
              >
                <table-cols
                  :striped="true"
                  :bordered="true"
                  :lines="[
                    { key: 'Name', value: importItem.Name },
                    { key: 'Offset', value: importItem.Offset },
                  ]"
                ></table-cols>
                <div class="divider"></div>
                <table-cols
                  title="Descriptor"
                  :bordered="true"
                  :columns="get_Columns(importItem.Descriptor)"
                  :lines="get_Descriptor_line(importItem.Descriptor)"
                />
                <div class="divider"></div>
                <table-cols
                  title="Functions"
                  :bordered="true"
                  :columns="get_Columns(importItem.Functions[0])"
                  :lines="importItem.Functions"
                />
                <div class="divider"></div>
              </card-tab>
            </card-tabs>
          </card-tab>
        </card-tabs>
      </div>
    </Card>
  </div>
</template> 

<script>
import Card from "@/common/components/elements/Card.vue";
import CardTab from "@/common/components/elements/CardTab.vue";
import CardTabs from "@/common/components/elements/CardTabs.vue";
import TableCols from "@/common/components/tables/TableCols.vue";

import { capitalize } from "@vue/shared";
import { scanGetters } from "@/state/helpers";
import {
  translateKey,
  translateValue,
  decToHexString,
  formatSizeUnits,
} from "@/common/utils/translate";

export default {
  components: { Card, CardTab, CardTabs, TableCols },
  data() {
    return {
      hexa: true,
      file: null,
      currentTab: null,
      currentImport: null,
      treeList: [],
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    switchImport(tab) {
      this.currentImport = tab;
    },
    get_Columns(obj) {
      return Object.keys(obj).map((key) => ({
        key: key,
        title: translateKey(key),
      }));
    },
    get_Descriptor_line(obj) {
      let item = {};
      Object.keys(obj).map((key) => {
        let val = obj[key];
        val = translateValue(key, val);
        val = !isNaN(val) && this.hexa ? decToHexString(val) : val;

        item[key] = val;
      });

      return [item];
    },
  },
  computed: {
    ...scanGetters,
    getFirstTree() {
      return Object.keys(this.getFilePE).map((item) => ({
        name: item,
        title: capitalize(item),
      }));
    },
    get_DosHeader() {
      let items = this.getFilePE[this.currentTab];
      return Object.keys(items).map((key) => {
        let val = translateValue(key, items[key]);

        return {
          member: translateKey(key),
          value: this.hexa && !isNaN(val) ? decToHexString(val) : val,
        };
      });
    },
    get_NtHeader() {
      let items = this.getFilePE[this.currentTab];

      return {
        fileHeader: [
          {
            member: "Signature",
            value:
              this.hexa && !isNaN(items.Signature)
                ? decToHexString(items.Signature)
                : items.Signature,
            format: items.Signature,
          },
          ...Object.keys(items.FileHeader).map((key) => {
            let val = items.FileHeader[key];
            let frm = translateValue(key, val);
            val = this.hexa && !isNaN(val) ? decToHexString(val) : val;

            return {
              member: translateKey(key),
              value: val,
              format: frm == val ? "" : frm,
            };
          }),
        ],
        optionalHeader: Object.keys(items.OptionalHeader || {})
          .filter((key) => !["DataDirectory"].includes(key))
          .map((key) => {
            let val = items.OptionalHeader[key];
            let frm = translateValue(key, val);
            val = this.hexa && !isNaN(val) ? decToHexString(val) : val;

            return {
              member: translateKey(key),
              value: val,
              format: frm == val ? "" : frm,
            };
          }),
        dataDirevtory: (items.OptionalHeader.DataDirectory || [])
          .filter((item) => item.Size || item.VirtualAddress)
          .map((item) => {
            return {
              key: decToHexString(item.VirtualAddress),
              value:
                this.hexa && !isNaN(item.Size)
                  ? decToHexString(item.Size)
                  : item.Size,
              format: formatSizeUnits(item.Size),
            };
          }),
      };
    },
    get_IAT() {
      let items = this.getFilePE[this.currentTab];

      let nitems = (items || []).map((item) => {
        return {
          index: item.Index,
          rva: this.hexa ? decToHexString(item.Rva) : item.Rva,
          value: this.hexa ? decToHexString(item.Value) : item.Value,
          meaning: item.Meaning,
        };
      });

      return nitems;
    },
    get_Imports() {
      let items = this.getFilePE[this.currentTab] || [];

      return items.map((item) => {
        return item;
      });
    },
    get_Imports_tabs() {
      return this.get_Imports.map((item) => ({
        name: item.Name,
        title: item.Offset,
      }));
    },
    get_Header() {
      return this.getFilePE[this.currentTab];
    },
  },
  async beforeMount() {
    this.file = await this.getFileSummary;

    this.treeList = this.getFirstTree.filter(
      (key) => !["Is32", "Is64"].includes(key.name)
    );

    this.currentTab = this.treeList[0].name;
    this.currentImport = this.get_Imports[0].Name;
  },
};
</script>

<style lang="scss">
.pe-tree {
  &,
  table {
    @apply w-full;
  }

  // Tab
  .card-tabs {
    @apply shadow-none;
    @apply p-4;

    &.tab-mode-vertical {
      @apply flex py-0 items-start;
      // lg:grid lg:grid-cols-12;
      .tab-contents {
        @apply py-0 w-full;
      }
    }

    .active {
      @apply font-bold;
    }
  }

  .tree-val {
    &,
    * {
      @apply break-all w-full;
    }
  }
  table,
  .tab-contents {
    @apply w-full;
  }
  table {
    @apply my-0;
  }
  tr,
  td {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .divider {
    @apply my-4 border-b border-gray-light border-opacity-80;
  }

  .tab-contents {
    @apply break-words;
  }
  code {
    @apply break-all;
  }
}
</style>