<template>
  <v-app
    class="aspire"
    style="
    background: transparent;"
  >
    <a
      class="github-fork-ribbon"
      href="https://github.com/ospic/webapp"
      target="_blank"
      rel="noopener noreferrer"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
      >Fork me on GitHub</a
    >
    <v-main>
      <nuxt />
    </v-main>
    <v-footer class="primary" fixed padless app>
      <v-col class="text-center" cols="4">
        <div class="white--text ml-3">
          Made by
          <a
            href="https://github.com/ospic"
            style="color: white"
            target="_blank"
            >Ospic
          </a>
          as an open source Hospital management system
          <a
            style="color: blue; text-decoration: underline;"
            href="https://app.ospicx.com/"
            target="_blank"
            >Ospic HMS</a
          >
        </div>
      </v-col>
      <v-col class="text-center" cols="4">
        <v-flex xs12 class="d-flex align-center justify-end  flex-column">
          <div style="color: white">
            Copyright &copy; {{ new Date().getFullYear() }} The Apache Software
            Foundation, Licensed under the
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              style="color: blue;  text-decoration: underline;"
              target="_blank"
            >
              Apache License, Version 2.0.</a
            >
          </div>
        </v-flex>
      </v-col>
      <v-col class="text-center" cols="4">
        <div class="white--text ml-3">
          Documentation is currently under development but you can still access
          it from
          <a
            style="color: blue; text-decoration: underline;"
            href="https://ospic.github.io/docs/docs/"
            target="_blank"
            >here</a
          >
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      locales: ["English", "Kiswahili"]
    };
  },
  head() {
    return {
      title: "Home Page"
    };
  }
};
</script>
<style scoped></style>
