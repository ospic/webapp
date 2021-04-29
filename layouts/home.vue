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
            <v-btn color="whitish" text to="/about" x-small>
              Made by Ospic
            </v-btn>
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
