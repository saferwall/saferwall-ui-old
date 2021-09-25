<template>
  <div class="app-content h-full">
    <div class="header">
      <div class="metatime">
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
        <h1 class="title">
          {{ title }}
        </h1>
        <div class="buttons">
          <btn v-if="false" class="disabled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14.684"
              height="17.383"
              viewBox="0 0 14.684 17.383"
            >
              <g transform="translate(0.15 0.212)">
                <g>
                  <path
                    d="M51.94,4.744a7.145,7.145,0,0,0-5.085-2.106H45.8l1.692-1.7L46.55,0l-3.3,3.3,3.253,3.307.95-.934L45.776,3.969h1.079a5.86,5.86,0,1,1-5.86,5.86V9.163H39.663v.666A7.192,7.192,0,1,0,51.94,4.744Z"
                    transform="translate(-39.663)"
                    fill="#0d9677"
                    stroke="#0d9677"
                    stroke-width="0.3"
                  />
                </g>
              </g>
            </svg>

            Rescan File
          </btn>
          <btn v-if="false" class="disabled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.786"
              height="16.889"
              viewBox="0 0 20.786 16.889"
            >
              <g transform="translate(0 -48)">
                <g transform="translate(0 48)">
                  <path
                    d="M20.786,50a8.885,8.885,0,0,1-2.455.673,4.237,4.237,0,0,0,1.875-2.355,8.516,8.516,0,0,1-2.7,1.032,4.261,4.261,0,0,0-7.371,2.914,4.388,4.388,0,0,0,.1.972,12.062,12.062,0,0,1-8.784-4.457,4.263,4.263,0,0,0,1.31,5.7,4.208,4.208,0,0,1-1.925-.525v.047a4.281,4.281,0,0,0,3.414,4.187,4.253,4.253,0,0,1-1.117.14,3.768,3.768,0,0,1-.807-.073A4.3,4.3,0,0,0,6.3,61.218,8.562,8.562,0,0,1,1.02,63.035,7.982,7.982,0,0,1,0,62.977a12,12,0,0,0,6.537,1.912A12.045,12.045,0,0,0,18.666,52.763c0-.188-.006-.37-.016-.551A8.5,8.5,0,0,0,20.786,50Z"
                    transform="translate(0 -48)"
                    fill="#0d9677"
                  />
                </g>
              </g>
            </svg>

            Share
          </btn>
          <btn :link="downloadLink" :target="'_blank'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.004"
              height="17.708"
              viewBox="0 0 19.004 17.708"
            >
              <path
                d="M14.81,9.36,9.252,14.529,3.694,9.36l1.022-.951,3.813,3.546V0H9.975V11.955l3.813-3.546Zm3.694,6.5H0v1.344H18.5Zm0,0"
                transform="translate(0.25 0.25)"
                fill="#0d9677"
                stroke="#0d9677"
                stroke-width="0.5"
              />
            </svg>

            Download File
          </btn>
          <btn-like @click="toggleLike" :liked="dliked">
            {{ dliked ? "Unlike" : "Like" }}
          </btn-like>
        </div>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import APP_CONFIGS from "@/common/config";

import Btn from "@/common/components/elements/button/Btn.vue";
import BtnLike from "@/common/components/elements/button/BtnLike.vue";
import { scanGetters, fileActions } from "@/state/helpers";

export default {
  components: { Btn, BtnLike },
  props: {
    title: {
      default: "File Summary",
      type: String,
    },
  },
  data: () => ({
    file: null,
    dliked: false,
    hash: null,
    downloadLink: null,
  }),
  computed: {
    ...scanGetters,
  },
  methods: {
    ...fileActions,
    goBack() {
      this.$router.go(-1);
    },
    async toggleLike() {
      if (!this.hash) return;

      if (this.dliked) {
        return this.doUnLike({ id: this.hash }).then(() => {
          this.dliked = false;
        });
      }
      this.doLike({ id: this.hash }).then(() => {
        this.dliked = true;
      });
    },
    async refreshContent() {
      this.file = await this.getFileSummary;
      this.hash = this.file.properties.SHA256;
      this.downloadLink = `${APP_CONFIGS.apiURL}files/${this.hash}/download/`;
    },
  },
  watch: {
    $route() {
      this.refreshContent();
    },
  },
};
</script>

<style scoped lang="scss">
.app-content {
  @apply mx-40 pt-32 pb-10;

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
      @apply grid grid-cols-3 gap-4 py-2 mt-8 w-full;

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
        &.disabled {
          @apply bg-gray-2xlight cursor-not-allowed;
        }
      }
    }
  }

  .content {
    @apply mt-8;
  }
}
</style>
