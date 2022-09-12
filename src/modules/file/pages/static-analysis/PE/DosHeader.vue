<template>
  <table-cols
    :bordered="true"
    :columns="[
      { key: 'member', title: 'Member' },
      { key: 'value', title: 'Value' },
      { key: 'comment', title: 'Comment' },
    ]"
    :lines="getLines"
  />
</template>
<script>
import TableCols from "@/common/components/tables/TableCols.vue";
import {
  translateKey,
  translateValue,
  decToHexString,
  hexToASCII,
} from "@/common/utils/translate";

export default {
  components: { TableCols },
  props: {
    items: {},
  },
  computed: {
    getLines() {
      return [
        "Magic",
        "BytesOnLastPageOfFile",
        "PagesInFile",
        "Relocations",
        "SizeOfHeader",
        "MinExtraParagraphsNeeded",
        "MaxExtraParagraphsNeeded",
        "InitialSS",
        "InitialSP",
        "Checksum",
        "InitialIP",
        "InitialCS",
        "OverlayNumber",
        "OEMIdentifier",
        "OEMInformation",
        "AddressOfNewEXEHeader",
      ].map((key) => {
        let val = this.items[key];
        let frm = translateValue(key, val);
        val = !isNaN(val) ? decToHexString(val) : val;

        return {
          member: translateKey(key),
          value: val,
          comment: frm == val ? "" : hexToASCII(val),
        };
      });

      /*
      return Object.keys(this.items).map((key) => {
        let val = translateValue(key, this.items[key]);

        return {
          member: translateKey(key),
          value: this.hexa && !isNaN(val) ? decToHexString(val) : val,
        };
      });
      */
    },
  },
};
</script>