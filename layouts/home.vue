<template>
  <v-app
    class="aspire"
    style="background: transparent; background-image: url('https://storage.googleapis.com/aims-edu/images/000/001/174/lead/64.jpg');  background-repeat: no-repeat; height:900px;"
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
<style scoped>
#nuxt,
#layout {
  background-color: brown;
}
</style>
