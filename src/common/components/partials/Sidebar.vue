<template>
  <aside class="sidebar">
    <div class="logo">
      <logo />
    </div>

    <div class="menu">
      <ul class="content">
        <li class="">
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
          <router-link :to="getPageLink('summary')">
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>

            Summary
          </router-link>
        </li>

        <li :class="isPageActive('static-analysis') ? 'active' : ''">
          <router-link :to="getPageLink('static-analysis')">
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>

            Static Analysis
          </router-link>

          <ul
            class="sub-items"
            :class="isPageActive('static-analysis') ? '' : 'hide'"
          >
            <li :class="isPageActive('static-analysis/pe') ? 'active' : ''">
              <router-link :to="getPageLink('static-analysis/pe')">
                PE
              </router-link>
            </li>
            <li
              :class="isPageActive('static-analysis/strings') ? 'active' : ''"
            >
              <router-link :to="getPageLink('static-analysis/strings')">
                Strings
              </router-link>
            </li>
            <li
              :class="isPageActive('static-analysis/antivirus') ? 'active' : ''"
            >
              <router-link :to="getPageLink('static-analysis/antivirus')">
                Antivirus
              </router-link>
            </li>
          </ul>
        </li>

        <li
          :class="isPageActive('dynamic-analysis') ? 'active' : ''"
          class="disabled cursor-not-allowed"
        >
          <a class="bg-gray-2xlight">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            Dynamic Analysis
          </a>
        </li>

        <li :class="isPageActive('comments') ? 'active' : ''">
          <router-link :to="getPageLink('comments')">
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
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>

            Comments
            {{
              (file && file.comments_count && `(${file.comments_count}) `) || ""
            }}
          </router-link>
        </li>
      </ul>

      <btn size="xl" class="mx-auto mt-12">
        <strong>Back to website</strong>
      </btn>
    </div>
  </aside>
</template>

<script>
import { scanGetters } from "@/state/helpers";

import Logo from "@/common/components/elements/Logo.vue";
import Btn from "@/common/components/elements/button/Btn.vue";

export default {
  components: { Logo, Btn },
  data: () => ({
    file: null,
    hash: null,
  }),
  computed: {
    ...scanGetters,
  },
  methods: {
    getPageLink(to) {
      return `/file/${this.hash}/${to}`;
    },
    isPageActive(to) {
      let pageActive = this.$route.fullPath.indexOf(this.getPageLink(to));
      return pageActive >= 0;
    },
  },
  async beforeMount() {
    this.file = await this.getFile;
    this.hash = this.file.sha256;
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply inset-0;
  @apply bg-white;
  @apply min-h-screen;
  @apply hidden w-full lg:w-sidebar lg:block;

  border-right: solid 1px $border-color;

  .logo {
    @apply w-full h-navbar max-h-20 xl:w-sidebar md:px-6 px-5 flex justify-center md:justify-start text-black font-extrabold;
  }

  .menu {
    @apply w-full mt-8;

    .content {
      @apply mb-auto;

      li {
        a {
          @apply text-lg text-gray flex items-center gap-4 py-4 my-1 p-4 w-9/10 rounded-r-md;
        }
        &.active > a,
        > a:hover {
          @apply bg-primary bg-opacity-5 text-primary font-semibold;
        }
      }
    }

    .sub-items {
      @apply pl-8 mr-1;
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
        &.active,
        &:hover {
          @apply border-l-4 border-primary;

          a {
            @apply pl-4;
          }
        }
        a {
          @apply py-2 pl-0;
        }
      }
    }
  }
}
</style>
