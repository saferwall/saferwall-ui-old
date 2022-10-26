<template>
  <aside class="sidebar">
    <div class="menu">
      <ul class="content">
        <li class>
          <router-link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Browse files
          </router-link>
        </li>

        <li :class="isPageActive('summary') ? 'active' : ''">
          <router-link :to="getPageLink('summary')">Summary</router-link>
        </li>

        <li v-if="isPE" :class="isPageActive('static-analysis/pe') ? 'active' : ''">
          <router-link :to="getPageLink('static-analysis/pe')">PE</router-link>
        </li>

        <li :class="isPageActive('static-analysis/strings') ? 'active' : ''">
          <router-link :to="getPageLink('static-analysis/strings')">Strings</router-link>
        </li>

        <li :class="isPageActive('static-analysis/antivirus') ? 'active' : ''">
          <router-link :to="getPageLink('static-analysis/antivirus')">Antivirus</router-link>
        </li>

        <li :class="isPageActive('pe') ? 'active' : ''">
          <router-link :to="getPageLink('pe')">Dynamic overview</router-link>
        </li>

        <li :class="isPageActive('pe') ? 'active' : ''">
          <router-link :to="getPageLink('pe')">API Calls</router-link>
        </li>

        <li :class="isPageActive('pe') ? 'active' : ''">
          <router-link :to="getPageLink('pe')">Files & MemDumps</router-link>
        </li>

        <li :class="isPageActive('comments') ? 'active' : ''">
          <router-link :to="getPageLink('comments')">Comments</router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { fileGetters } from "@/state/helpers";

export default {
  data: () => ({
    hash: null,
    menuOpen: {
      "static-analysis": true,
      "dynamic-analysis": false,
    },
  }),
  computed: {
    ...fileGetters,
    isPE() {
      return (
        this.getFile && `${this.getFile.file_format}`.toLowerCase() === "pe"
      );
    },
  },
  methods: {
    getPageLink(to) {
      return `/file/${this.hash}/${to}`;
    },
    isPageActive(to) {
      let pageActive = this.$route.fullPath.indexOf(this.getPageLink(to)) != -1;

      return pageActive;
    },
    toggleMenu(to) {
      if (this.menuOpen[to] !== undefined) {
        this.menuOpen[to] = !this.isPageActive(to) ? true : !this.menuOpen[to];
      }
    },
    isMenuOpen(to) {
      return this.menuOpen[to] === true;
    },
  },
  async beforeMount() {
    this.hash = this.getFile.sha256;
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply inset-0;
  @apply bg-white;
  @apply hidden w-full lg:w-sidebar lg:block;
  position: fixed;
  top: 69px;
  width: 100%;
  bottom: auto;
  border-right: solid 1px $border-color;
  padding: 13px 20px;
  z-index: 99999999999;
  t .logo {
    @apply w-full h-navbar max-h-20 xl:w-sidebar md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
  }

  .menu {
    @apply w-full;

    .content {
      @apply mb-auto;

      display: flex;
      align-items: center;
      justify-content: center;

      li:first-child {
        margin-right: 50px;
      }

      li {
        a {
          @apply text-base flex items-center gap-4 py-4 my-1 p-2 rounded-r-md;
          margin-right: 15px;
          padding: 10px 18px;
          font-size: 0.9rem;
          color: #a7a7a7;
          font-weight: 500;
        }
        &.active > a,
        > a:hover {
          background-color: rgba(13, 150, 119);
          --tw-text-opacity: 1;
          color: #fff;
          border-radius: 30px;
        }
      }
    }

    .sub-items {
      @apply pl-8 ml-4 mr-1;

      max-height: 300px;
      opacity: 1;
      transition: all 0.4s ease-in;

      &.hide {
        opacity: 0;
        max-height: 0;
        transition: all 0.5s ease-out;
        overflow: hidden;
      }

      li {
        &.active a,
        &:hover a {
          @apply border-primary;
        }

        a {
          @apply text-gray-medium;
          @apply border-transparent;
          @apply py-1 pl-6 border-l-4;
        }
      }
    }
  }
}

.disabled {
  @apply cursor-not-allowed;
}
</style>