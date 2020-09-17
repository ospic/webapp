<template>
  <v-col cols="12" sm="4">
    <v-list dense>
      <v-list-item class="ma-0">
        <v-list-item-icon>
          <v-icon>mdi-square-medium</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>

          <v-list-item-subtitle class="font-weight-light">{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-col>
</template>
<script>
export default {
  props: ["title", "subtitle"],
  data() {
    return {};
  }
};
</script>