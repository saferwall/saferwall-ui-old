<template>
  <span @click="copyContent($event)" class="text-red-500">
    <slot />
  </span>
</template>


<script>
export default {
  methods: {
    copyContent(event) {
      this.selectContent(event);
      this.updateClipboard(event.target.innerText);
    },
    selectContent(event) {
      var r = document.createRange();
      r.selectNodeContents(event.target);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    },
    updateClipboard(content) {
      navigator.clipboard.writeText(content).then(
        function () {
          /* clipboard successfully set */
        },
        function () {
          /* clipboard write failed */
          alert("Copy action is not granted");
        }
      );
    },
  },
};
</script>