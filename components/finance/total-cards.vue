<template>
  <v-card class=" mx-3 mt-2 pa-3" rounded="10" elevation="1" flat>
    <v-row no-gutters>
      <v-col sm="6">
        <v-avatar color="black" rounded size="53"
          ><v-icon large color="white">
            mdi-bitcoin
          </v-icon></v-avatar
        >
        <h1 class="mt-1 font-weight-black" v-html="'$ ' + amount"></h1>
        <v-list-item-subtitle class="font-weight-normal"
          >45% This week</v-list-item-subtitle
        >
      </v-col>
      <v-col sm="6">
        <v-icon class="d-flex justify-end" color="black"
          >mdi-dots-vertical</v-icon
        >
        <br />
        <v-icon class="d-flex justify-end" color="black" large
          >mdi-zodiac-leo</v-icon
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ["amount"],
  data: () => ({})
};
</script>
