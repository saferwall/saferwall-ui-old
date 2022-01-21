<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="flex flex-col space-y-4 w-full" v-if="comments.length > 0">
      <comment v-for="comment in comments" :key="comment.id" v-bind="comment" />
    </div>
    <div v-else>
      <h2>No comments available.</h2>
    </div>
  </div>
</template>

<script>
import { fileGetters } from "@/state/helpers";
import Comment from "../components/Comment.vue";

export default {
  components: { Comment },
  data() {
    return {
      title: "Comments",
      comments: [],
    };
  },
  computed: {
    ...fileGetters,
  },
  async beforeMount() {
    this.comments = await this.getFileComments;
  },
};
</script>
