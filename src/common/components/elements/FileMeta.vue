<template>
  <div class="filemeta">
    <div>
      <h4>Classification</h4>
      <p :class="getClassification.color">
        <svg class="mr-1" width="22" height="22" viewBox="0 0 24 24">
          <use
            :xlink:href="`/assets/icons/classification.svg#${getClassification.icon}`"
            width="15"
            height="15"
          ></use>
        </svg>
        <span>{{ getClassification.title }}</span>
      </p>
    </div>
    <div>
      <h4>Antivirus</h4>
      <p>{{ getScore.value }}/{{ getScore.count }}</p>
    </div>
    <div>
      <h4>File Name</h4>
      <p @click="nameHover = true" v-if="!nameHover" :alt="filename">
        {{ getFileName }}
      </p>
      <input
        v-if="nameHover"
        type="text"
        :value="filename"
        @mouseenter="$event.target.select()"
        @mouseleave="nameHover = false"
      />
    </div>
  </div>
</template>

<script>
import { getClass } from "@/common/classification";

export default {
  data: () => ({
    nameHover: false,
  }),
  props: {
    filename: {
      type: String,
    },
    scan: {
      type: Object,
      default: () => {
        return {
          count: 0,
          value: 0,
        };
      },
    },
    classification: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    getFileName() {
      const max = 30;
      let name = this.filename || "";

      if (name.length > max) {
        name = name.slice(0, max * 0.4) + "..." + name.slice(-max * 0.4);
      }

      return name;
    },
    getScore() {
      return this.scan;
    },
    getClassification() {
      return getClass(this.classification);
    },
  },
};
</script>

<style lang="scss" scoped>
.filemeta {
  @apply mt-4 flex flex-wrap gap-x-8 gap-y-2 justify-start fill-current;

  h4 {
    @apply font-bold text-sm uppercase text-gray;
  }

  p {
    @apply font-bold flex items-center text-sm mt-1;
  }

  .red {
    @apply text-danger;
  }

  .green {
    @apply text-success;
  }

  .orange {
    @apply text-warning;
  }
}
</style>
