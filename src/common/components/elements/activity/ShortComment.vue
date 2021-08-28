<template>
  <div class="short-comment space-x-8">
    <div class="cmt-info">
      <div class="cmt-body">
        {{ getContent }}
      </div>
      <p class="cmt-date">
        {{ getCommentedDate }}
      </p>
    </div>
    <div class="cmt-file w-full">
      <router-link :to="`file/${file.hash}/summary`">
        <hash-input :hash="file.hash" />
      </router-link>

      <file-meta
        :scan="file.multiav"
        :filename="file.filename"
        :classification="file.class"
      />
    </div>
  </div>
</template>

<script>
import FileMeta from "../FileMeta.vue";
import HashInput from "../HashInput.vue";

export default {
  components: {
    HashInput,
    FileMeta,
  },
  props: {
    id: {
      type: String,
    },
    comment: {
      type: String,
    },
    file: {
      type: Object,
    },
    followed: {
      default: false,
      type: Boolean,
    },
    date: {
      type: [Number, String],
    },
  },
  computed: {
    getCommentedDate() {
      return new Date(this.date).toDateString();
    },
    getContent() {
      return (this.comment || "").replace(/<\/?[^>]+>/gi, " ");
    },
  },
};
</script>

<style lang="scss" scoped>
.short-comment {
  @apply flex flex-wrap items-center justify-between p-6 m-4 space-y-6;

  .cmt-info {
    @apply flex flex-col space-y-2;
  }

  .cmt-date {
    @apply text-gray-medium;
  }
  .cmt-file {
    @apply cursor-pointer mx-0 py-1;
    input {
      @apply cursor-pointer;
    }
  }

  .btn-cmt {
    @apply p-2;
  }
}
</style>
