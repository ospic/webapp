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
