<template >
  <div class="pe-tree">
    <Card title>
      <div>
        <card-tabs
          :tabs="treeList"
          v-on:switchTab="switchTab($event)"
          :active="currentTab"
          mode="vertical"
        >
          <!-- Start DosHeader -->
          <card-tab :active="'dos_header' == currentTab">
            <dos-header :items="getItems"></dos-header>
          </card-tab>
          <!-- End DosHeader -->

          <!-- Start IAT -->
          <card-tab :active="'iat' == currentTab">
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
          <!-- End IAT -->

          <!-- Start Header -->
          <card-tab :active="'header' == currentTab">
            <pre class="px-4">{{ get_Header }}</pre>
          </card-tab>
          <!-- End Header -->

          <!-- Start NtHeader -->
          <card-tab :active="'nt_header' == currentTab">
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
          <!-- End NtHeader -->

          <!-- Start Imports -->
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
                :active="
                  currentImport
                    ? importItem.name == currentImport
                    : !currentImport && index == 0
                "
              >
                <table-cols
                  :striped="true"
                  :bordered="true"
                  :lines="[
                    { key: 'Name', value: importItem.name },
                    {
                      key: 'Offset',
                      value: importItem.offset,
                    },
                  ]"
                ></table-cols>
                <div class="divider"></div>
                <table-cols
                  title="Descriptor"
                  :bordered="true"
                  :columns="get_Columns(importItem.descriptor)"
                  :lines="get_Descriptor_line(importItem.descriptor)"
                />
                <div class="divider"></div>
                <table-cols
                  title="functions"
                  :bordered="true"
                  :columns="get_Columns(importItem.functions[0])"
                  :lines="importItem.functions"
                />
                <div class="divider"></div>
              </card-tab>
            </card-tabs>
          </card-tab>
          <!-- End Imports -->

          <!-- Start RichHeader -->
          <card-tab :active="'rich_header' == currentTab">
            <table-cols
              v-if="false"
              title="Rich Header"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="true"
              :lines="get_RichHeader.basic"
            />
            <div v-if="false" class="divider"></div>
            <table-cols
              title="Rich header"
              :customFields="false"
              :bordered="false"
              :columns="
                get_RichHeader.compIds.length > 0
                  ? get_Columns(get_RichHeader.compIds[0])
                  : []
              "
              :lines="get_RichHeader.compIds"
            />
          </card-tab>
          <!-- End RichHeader -->

          <!-- Start Sections -->
          <card-tab :active="'Sections' == currentTab">
            <template v-for="section in get_Sections" :key="section.name">
              <table-cols
                :title="section.name"
                :customFields="false"
                :bordered="true"
                :lines="section.header"
              />
              <div class="divider"></div>
            </template>
          </card-tab>
          <!-- End Sections -->

          <!-- Start Resources -->
          <card-tab :active="'Resources' == currentTab">
            <table-cols
              title="Struct"
              :customFields="false"
              :bordered="true"
              :htmlFields="['value']"
              :lines="get_Resources.struct"
            />
            <div class="divider"></div>
            <card-tabs
              :tabs="get_Resources_Tabs"
              :mode="'vertical'"
              :active="currentEntry"
              v-on:switchTab="switchEntry($event)"
            >
              <card-tab
                v-for="(EntryItem, index) in get_Resources.entries"
                :key="index"
                :active="
                  currentEntry
                    ? EntryItem.id == currentEntry
                    : !currentEntry && index == 0
                "
              >
                <table-cols :striped="true" :bordered="true" :lines="get_Entry_Basic(EntryItem)"></table-cols>
                <div class="divider"></div>
                <table-cols
                  title="Directory"
                  :bordered="true"
                  :columns="get_Columns(EntryItem.directory.Entries[0])"
                  :lines="EntryItem.directory.Entries"
                />
                <div class="divider"></div>
              </card-tab>
            </card-tabs>
          </card-tab>
          <!-- End Resources -->
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
import DosHeader from "./PE/DosHeader.vue";

import hexdump from "buffer-hexdump";

import axios from "@/services/axios";

//import { capitalize } from "@vue/shared";
import { fileGetters } from "@/state/helpers";
import {
  translateKey,
  translateValue,
  decToHexString,
  formatSizeUnits,
  prodIdToStr,
  humanize,
  prodIdToVsVersion,
} from "@/common/utils/translate";

