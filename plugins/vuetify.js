// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);
export default (ctx) => {
  const vuetify = new Vuetify({
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#01242F",
          accent: "#FF4081",
          secondary: "#ffe18d",
          success: "#4CAF50",
          info: "#2196F3",
          warning: "#FB8C00",
          error: "#FF5252",
          default: "#FFFFFF",
          milky: "#01242F",
        },
        light: {
          primary: "#055273",
          accent: "#e91e63",
          secondary: "#30b1dc",
          success: "#4CAF50",
          info: "#2196F3",
          warning: "#FB8C00",
          error: "#FF5252",
          default: "#FFFFFF",
          milky: "#FDFFF5",
        },
      },
    },
  });
  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};
