<template>
  <v-app
    class="aspire"
    style="
    background: transparent;"
  >
    <v-main>
      <nuxt />
    </v-main>
    <v-footer class="primary" fixed padless app>
      <v-col class="text-center" cols="2"> </v-col>
      <v-col class="text-center" cols="8">
        <v-flex xs12 class="d-flex align-center justify-end  flex-column">
          <div style="color: white">
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
            Copyright &copy; {{ new Date().getFullYear() }} The Apache Software
            Foundation, Licensed under the
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              style="color: blue;  text-decoration: underline;"
              target="_blank"
            >
              Apache License, Version 2.0.</a
            >. Documentation can be found
            <a
              style="color: blue; text-decoration: underline;"
              href="https://docs.ospicx.com/welcome"
              target="_blank"
              >here</a
            >
            and you can get to this app repository

            <a
              style="color: blue; text-decoration: underline;"
              href="https://github.com/ospic/webapp"
              target="_blank"
              >here</a
            >
          </div>
        </v-flex>
      </v-col>
      <v-col class="text-center" cols="2"> </v-col>
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
