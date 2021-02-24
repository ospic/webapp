<template>
  <div>
    <div ref="viewer"></div>
  </div>
</template>

<script>
/* eslint-disable */
import WebViewer from "@pdftron/pdfjs-express";

export default {
  name: "WebViewer",
  props: {
    path: String,
    url: String
  },
  mounted: function() {
    WebViewer(
      {
        path: this.publicPath,
        initialDoc: this.url // replace with your own PDF file
      },
      this.$refs.viewer
    ).then(instance => {
      instance.setTheme("dark");
      this.docViewer = instance.docViewer;
      this.docViewer.zoomTo(100, 0, 0);
      this.annotManager = instance.annotManager;

      // you can also access major namespaces from the instance as follows:
      // const Tools = instance.Tools;
      // const Annotations = instance.Annotations;

      // now you can access APIs through `this.instance`

      // or listen to events from the viewer element
      this.docViewer.on("documentLoaded", () => {
        // call methods relating to the loaded document
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
