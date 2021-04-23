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
          primary: '#06065e',
          accent: '#0000',
          secondary: '#ffffff',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#9D0000',
          default: "#354141",
          milky: "#01242F",
          dlue: "#1520A6",
        },
        light: {
          primary: '#2F4454',
          accent: '#000000',
          secondary: '#ffffff',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF0000',
          default: "#FFFFFF",
          milky: "#FDFFF5",
          teal: "#00897B",
          whitish: "F5F5F5",
          dlue: "#1520A6",
          button: "#02532b"
        }

      },
    },
  });
  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
};
