<template>
  <users-component></users-component>
</template>

<script>
import UsersComponent from "./users";
export default {
  components: {
    "users-component": UsersComponent
  },
  data() {
    return {
      mode: 0,
      switch1: true,
      select: { locale: "English", lang: "en" },
      locales: [
        {
          locale: "English",
          lang: "en"
        },
        {
          locale: "Kiswahili",
          lang: "sw"
        },
        {
          locale: "French",
          lang: "fr"
        },
        {
          locale: "Arab",
          lang: "ar"
        }
      ]
    };
  },
  methods: {
    toggle(mode) {
      if (`${mode}` === "true") {
        this.$vuetify.theme.dark = true;
        this.$store.dispatch("change_to_dark");
        document.body.style.background = "#354141";
      } else {
        this.$store.dispatch("change_to_light");
        this.$vuetify.theme.dark = false;
        document.body.style.backgroundImage =
          "url(https://cdn.hipwallpaper.com/i/50/79/MSsZP2.jpg)";
      }
    },
    changeLanguage(lang) {
      // Change the i18n context object's locale
      // This makes it so the correct locale file is used
      this.$i18n.locale = lang;
    }
  },
  created() {},

  computed: {
    isDark() {
      return this.$store.getters.isDark;
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
