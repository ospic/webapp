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
          primary: '#00A756',
          accent: '#0000',
          secondary: '#ffffff',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#9D0000',
          default: "#354141",
          milky: "#01242F",
        },
        light: {
          primary: '#00A756',
          accent: '#0000',
          secondary: '#ffffff',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF0000',
          default: "#FFFFFF",
          milky: "#FDFFF5",
          teal: "#00897B",
          whitish: "F5F5F5",
        }

      },
    },
  });
  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};
