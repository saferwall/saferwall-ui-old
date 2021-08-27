<template>
  <div class="app-content h-full">
    <div class="page-header">
      <div class="page-mtime">
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
      <div class="page-info">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "Title",
      type: String,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-content {
  @apply md:w-9/12 lg:w-8/12 mx-auto pt-32 pb-10;

  .page-header {
    @apply flex flex-wrap p-8 md:p-0;

    svg {
      @apply mr-2;
    }

    .btn-back {
      @apply flex items-center text-primary font-bold capitalize cursor-pointer;
    }

    .page-mtime {
      @apply w-full;
    }

    .page-info {
      @apply grid grid-cols-8 gap-4 py-2 mt-8 w-full;

      .title {
        @apply text-3xl col-span-5;
      }

      .buttons {
        @apply flex justify-end col-span-3;

        .btn {
          @apply ml-2 bg-light border-none font-semibold rounded-md shadow-sm;
          height: 50px;
        }
      }
    }

    .buttons {
      .btn {
        &:hover {
        }
      }
    }
  }

  .content {
    @apply mt-2 md:mt-8;
  }
}
</style>
