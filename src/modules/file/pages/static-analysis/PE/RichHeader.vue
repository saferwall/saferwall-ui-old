<template>
  <table-cols
    :bordered="true"
    :columns="[
      { key: 'member', title: 'Member' },
      { key: 'value', title: 'Value' },
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
} from "@/common/utils/translate";

export default {
  components: { TableCols },
  props: {
    items: {},
  },
  computed: {
    getLines() {
      return Object.keys(this.items).map((key) => {
        let val = translateValue(key, this.items[key]);

        return {
          member: translateKey(key),
          value: this.hexa && !isNaN(val) ? decToHexString(val) : val,
        };
      });
    },
  },
};
</script>