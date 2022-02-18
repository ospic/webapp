<template>
  <v-app class="app login">
    <v-main class="transparent">
      <nuxt />
    </v-main>
    <footer-component v-if="isMdAndUp"></footer-component>
  </v-app>
</template>

<script>
import FooterComponent from "@/components/TFooter.vue";
export default {
  components: {
    "footer-component": FooterComponent,
  },
  data() {
    return {
      locales: ["English", "Kiswahili"],
      socials: [
        {
          icon: "mdi-twitter",
          link: "https://twitter.com/ospicapp?ref_src=twsrc%5Etfw",
        },
        {
          icon: "mdi-facebook",
          link: null,
        },
        { icon: "mdi-linkedin", link: null },
        { icon: "mdi-instagram", link: null },
      ],
    };
  },
  head() {
    return {
      title: "Home Page",
    };
  },
};
</script>
<style scoped>
#nuxt,
#layout {
  background-color: brown;
}
</style>
