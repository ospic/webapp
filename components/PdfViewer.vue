<template>
  <v-card class="mx-auto ma-1" color="#5a5b5f" flat tile>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        <v-icon>mdi-file-document</v-icon>{{ name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <div style="width: 100%; height: 1200px;  margin: auto; overflow: scroll;">
        <vue-pdf-app :pdf="src"></vue-pdf-app>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import VuePdfApp from "vue-pdf-app";
// import this to use default icons for buttons
import "vue-pdf-app/dist/icons/main.css";

export default {
  components: {
    VuePdfApp
  },
  props: {
    src: {
      type: String
    },
    name: {
      type: String,
      default: "Report name"
    }
  },

  data: () => ({}),
  methods: {
    error: function(err) {
      console.log(err);
    }
  }
};
</script>
