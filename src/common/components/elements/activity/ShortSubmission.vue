<template>
  <div class="like-box">
    <div class="row-hash">
      <router-link :to="`file/${file.hash}/summary`" class="input-hash">
        <hash-input :hash="file.hash" />
      </router-link>

      <btn-like :liked="dliked" @click="toggleLike" />
    </div>
    <file-meta
      :scan="file.multiav"
      :filename="file.filename"
      :classification="file.class"
    />
  </div>
</template>

<script>
import { fileActions } from "@/state/helpers";

import FileMeta from "../FileMeta.vue";
import BtnLike from "../button/BtnLike.vue";
import HashInput from "@/common/components/elements/HashInput.vue";

export default {
  components: {
    HashInput,
    FileMeta,
    BtnLike,
  },
  props: {
    id: {
      type: String,
    },
    file: {
      type: Object,
    },
    liked: {
      type: Boolean,
    },
  },
  data() {
    return {
      dliked: false,
    };
  },
  methods: {
    ...fileActions,
    async toggleLike() {
      if (this.dliked) {
        return this.doUnLike({ id: this.file.hash }).then(() => {
          this.dliked = false;
        });
      }
      this.doLike({ id: this.file.hash }).then(() => {
        this.dliked = true;
      });
    },
  },
  created() {
    this.dliked = this.liked;
  },
};
</script>

<style lang="scss" scoped>
.like-box {
  @apply px-8 py-8;

  .row-hash {
    @apply flex items-center;

    .input-hash {
      @apply flex-grow;
    }
  }
}
</style>
