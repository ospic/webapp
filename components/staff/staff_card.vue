<template>
  <v-card class="ma-1 pa-0" flat elevation="1" color="grey lighten-4">
    <v-list-item ripple="staff.id" :to="`/staffs/${staff.id}`">
      <v-list-item-content>
        <v-list-item-title
          class=" font-weight-black "
          v-html="staff.fullName == null ? staff.username : staff.fullName"
        ></v-list-item-title>

        <v-list-item-subtitle
          class="light-blue--text font-italic"
          v-html="staff.email"
        ></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar size="60">
        <v-img
          :src="staff.imageUrl == null ? thumbnail : staff.imageUrl"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-text class="ma-0 pa-0">
      <v-row no-gutters class="ma-0 pa-0">
        <v-col cols="12" sm="12" md="7" align="center" class="mt-0 pa-0">
          <v-btn small fab text
            ><v-icon color="blue" small>mdi-facebook</v-icon></v-btn
          >
          <v-btn small fab text
            ><v-icon color="purple darken-4" small>mdi-instagram</v-icon></v-btn
          >
          <v-btn small fab text
            ><v-icon color="blue" small>mdi-twitter</v-icon></v-btn
          >
        </v-col>

        <v-col cols="12" sm="12" align="center" md="5" class="mt-2 ">
          <v-icon color="blue" class="ml-4" x-small>mdi-check-circle</v-icon>
          <v-icon color="green" x-small>mdi-close-circle-outline</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    staff: {
      type: Object,
      default: null
    }
  }
};
</script>
