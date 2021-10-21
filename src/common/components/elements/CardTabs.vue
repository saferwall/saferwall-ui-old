<template>
  <card class="card-tabs" :class="`tab-mode-${mode}`">
    <div class="tab-headers">
      <div
        class="tab-th flex items-center"
        v-for="tab in tabs"
        v-bind:key="tab.name || tab.title"
        @click="switchTab(tab)"
        :class="isTabActive(tab) ? 'active' : ''"
      >
        <template v-if="isTabActive(tab) && mode == 'horizontal'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </template>
        {{ tab.title }}
      </div>
    </div>

    <div class="tab-contents">
      <slot :active="active" />
    </div>
  </card>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: { Card },
  props: {
    tabs: {
      default: [],
    },
    mode: {
      type: String,
      default: "horizontal",
    },
    active: {
      type: String,
    },
  },
  emits: ["switchTab"],
  methods: {
    isTabActive(tab) {
      return this.active == (tab.name || tab.title);
    },
    switchTab(tab) {
      let activeTab = tab.name || tab.title;
      this.$emit("switchTab", activeTab);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-tabs {
  @apply px-0;

  .tab-headers,
  .tab-contents {
    @apply px-8;
  }
  .tab-headers {
    @apply flex flex-wrap justify-center md:justify-start items-center border-gray border-opacity-5;

    .tab-th {
      @apply text-gray py-2;
      @apply md:px-4 cursor-pointer;

      &.active {
        @apply text-primary font-bold md:border-primary md:border-opacity-50;
      }
    }
  }
  &.tab-mode-vertical {
    @apply lg:grid lg:grid-cols-12;

    .tab-headers {
      @apply lg:border-r-2 flex items-start self-start  lg:col-span-3 xl:col-span-2;
      @apply flex flex-col;
    }
    .tab-contents {
      @apply items-start self-start;
      @apply lg:col-span-9  xl:col-span-10 h-full;
      @apply flex flex-col;
    }
    .tab-th {
      &.active {
        @apply border-r-2 border-primary w-full;
      }
    }

    .tab-headers,
    .tab-contents {
      @apply pl-1 pr-0;
    }
  }

  &.tab-mode-horizontal {
    .tab-headers {
      @apply border-b-2 md:space-x-2;
    }

    .tab-th {
      &.active {
        @apply md:border-b-2;
      }
    }
  }
}
</style>