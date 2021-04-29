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
      <v-spacer></v-spacer>
      <v-btn color="whitish" text to="/about" x-small>
        Made by Ospic
      </v-btn>
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