export default {
  components: { Card, CardTab, CardTabs, TableCols, DosHeader },
  data() {
    return {
      hexa: true,
      file: null,
      currentTab: null,
      currentImport: null,
      currentEntry: null,
      getFilePEData: null,
      treeList: [],
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
      this.getTabData(tab);
    },
    switchImport(tab) {
      this.currentImport = tab;
    },
    getTabData(tab) {
      return axios
        .get(`/files/${this.getSha256}?fields=pe.` + tab)
        .then(({ data }) => {
          this.getFilePEData = data.pe;
        });
    },
    switchEntry(tab) {
      this.currentEntry = tab;
    },
    get_Columns(obj) {
      return Object.keys(obj || {}).map((key) => ({
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
    getSelectedItems() {
      return this.getFilePEData[this.currentTab] || [];
    },
    get_Entry_Basic(item) {
      return [
        { key: "ID", value: item.id },
        { key: "Name", value: item.name },
        { key: "Struct Name", value: item.struct.Name },
        {
          key: "Struct OffsetToData",
          value: item.struct.OffsetToData,
        },
      ].map((_item) => {
        let val = _item.value;
        val = translateValue(_item.key, _item.value);
        if (this.hexa && !isNaN(val)) {
          _item.value = decToHexString(val);
        }
        return _item;
      });
    },
  },
  computed: {
    ...fileGetters,
    getItems() {
      return (this.getFilePEData && this.getFilePEData[this.currentTab]) || [];
    },
    getFirstTree() {
      return Object.values(this.getFilePE.meta).map((item) => ({
        name: item,
        title: humanize(item),
      }));
    },
    get_NtHeader() {
      let items =
        (this.getFilePEData && this.getFilePEData[this.currentTab]) || [];

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
      let items =
        (this.getFilePEData && this.getFilePEData[this.currentTab]) || [];

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
      let items = this.getSelectedItems();

      return items.map((item) => {
        return {
          name: item.Name,
          offset: item.Offset,
          functions: (item.Functions || []).map((_func) => {
            let func = {};
            Object.keys(_func).forEach((_key) => {
              let val = _func[_key];

              func[_key] = this.hexa && !isNaN(val) ? decToHexString(val) : val;
            });
            return func;
          }),
          descriptor: item.Descriptor,
        };
      });
    },
    get_Imports_tabs() {
      return this.get_Imports.map((item) => ({
        name: item.name,
        title: item.name,
      }));
    },
    get_Resources_Tabs() {
      return this.get_Resources.entries.map((item) => ({
        name: item.id,
        title: item.id,
      }));
    },
    get_Header() {
      const buffer = Buffer.from(
        (this.getFilePEData && this.getFilePEData[this.currentTab]) || [],
        "base64"
      );
      return hexdump(buffer);
    },
    get_RichHeader() {
      let richeader = this.getSelectedItems();

      return {
        basic: Object.keys(richeader || {})
          .filter((_key) =>
            ["string", "number"].includes(typeof richeader[_key])
          )
          .map((_key) => {
            let val = translateValue(_key, richeader[_key]);
            return {
              title: translateKey(_key),
              value: this.hexa ? decToHexString(val) : val,
            };
          }),
        compIds: (richeader.CompIDs || []).map((_item) => {
          let item = {};
          Object.keys(_item).forEach((_key) => {
            let val = translateValue(_key, _item[_key]);
            item[_key] = this.hexa ? decToHexString(val) : val;
          });
          item["MS internal Name"] = prodIdToStr(_item["ProdID"]);
          item["Visual Studio Version"] = prodIdToVsVersion(_item["ProdID"]);
          return item;
        }),
      };
    },
    get_Sections() {
      let items = this.getSelectedItems();

      return items.map((_section) => {
        let header = Object.keys(_section.Header).map((_key) => {
          let val = _section.Header[_key];
          return {
            title: _key,
            value: this.hexa && !isNaN(val) ? decToHexString(val) : val,
          };
        });
        return {
          name: `Entropy`,
          header: header,
        };
      });
    },
    get_Resources() {
      let items = this.getSelectedItems();

      return {
        struct: Object.keys(items.Struct || []).map((_struct) => {
          let val = translateValue(_struct, items.Struct[_struct]);
          return {
            title: translateKey(_struct),
            value: this.hexa && !isNaN(val) ? decToHexString(val) : val,
          };
        }),
        entries: items.Entries.map((_entry) => {
          return {
            struct: _entry.Struct,
            name: _entry.Name,
            id: _entry.ID,
            directory: _entry.Directory || [],
          };
        }),
      };
    },
  },
  async beforeMount() {
    this.file = await this.getFile;

    console.log("hexa", this.hash);

    this.treeList = this.getFirstTree.filter(
      (key) => !["Is32", "Is64"].includes(key.name)
    );

    this.currentTab = this.treeList[0]?.name;

    this.getTabData(this.currentTab);
  },
};
</script>

<style lang="scss">
.pe-tree {
  &,
  table {
    @apply w-full;
  }

  .card {
    padding-top: 1rem;
    padding-left: 0;
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
    .tab-content {
      padding-left: 2rem;
      padding-top: 1rem;
    }
    .title {
      margin-bottom: 2rem;
    }
    table {
      thead {
        th {
          font-family: "Manrope";
          font-style: normal;
          font-weight: 700;
          font-size: 0.9rem;
          color: #000000;
          text-transform: none;
        }
      }
      .table-cval {
        tr {
          td {
            font-family: "Manrope";
            font-style: normal;
            font-weight: 500;
            font-size: 0.9rem;
            color: #404040;
          }
        }
      }
    }
  }
  code {
    @apply break-all;
  }
}
</style>