<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    this.editor = new Editor({
      content: "<p>I’m running tiptap with Vue.js. 🎉</p>",
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>