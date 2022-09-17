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
              :bordered="false"
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
              :bordered="false"
              :lines="get_NtHeader.fileHeader"
            />
            <div class="divider"></div>
            <table-cols
              title="Optional Header"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="false"
              :lines="get_NtHeader.optionalHeader"
            />
            <div class="divider"></div>
            <table-cols
              title="Data Directory"
              :htmlFields="['format']"
              :customFields="false"
              :bordered="false"
              :columns="[
                { key: 'key', title: '' },
                { key: 'value', title: '' },
                { key: 'format', title: '' },
              ]"
              :lines="get_NtHeader.dataDirevtory"
            />
          </card-tab>
          <!-- End NtHeader -->

          <!-- Start Export -->
          <card-tab :active="'export' == currentTab">
            <div class="table-vertical">
              <table-cols
                title="Export"
                :htmlFields="['format']"
                :customFields="false"
                :bordered="false"
                :lines="get_Export.export"
              />
            </div>
            <div class="export-functions">
              <table-cols
                title="functions"
                :bordered="false"
                :columns="get_Export_Functions_Columns()"
                :lines="get_Export.functions"
              />
            </div>
          </card-tab>
          <!-- End Export -->

          <!-- Start Imports -->
          <card-tab :active="'import' == currentTab">
            <h2 class="title title-h2">Import</h2>
            <div class="import-table">
              <table class="accorion-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Name RVA</th>
                    <th>OFT</th>
                    <th>FT</th>
                    <th>Time Stamp</th>
                    <th>Forwarder Chain</th>
                  </tr>
                </thead>
                <tbody class="table-cval accorion-tbody">
                  <template v-for="(importItem, index) in importData" :key="index">
                    <tr
                      v-bind:class="{ 'force-border': !importItem.contentVisible, 'no-border-odd': importItem.contentVisible }"
                      @click="showFunctions(importItem)"
                    >
                      <td v-for="(line, _index) in get_Descriptor_line(importItem)" :key="_index">
                        <div v-if="_index == 0" class="accordion-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            v-if="!importItem.contentVisible"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#AFAFAF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <svg
                            v-if="importItem.contentVisible"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        {{line}}
                      </td>
                    </tr>
                    <tr
                      v-bind:class="{ 'no-border-even': importItem.contentVisible }"
                      v-if="importItem.contentVisible"
                    >
                      <td :colspan="6">
                        <div class="accordian-body">
                          <table-cols
                            title="functions"
                            :bordered="false"
                            :columns="get_Import_Functions_Columns()"
                            :lines="get_Import_Functions_Lines(importItem.functions)"
                          />
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </card-tab>
          <!-- End Imports -->

          <!-- Start Delay Imports -->
          <card-tab :active="'delay_import' == currentTab">
            <div class="import-table">
              <h2 class="title title-h2">Delay imports</h2>
              <table class="accorion-table">
                <thead>
                  <tr>
                    <th>Attributes</th>
                    <th>Name</th>
                    <th>HModule</th>
                    <th>IAT</th>
                    <th>INT</th>
                    <th>Bound IAT</th>
                    <th>Unload IAT</th>
                    <th>TimeDateStamp</th>
                  </tr>
                </thead>
                <tbody class="table-cval accorion-tbody">
                  <template v-for="(importItem, index) in delayImportData" :key="index">
                    <tr
                      v-bind:class="{ 'force-border': !importItem.contentVisible, 'no-border-odd': importItem.contentVisible }"
                      @click="showDelayFunctions(importItem)"
                    >
                      <td
                        v-for="(line, _index) in get_Delay_Descriptor_line(importItem)"
                        :key="_index"
                      >
                        <div v-if="_index == 0" class="accordion-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            v-if="!importItem.contentVisible"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#AFAFAF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <svg
                            v-if="importItem.contentVisible"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        {{line}}
                      </td>
                    </tr>
                    <tr
                      v-bind:class="{ 'no-border-even': importItem.contentVisible }"
                      v-if="importItem.contentVisible"
                    >
                      <td :colspan="7">
                        <div class="accordian-body">
                          <table-cols
                            title="functions"
                            :bordered="false"
                            :columns="get_Delay_Import_Functions_Columns()"
                            :lines="get_Delay_Import_Functions_Lines(importItem.functions)"
                          />
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </card-tab>
          <!-- End Delay Imports -->

          <!-- Start Imports -->
          <card-tab :active="'reloc' == currentTab">
            <h2 class="title title-h2">Relocations</h2>
            <div class="import-table">
              <table class="accorion-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Entry RVA</th>
                    <th>Size of Block</th>
                    <th>Items Count</th>
                  </tr>
                </thead>
                <tbody class="table-cval accorion-tbody">
                  <template v-for="(relocItem, index) in relocData" :key="index">
                    <tr
                      v-bind:class="{ 'force-border': !relocItem.contentVisible, 'no-border-odd': relocItem.contentVisible }"
                      @click="showRelocEntries(relocItem)"
                    >
                      <td v-for="(line, _index) in get_Reloc_line(relocItem, index)" :key="_index">
                        <div v-if="_index == 0" class="accordion-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            v-if="!relocItem.contentVisible"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#AFAFAF"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <svg
                            v-if="relocItem.contentVisible"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                        {{line}}
                      </td>
                    </tr>
                    <tr
                      v-bind:class="{ 'no-border-even': relocItem.contentVisible }"
                      v-if="relocItem.contentVisible"
                    >
                      <td :colspan="4">
                        <div class="accordian-body">
                          <table-cols
                            title="Entries"
                            :bordered="false"
                            :columns="get_Reloc_Entries_Columns()"
                            :lines="get_Reloc_Entries_Lines(relocItem.entries)"
                          />
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </card-tab>
          <!-- End Imports -->

          <!-- Start RichHeader -->
          <card-tab :active="'rich_header' == currentTab">
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
          <card-tab :active="'sections' == currentTab">
            <template v-for="section in get_Sections" :key="section.name">
              <div class="table-vertical">
                <table-cols
                  :title="section.name"
                  :customFields="false"
                  :bordered="false"
                  :lines="section.header"
                />
                <div class="divider"></div>
              </div>
            </template>
          </card-tab>
          <!-- End Sections -->

          <!-- Start Resources -->
          <card-tab :active="'Resources' == currentTab">
            <table-cols
              title="Struct"
              :customFields="false"
              :bordered="false"
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
                <table-cols :striped="true" :bordered="false" :lines="get_Entry_Basic(EntryItem)"></table-cols>
                <div class="divider"></div>
                <table-cols
                  title="Directory"
                  :bordered="false"
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
  sectionFlagToString,
  decToHexString,
  //formatSizeUnits,
  prodIdToStr,
  RelocTypeToString,
  hexToASCII,
  asciiReversed,
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
      importData: [],
      delayImportData: [],
      relocData: [],
    };
  },
  methods: {
    showFunctions(item) {
      this.importData.forEach(function (_import) {
        if (_import != item) _import.contentVisible = false;
      });
      item.contentVisible = !item.contentVisible;
    },
    showDelayFunctions(item) {
      this.delayImportData.forEach(function (_import) {
        if (_import != item) _import.contentVisible = false;
      });
      item.contentVisible = !item.contentVisible;
    },
    showRelocEntries(item) {
      this.relocData.forEach(function (_reloc) {
        if (_reloc != item) _reloc.contentVisible = false;
      });
      item.contentVisible = !item.contentVisible;
    },
    getDirectoryName(index) {
      switch (index) {
        case 0:
          return "Export Directory";
        case 1:
          return "Import Directory";
        case 2:
          return "Resource Directory";
        case 3:
          return "Exception Directory";
        case 4:
          return "Security Directory";
        case 5:
          return "Base Relocation Table";
        case 6:
          return "Debug Directory";
        case 7:
          return "Architecture specific";
        case 8:
          return "RVA of GlobalPointer";
        case 9:
          return "TLS Directory";
        case 10:
          return "Load Config Directory";
        case 11:
          return "Bound Import Directory";
        case 12:
          return "Import Address Table";
        case 13:
          return "Delay Import Descriptors";
        case 14:
          return "COM Runtime Descriptor";
        case 15:
          return "Reserved";
      }
      return "";
    },
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
          if (this.currentTab == "import") {
            this.importData = this.get_Imports();
          }
          if (this.currentTab == "delay_import") {
            this.delayImportData = this.get_Delay_Imports();
          }
          if (this.currentTab == "reloc") {
            this.relocData = this.get_Reloc();
          }
        });
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
          contentVisible: false,
        };
      });
    },
    get_Delay_Imports() {
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
          contentVisible: false,
        };
      });
    },
    get_Reloc() {
      let items = this.getSelectedItems();

      return items.map((item) => {
        return {
          entries: (item.Entries || []).map((_func) => {
            let func = {};
            Object.keys(_func).forEach((_key) => {
              let val = _func[_key];

              func[_key] = this.hexa && !isNaN(val) ? decToHexString(val) : val;
            });
            return func;
          }),
          data: item.Data,
          contentVisible: false,
        };
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
    get_Export_Functions_Columns() {
      return ["Name", "Ordinal", "NameRVA", "FunctionRVA", "Forwarder"].map(
        (key) => ({
          key: key,
          title: translateKey(key),
        })
      );
    },
    get_Import_Functions_Columns() {
      return [
        "Name",
        "ThunkRVA",
        "ThunkValue",
        "OriginalThunkRVA",
        "OriginalThunkValue",
        "Hint",
      ].map((key) => ({
        key: key,
        title: translateKey(key),
      }));
    },
    get_Import_Functions_Lines(obj) {
      return Object.keys(obj).map((key) => {
        let functionItem = obj[key];

        let func = {};
        [
          "Name",
          "ThunkRVA",
          "ThunkValue",
          "OriginalThunkRVA",
          "OriginalThunkValue",
          "Hint",
        ].map((key) => {
          let val = functionItem[key];
          func[key] = val;
        });
        return func;
      });
    },
    get_Delay_Import_Functions_Columns() {
      return [
        "Name",
        "ThunkRVA",
        "ThunkValue",
        "OriginalThunkRVA",
        "OriginalThunkValue",
        "Hint",
      ].map((key) => ({
        key: key,
        title: translateKey(key),
      }));
    },
    get_Delay_Import_Functions_Lines(obj) {
      return Object.keys(obj).map((key) => {
        let functionItem = obj[key];

        let func = {};
        [
          "Name",
          "ThunkRVA",
          "ThunkValue",
          "OriginalThunkRVA",
          "OriginalThunkValue",
          "Hint",
        ].map((key) => {
          let val = functionItem[key];
          func[key] = val;
        });
        return func;
      });
    },

    get_Reloc_Entries_Columns() {
      return ["Offset", "Data", "Type", "TypeValue"].map((key) => ({
        key: key,
        title: translateKey(key),
      }));
    },
    get_Reloc_Entries_Lines(obj) {
      return Object.keys(obj).map((key) => {
        let functionItem = obj[key];

        let func = {};
        ["Offset", "Data", "Type"].map((key) => {
          let val = functionItem[key];
          func[key] = val;
        });

        func["TypeValue"] = RelocTypeToString(functionItem["Type"]);
        return func;
      });
    },
    get_Descriptor_line(obj) {
      let item = [
        obj.name,
        ...[
          "Name",
          "OriginalFirstThunk",
          "FirstThunk",
          "TimeDateStamp",
          "ForwarderChain",
        ].map((key) => {
          let val = obj.descriptor[key];
          val = translateValue(key, val);
          val = !isNaN(val) ? decToHexString(val) : val;

          return val;
        }),
      ];
      return item;
    },
    get_Delay_Descriptor_line(obj) {
      let item = [
        ...[
          "Attributes",
          "Name",
          "ModuleHandleRVA",
          "ImportAddressTableRVA",
          "ImportNameTableRVA",
          "BoundImportAddressTableRVA",
          "UnloadInformationTableRVA",
          "TimeDateStamp",
        ].map((key) => {
          let val = obj.descriptor[key];
          val = translateValue(key, val);
          val = !isNaN(val) ? val : val;
          //decToHexString

          if (key == "Name") val = obj.name;

          return val;
        }),
      ];
      return item;
    },
    get_Reloc_line(obj, index) {
      let item = [
        index,
        ...["VirtualAddress", "SizeOfBlock"].map((key) => {
          let val = obj.data[key];
          val = translateValue(key, val);
          val = !isNaN(val) ? decToHexString(val) : val;

          return val;
        }),
        obj.entries.length,
      ];
      return item;
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
            format: asciiReversed(
              hexToASCII(
                this.hexa && !isNaN(items.Signature)
                  ? decToHexString(items.Signature)
                  : items.Signature
              )
            ),
          },
          ...[
            "Machine",
            "NumberOfSections",
            "TimeDateStamp",
            "PointerToSymbolTable",
            "NumberOfSymbols",
            "SizeOfOptionalHeader",
            "Characteristics",
          ].map((key) => {
            let val = items.FileHeader ? items.FileHeader[key] : "";
            let frm = translateValue(key, val);
            val = this.hexa && !isNaN(val) ? decToHexString(val) : val;

            return {
              member: translateKey(key),
              value: val,
              format: frm == val ? "" : frm,
            };
          }),
        ],
        optionalHeader: [
          "Magic",
          "MajorLinkerVersion",
          "MinorLinkerVersion",
          "SizeOfCode",
          "SizeOfInitializedData",
          "SizeOfUninitializedData",
          "BaseOfCode",
          "BaseOfData",
          "ImageBase",
          "SectionAlignment",
          "FileAlignment",
          "MajorOperatingSystemVersion",
          "MinorOperatingSystemVersion",
          "MajorImageVersion",
          "MinorImageVersion",
          "MajorSubsystemVersion",
          "MinorSubsystemVersion",
          "Win32VersionValue",
          "SizeOfImage",
          "SizeOfHeaders",
          "CheckSum",
          "Subsystem",
          "DllCharacteristics",
          "SizeOfStackReserve",
          "SizeOfStackCommit",
          "SizeOfHeapReserve",
          "SizeOfHeapCommit",
          "LoaderFlags",
          "NumberOfRvaAndSizes",
        ]
          .filter((key) => !["DataDirectory"].includes(key))
          .map((key) => {
            let val = items.OptionalHeader ? items.OptionalHeader[key] : "";
            let frm = translateValue(key, val);
            val = this.hexa && !isNaN(val) ? decToHexString(val) : val;

            return {
              member: translateKey(key),
              value: val,
              format: frm == val ? "" : frm,
            };
          }),
        dataDirevtory: (
          (items.OptionalHeader && items.OptionalHeader.DataDirectory) ||
          []
        ).map((item, index) => {
          return {
            key: this.getDirectoryName(index),
            value: decToHexString(item.VirtualAddress),
            format:
              this.hexa && !isNaN(item.Size)
                ? decToHexString(item.Size)
                : item.Size,
            //format: formatSizeUnits(item.Size),
          };
        }),
      };
    },
    get_Export() {
      let items =
        (this.getFilePEData && this.getFilePEData[this.currentTab]) || [];

      return {
        export: [
          ...[
            "Characteristics",
            "TimeDateStamp",
            "MajorVersion",
            "MinorVersion",
            "Name",
            "Base",
            "NumberOfFunctions",
            "NumberOfNames",
            "AddressOfFunctions",
            "AddressOfNames",
            "AddressOfNameOrdinals",
          ].map((key) => {
            let val = items.Struct ? items.Struct[key] : "";
            let frm = translateValue(key, val);
            val = this.hexa && !isNaN(val) ? decToHexString(val) : val;

            return {
              member: translateKey(key),
              value: val,
              format: frm == val ? "" : frm,
            };
          }),
        ],
        functions:
          items && items.Functions
            ? Object.keys(items.Functions).map((key) => {
                let functionItem = items.Functions[key];

                let func = {};
                ["Name", "Ordinal", "NameRVA", "FunctionRVA", "Forwarder"].map(
                  (key) => {
                    let val = functionItem[key];
                    func[key] = val;
                  }
                );
                return func;
              })
            : [],
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
        let header = [
          {
            title: "Entropy",
            value: _section.Entropy,
            comment: "",
          },
          ...Object.keys(_section.Header).map((_key) => {
            let val = _section.Header[_key];
            let frm =
              _key == "Characteristics"
                ? sectionFlagToString(val).join(", ")
                : translateValue(_key, val);
            val = !isNaN(val) ? decToHexString(val) : val;

            return {
              title: _key,
              value: val,
              comment: frm == val ? "" : frm,
            };
          }),
        ];
        let func = "";
        Object.keys(_section.Header["Name"]).forEach((_key) => {
          let val = _section.Header["Name"][_key];
          val = !isNaN(val) ? decToHexString(val) : val;

          func = func + "" + hexToASCII(val);
        });
        return {
          name: func,
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
    .title-h2 {
      padding: 0.75rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 700;
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
.table-vertical {
  tr {
    td {
      font-size: 0.85rem !important;
      font-weight: 500 !important;
      padding-top: 0.3rem !important;
      padding-bottom: 0.3rem !important;
    }
    td:first-child {
      font-weight: 600 !important;
    }
  }
}
.import-table {
  .accorion-table {
    border-collapse: separate;
    border-spacing: 0 1rem;
    .accorion-tbody {
      .accordian-body {
        padding: 0px 2rem;
        table {
          border-collapse: initial;
          border-spacing: 0 0rem;
          tr td {
            padding-top: 0.4rem !important;
            padding-bottom: 0.4rem !important;
          }
        }
      }
      > tr {
        cursor: pointer;
        position: relative;
        &::after {
          content: " ";
          border: 1px solid #e2e2e2;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          position: absolute;
          left: -10px;
        }
        td {
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        }
      }
      > tr.no-border-odd {
        &::after {
          border-bottom: none;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      > tr.no-border-even {
        td {
          padding-top: 0 !important;
          font-size: 0.85rem;
        }
        &::after {
          border-top: none;
          border-top-right-radius: 0;
          border-top-left-radius: 0;
          top: -1rem;
          height: calc(100% + 1rem);
        }
      }
      > tr.force-border:nth-child(odd) {
        &::after {
          border-bottom: 1px solid #e2e2e2;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
      > tr.force-border:nth-child(even) {
        &::after {
          border-top: 1px solid #e2e2e2;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
      }
    }
    th {
      text-align: left;
    }
    .accordion-icon {
      display: inline-block;
      svg {
        display: inline-block;
      }
    }
    h2 {
      font-family: "Manrope";
      font-style: normal;
      font-weight: 700;
      font-size: 1.1rem;
      line-height: 25px;
      color: #0d9677;
      text-transform: capitalize;
      margin-bottom: 1rem !important;
      margin-top: 0rem !important;
      margin-left: 25px;
      position: relative;
      padding: 0;
      &::before {
        content: " ";
        background-color: #0d9677;
        width: 3px;
        height: 100%;
        position: absolute;
        left: -1.5rem;
      }
    }
  }
}
.export-functions {
  border: 1px solid #dddddd;
  border-radius: 9px;
  padding: 1rem;
  margin-top: 2rem;
  h2.title {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    color: #0d9677;
    margin-bottom: 1rem;
  }
}
</style>