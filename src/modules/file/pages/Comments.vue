<template>
  <div id="comments">
    <div class="list">
      <div class="flex flex-col space-y-4 w-full" v-if="comments.length > 0">
        <comment
          v-for="comment in comments"
          :key="comment.id"
          v-bind="comment"
        />
      </div>
      <div v-else class="py-8">
        <h2>No comments available.</h2>
      </div>
    </div>
    <div class="editor">
      <md-editor v-model="body" language="en-US" :toolbars="toolBars" />
      <btn @click="doComment()" :disabled="posting">
        {{ posting ? "Comment ..." : "Comment" }}
      </btn>
    </div>
  </div>
</template>

<script>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import Comment from "../components/Comment.vue";
import Btn from "@/common/components/elements/button/Btn.vue";

import Paginatior from "@/common/utils/paginator";
import { catchAuthThrow } from "@/common/helpers";
import { fileGetters, commentMethods } from "@/state/helpers";

export default {
  components: { Comment, Btn, MdEditor },
  data() {
    return {
      title: "Comments",
      body: "",
      posting: false,
      comments: [],
      paginator: {},
    };
  },
  methods: {
    ...commentMethods,
    doComment: function () {
      this.posting = true;

      this.commentFile({ sha256: this.getFile.sha256, body: this.body })
        .then(() => {
          this.posting = false;
          this.paginator.fetchItems();

          this.body = "";
        })
        .catch(catchAuthThrow("You must authenticate to comment a file"))
        .catch(() => {
          this.posting = false;
        });
    },
    loadMore() {
      this.paginator.nextPage();
    },
  },
  computed: {
    ...fileGetters,
    toolBars() {
      return [
        "bold",
        "underline",
        "italic",
        "-",
        "strikeThrough",
        "title",
        "sub",
        "sup",
        "quote",
        "unorderedList",
        "orderedList",
        "-",
        "codeRow",
        "code",
        "link",
        "mermaid",
        "katex",
        "-",
        "revoke",
        "next",
        "=",
        "pageFullscreen",
        "fullscreen",
        "preview",
      ];
    },
  },
  async beforeMount() {
    this.paginator = new Paginatior(
      `files/${this.getFile.sha256}/comments`
    ).setLimit(10);

    this.paginator.onUpdate((items) => {
      this.comments = items;
    });

    this.paginator.setPage(0);
    this.loadMore();
  },
};
</script>
