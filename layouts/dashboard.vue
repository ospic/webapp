
<template>
  <v-app dark class="app">
    <v-app-bar
      color="white"
      dark
      app
      src="https://media.nbclosangeles.com/2019/09/GettyImages-522872908.jpg"
    >
      <v-toolbar-title>
        <p class="font-weight-normal">{{pagetitle }}</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <NuxtLink to="/home">
          <v-icon color="white">mdi-home-analytics</v-icon>
        </NuxtLink>
      </v-btn>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
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
    const vm = this;
    /*Promise.all([
      vm.$store.dispatch("getAllIndicatorCategories"),
      vm.$store.dispatch("getAllCurrentReleases"),
      vm.$store.dispatch("getAllDisaggregations"),
      vm.$store.dispatch("getAlldisaggregationvalues"),
      vm.$store.dispatch("getAllIndicatorsSources"),
      vm.$store.dispatch("getAllIndicators"),
      vm.$store.dispatch("getAllLogins"),
      vm.$store.dispatch("getAllmainlands"),
      vm.$store.dispatch("getAllperiodtypes"),
      vm.$store.dispatch("getAllprivileges"),
      vm.$store.dispatch("getAllpublications"),
      vm.$store.dispatch("getAllRurals"),
      vm.$store.dispatch("getAllSectors"),
      vm.$store.dispatch("getAlltotalfemales"),
      vm.$store.dispatch("getnews")
    ]).then(function() {
      console.log("Loading complete...");
    });
    */
  }
};
</script>
<style >
#app {
  font-family: "Lato", sans-serif;
}
</style>
