<template>
  <v-toolbar flat>
    <v-toolbar-title
      ><h4>{{ title }}</h4></v-toolbar-title
    >
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      dafault: null
    }
  }
};
</script>
