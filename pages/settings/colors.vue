<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>System color settings</v-toolbar-title>
    </v-toolbar>
    <v-radio-group v-model="select" column @change="changeColor" class="pa-4">
      <v-radio
        v-for="(color, i) in colors"
        :key="i"
        :label="color.label"
        :color="color.color"
        :value="color.value"
      ></v-radio>
    </v-radio-group>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      mode: 0,
      switch1: true,
      select: {},
      colors: [
        {
          label: "Violet",
          color: "#2F4454",
          value: "#2F4454"
        },
        {
          label: "Forest green",
          color: "#228B22",
          value: "#228B22"
        },
        {
          label: "Dry green",
          color: "#2CB673",
          value: "#2CB673"
        },
        {
          label: "Pastel green",
          color: "#00A756",
          value: "#00A756"
        }
      ]
    };
  },

  methods: {
    changeColor() {
      window.localStorage.setItem("color", this.select);
      this.$vuetify.theme.themes.light.primary = this.select;
    }
  }
};
</script>
