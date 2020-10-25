<template>
  <v-app dark class="app">
    <v-app-bar dark app color="primary" flat dense>
      <v-toolbar-title>
        <p class="font-weight-normal">{{ pagetitle }}</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <NuxtLink to="/">
          <v-icon color="white">mdi-home-outline</v-icon>
        </NuxtLink>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container style="background-color: #efefef;" class="pa-2 ma-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      pagetitle: "Administrator Dashboard",
      locales: ["English", "Kiswahili"]
    };
  },
  head() {
    return {
      title: "Home Page"
    };
  },
  beforeMount: function() {
    //const vm = this;
  }
};
</script>
<style>
#app {
  font-family: "Lato", sans-serif;
}
</style>
