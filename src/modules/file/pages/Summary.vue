<template>
  <div class="summary space-y-2">
    <template v-if="isFileLoaded">
      <Card>
        <Progress
          :first_seen="file.first_seen"
          :last_scanned="file.last_scanned"
          :rate="getScanScore"
          :classification="getClassification"
        />
      </Card>

      <Card v-if="getProperties.length" title="Basic Properties">
        <TableCols
          :striped="true"
          :lines="getProperties"
          :htmlFields="allowHtmlFields.properties"
          :copyFields="['value']"
        />
      </Card>

      <Card v-if="getExifProps.length" title="ExifTool File Metadata">
        <TableCols
          :striped="true"
          :lines="getExifProps"
          :htmlFields="allowHtmlFields.exif"
        />
      </Card>

      <Card v-if="getSubmissions" title="Submissions">
        <TableCols
          :bordered="true"
          :columns="[
            { title: 'Published' },
            { title: 'Name' },
            { title: 'Source' },
            { title: 'Country' },
          ]"
          :lines="getSubmissions"
          :htmlFields="[3]"
        />
      </Card>

      <Card v-if="false" title="Indicators">
        <TableCols
          :bordered="true"
          :columns="[
            { title: 'Description' },
            { title: 'Severity' },
            { title: 'Category' },
            { title: 'Module' },
          ]"
          :lines="[]"
        />
      </Card>

      <Card v-if="getScreenShots.length > 0" title="Virtual Screen">
        <Gallery :images="getScreenShots" />
      </Card>
    </template>
  </div>
</template>

<script>
import Card from "@/common/components/elements/Card.vue";
import Progress from "@/common/components/Progress.vue";
import TableCols from "@/common/components/tables/TableCols.vue";
import Gallery from "@/common/components/tables/Gallery.vue";
import { fileGetters } from "@/state/helpers";
import { isAnAVG } from "@/common/functions";

import {
  translateKey,
  translateValue,
  isoToCountry,
} from "@/common/utils/translate";
import { timestampToDate } from "@/common/utils/date-format";

export default {
  components: {
    Card,
    Progress,
    TableCols,
    Gallery,
  },
  data() {
    return {
      file: null,
      allowHtmlFields: { properties: [], exif: [] },
    };
  },
  computed: {
    ...fileGetters,
    getProperties() {
      let items = this.file.properties || {};

      let data = Object.keys(items)
        .filter((key) => ["string", "number"].includes(typeof items[key]))
        .map((key, index) => {
          let tkey = translateKey(key);
          let tval = translateValue(key, items[key]);

          if (items[key] != tval) {
            this.allowHtmlFields.properties.push(`${index}-value`);
          }

          return {
            title: tkey,
            value: tval,
          };
        });

      data = [
        ...data,
        ...Object.keys(items)
          .filter(
            (key) =>
              items[key] instanceof Array &&
              items[key].reduce(
                (isSimpleArray, item) =>
                  isSimpleArray && ["string", "number"].includes(typeof item),
                true
              )
          )
          .map((key, index) => {
            this.allowHtmlFields.properties.push(
              `${data.length + index}-value`
            );
            return {
              title: translateKey(key),
              value: items[key].join("<br />"),
            };
          }),
      ];

      data.push({
        title: "Tags",
        value: (() => {
          this.allowHtmlFields.properties.push(`${data.length}-value`);
          return (
            `<div class="flex gap-2">` +
            (this.filterTags(items.Tags) || [])
              .map(({ name, avg }) => {
                return `<span class="rounded-md px-3 py-1 text-white ${
                  avg ? "bg-red-500" : "bg-blue-500"
                }">${name}</span>`;
              })
              .join("") +
            `</div>`
          );
        })(),
      });

      return data;
    },
    getExifProps() {
      let items = this.file.exif || {};

      return Object.keys(items)
        .filter((key) => ["string", "number"].includes(typeof items[key]))
        .map((key, index) => {
          let tkey = translateKey(key);
          let tval = translateValue(key, items[key]);

          if (items[key] != tval) {
            this.allowHtmlFields.exif.push(`${index}-value`);
          }

          return {
            title: tkey,
            value: tval,
          };
        });
    },
    getScreenShots() {
      return (this.file.screenshots || []).map((image) => ({ source: image }));
    },
    getSubmissions() {
      return (this.file.submissions || []).map((sub) => [
        timestampToDate(sub.timestamp),
        sub.filename,
        sub.src,
        `<div class="flag"><img class="md-flag" src=${this.getFlagLink(
          sub.country
        )}> <span>${isoToCountry(sub.country)}</span></div>`,
      ]);
    },
    isFileLoaded() {
      return this.file !== null;
    },
    getFirstSubmission() {
      return (this.file.submissions || []).reduce((latest, sub) => {
        if (!latest || latest < sub.timestamp) return sub.timestamp;
        return latest;
      }, null);
    },
    getScanScore() {
      return this.file.multiav;
    },
    getClassification() {
      return this.file.class;
    },
  },
  methods: {
    getFlagLink(iso) {
      return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${iso.toLowerCase()}.svg`;
    },
    filterTags(tags) {
      let tagkeys = Object.keys(tags || {});

      return tagkeys.reduce((all, tagKey) => {
        return [
          ...all,
          ...(tags[tagKey] || []).map((tag) => ({
            name: tag,
            avg: isAnAVG(tag),
          })),
        ];
      }, []);
    },
  },
  created() {},
  async beforeMount() {
    this.file = await this.getFile;
  },
};
</script>
