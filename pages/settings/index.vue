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
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
    changeLanguage(lang) {
      // Change the i18n context object's locale
      // This makes it so the correct locale file is used
      this.$i18n.locale = lang;
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
