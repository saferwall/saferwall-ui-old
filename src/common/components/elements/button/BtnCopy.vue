<template>
  <div
    @click="copyContent($event)"
    @mouseenter="showCopyIcon($event)"
    @mouseleave="removeCopyIcon($event)"
  >
    <slot />
  </div>
</template>


<script>
const svgCopyIcon = `
<span data-copy-btn><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg><label>Copy</label></span>`;
export default {
  methods: {
    copyContent(event) {
      let parent = event.target.parentNode;

      // clone node and remove copy button
      if (
        parent.tagName != "svg" &&
        !parent.hasAttribute("data-copy-btn") &&
        !parent.hasAttribute("data-copy-element")
      ) {
        return;
      }
      while (!parent.hasAttribute("data-copy-element")) {
        parent = parent.parentNode;
      }
      parent = parent.parentNode;

      const nodeContent = parent.cloneNode(true);
      let btnCopy = nodeContent.querySelector("div[data-copy-element]");
      if (btnCopy) btnCopy.remove();

      this.selectContent(parent);
      this.updateClipboard(nodeContent.textContent, () => {
        const copySvg = this.getCopyButton(event);
        if (!copySvg) return;

        copySvg.querySelector("label").innerText = "Copied !";
      });
    },
    showCopyIcon(event) {
      event.target.setAttribute("data-copy-parent", 1);

      const copySvg = this.getCopyButton(event);
      if (copySvg) return;

      const copyElement = document.createElement("div");
      copyElement.setAttribute("data-copy-element", 1);
      copyElement.innerHTML = svgCopyIcon;

      event.target.prepend(copyElement);
    },
    removeCopyIcon(event) {
      const copySvg = this.getCopyButton(event);
      if (!copySvg) return;

      copySvg.remove();
    },
    getCopyButton(event) {
      return event.target.parentNode.querySelector("div[data-copy-element]");
    },
    selectContent(node) {
      var r = document.createRange();
      r.selectNodeContents(node);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    },
    updateClipboard(content, done = () => {}) {
      navigator.clipboard &&
        navigator.clipboard.writeText(content).then(
          () => {
            done();
          },
          function () {
            /* clipboard write failed */
            console.error("Copy action is not granted");
          }
        );
    },
  },
};
</script>


<style lang="scss" >
*[data-copy-parent] {
  @apply relative;

  label {
    @apply text-xs;
  }
}
div[data-copy-element] {
  @apply bg-green-500 bg-opacity-10;
  @apply absolute flex items-center justify-center;
  @apply w-full h-full;

  @apply select-none;

  span[data-copy-btn] {
    @apply text-white;
    @apply flex items-center justify-center gap-x-1;
    @apply p-1 px-2 bg-primary bg-opacity-90 rounded;
  }
}
</style>