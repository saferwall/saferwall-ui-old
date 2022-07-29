<template>
  <div>
    <div class="header">
      <div class="metatime hidden">
        <a class="btn-back" @click="goBack()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7.883"
            height="13.22"
            viewBox="0 0 7.883 13.22"
          >
            <path
              d="M3353.157,640.348l-5.973,5.973,5.973,5.973"
              transform="translate(-3345.911 -639.711)"
              fill="none"
              stroke="#0d9677"
              stroke-width="1.8"
            />
          </svg>
          back
        </a>
      </div>
      <div class="metainfo">
        <h1 class="title">{{ title }}</h1>
        <div class="buttons">
          <!-- Download Button -->
          <div @click="this.$router.push({ name: 'login' })">
            <btn
              :link="isloggedIn ? downloadLink : null"
              :download="isloggedIn ? getFileName : null"
              :target="isloggedIn ? '_blank' : ''"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path
                  d="M14.81,9.36,9.252,14.529,3.694,9.36l1.022-.951,3.813,3.546V0H9.975V11.955l3.813-3.546Zm3.694,6.5H0v1.344H18.5Zm0,0"
                  transform="translate(0.25 0.25)"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="0.5"
                />
              </svg>
              Download File
            </btn>
          </div>
          <!-- END: Download Button -->

          <!-- Scan Button -->
          <btn :disabled="rescanning" @click="submitRescanRequest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              fill="currentColor"
              :class="rescanning ? 'animate-spin' : ''"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path
                    d="M11,8v5l4.25,2.52l0.77-1.28l-3.52-2.09V8H11z M21,10V3l-2.64,2.64C16.74,4.01,14.49,3,12,3c-4.97,0-9,4.03-9,9 s4.03,9,9,9s9-4.03,9-9h-2c0,3.86-3.14,7-7,7s-7-3.14-7-7s3.14-7,7-7c1.93,0,3.68,0.79,4.95,2.05L14,10H21z"
                  />
                </g>
              </g>
            </svg>
            {{ rescanning ? "Rescanning" : "Rescan File" }}
          </btn>
          <!-- END: Scan Button -->

          <!-- Like Button -->
          <btn-like @click="toggleLike" :liked="dliked">{{ dliked ? "Unlike" : "Like" }}</btn-like>
          <!-- END: Like Button -->

          <!-- Share Button -->
          <a :href="'https://twitter.com/intent/tweet?text=' + getShareTweet" target="_blank">
            <btn>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
              Share
            </btn>
          </a>
          <!-- END: Share Button -->
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import Config from "@/common/config";

import Btn from "@/common/components/elements/button/Btn.vue";
import BtnLike from "@/common/components/elements/button/BtnLike.vue";
import {
  authGetters,
  fileGetters,
  fileMethods,
  fileActions,
} from "@/state/helpers";
import { catchAuthThrow } from "../../helpers";
import { createToast } from "mosha-vue-toastify";

export default {
  components: { Btn, BtnLike },
  props: {
    title: {
      default: "Summary",
      type: String,
    },
  },
  data: () => ({
    file: null,
    dliked: false,
    hash: null,
    downloadLink: null,
    isloggedIn: false,
    rescanning: false,
    rescanInterval: null,
  }),
  computed: {
    ...fileGetters,
    getShareTweet() {
      return encodeURI(window.location.href);
    },
    getFileName() {
      return (
        this.file?.submissions.find((s) => s.filename)?.filename ||
        this.file?.sha256
      );
    },
  },
  methods: {
    ...fileActions,
    ...fileMethods,
    ...authGetters,
    goBack() {
      this.$router.go(-1);
    },
    async toggleLike() {
      if (!this.hash) return;

      if (this.dliked) {
        return this.doUnLike({ id: this.hash }).then(() => {
          this.updateLike(false);
        });
      }
      this.doLike({ id: this.hash }).then(() => {
        this.updateLike(true);
      });
    },
    async refreshContent() {
      this.isloggedIn = await this.loggedIn();

      this.file = await this.getFile;
      this.hash = this.file.sha256;
      this.dliked = this.file.liked;
      this.downloadLink = `${Config.value("apiURL")}files/${
        this.hash
      }/download/`;
    },
    updateLike(liked) {
      this.dliked = liked == true;
      this.updateRefreshStatus(true);
    },
    async submitRescanRequest() {
      this.rescanning = true;

      this.rescanFile(this.hash)
        .then(() => {
          createToast("The file rescan request has been submitted", {
            type: "success",
            position: "bottom-right",
          });
        })
        .catch(catchAuthThrow("You must authenticate to rescan a file !"))
        .catch(() => (this.rescanning = false));
    },
  },
  async beforeMount() {
    await this.refreshContent();
  },
  watch: {
    $route() {
      this.refreshContent();
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  @apply flex flex-wrap;

  svg {
    @apply mr-2;
  }

  .btn-back {
    @apply flex items-center text-primary font-bold capitalize cursor-pointer;
  }

  .metatime {
    @apply w-full;
  }

  .metainfo {
    @apply grid grid-cols-3 gap-4 py-2 mt-2 w-full;

    .title {
      @apply capitalize text-3xl col-span-1;
    }

    .buttons {
      @apply flex justify-end col-span-2;

      .btn,
      .btn-like {
        @apply ml-2 bg-light border-none font-semibold rounded-md shadow-sm;
        height: 50px;
      }
    }
  }
  .buttons {
    .btn,
    .btn-like {
      margin: 0;
      &:hover {
      }
      &:disabled {
        @apply bg-gray-2xlight cursor-not-allowed;
      }
    }
  }
}

.content {
  @apply mt-2;
}
</style>
