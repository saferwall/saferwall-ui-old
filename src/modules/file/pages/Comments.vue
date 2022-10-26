<template>
  <div id="comments">
    <div class="list space-y-8">
      <div class="flex flex-col space-y-4 w-full" v-if="comments.length > 0">
        <comment
          v-for="comment in comments"
          :key="comment.id"
          v-bind="comment"
          v-on:commentDeleted="commentDeleted"
        />
      </div>
      <div v-else class="py-8">
        <h2>No comments available.</h2>
      </div>

      <show-more v-if="paginator.isNextPossible()" v-on:click="loadMore()">
        <p>Show more comments</p>
      </show-more>
    </div>
    <div class="editor">
      <md-editor v-model="body" :preview="false" language="en-US" :toolbars="toolBars" />
      <btn @click="doComment()" :disabled="posting">{{ posting ? "Comment ..." : "Comment" }}</btn>
    </div>
  </div>
</template>

<script>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import Comment from "../components/Comment.vue";
import Btn from "@/common/components/elements/button/Btn.vue";
import ShowMore from "@/common/components/elements/button/ShowMore.vue";

import Paginatior from "@/common/utils/paginator";
import { catchAuthThrow } from "@/common/helpers";
import {
  fileGetters,
  commentMethods,
  fileMethods,
  userGetters,
} from "@/state/helpers";
import { createToast } from "mosha-vue-toastify";

export default {
  components: { Comment, Btn, MdEditor, ShowMore },
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
    ...fileMethods,
    doComment() {
      this.posting = true;

      if (!this.body) {
        this.posting = false;
        return createToast("The comment body is empty !", {
          type: "info",
          position: "bottom-right",
        });
      }

      this.commentFile({ sha256: this.getFile.sha256, body: this.body })
        .then((data) => {
          this.posting = false;

          this.comments.push({
            ...data,
            comment: data.body,
            author: {
              username: data.username,
              follow: false,
              member_since: this.getUser.member_since,
            },
          });

          this.updateFile({
            ...this.getFile,
            comments_count: this.getFile.comments_count + 1,
          });

          createToast("The comment is successfully submitted !", {
            type: "success",
            position: "bottom-right",
          });

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
    commentDeleted(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id);
    },
  },
  computed: {
    ...userGetters,
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
    ).setLimit(3);

    this.paginator.onUpdate((items) => {
      items.forEach((item) =>
        this.comments.find((c) => c.id == item.id) == undefined
          ? this.comments.push(item)
          : null
      );
    });

    this.paginator.setPage(0);
    this.loadMore();
  },
};
</script>


<style lang="scss" scoped>
.btn {
}
</style>