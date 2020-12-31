<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            Switch Dark/Light Mode

            <v-spacer></v-spacer>
            <v-switch
              :value="true"
              v-model="isDark"
              inset
              color="primary"
              @change="toggle($event !== null)"
            ></v-switch>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-title>
            {{ $t("label.titles.changelanguage") }}
            <v-spacer></v-spacer>
            <v-select
              v-model="select"
              :items="locales"
              item-text="locale"
              item-value="lang"
              persistent-hint
              return-object
              single-line
              dense
              lass="font-weight-light"
              @change="changeLanguage(select.lang)"
            ></v-select>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
