<template>
  <v-card class="ma-1 pa-0" link :to="`/staffs/${staff.id}`">
    <v-card-title>
      <v-list-item class="ma-0 pa-0">
        <v-list-item-avatar height="90" width="90" color="blue lighten-4">
          <v-img
            :src="
              staff.imageUrl == null
                ? 'https://boylancode.com/wp-content/uploads/2018/09/Man-Placeholder-Headshot.png'
                : staff.imageUrl
            "
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="font-weight-regular text-caption">{{
            staff.fullName === null ? staff.username : staff.fullName
          }}</v-list-item-title>
          <v-list-item-subtitle class="font-weight-light text-caption">{{
            staff.user.roles[0].name
          }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-icon color="blue" x-small>mdi-check-circle</v-icon>
            <v-icon color="green" x-small>mdi-close-circle-outline</v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="ml-2 pa-0">
          <v-icon v-if="staff.user.isStaff" color="primary"
            >mdi-badge-account-alert</v-icon
          >
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <v-col cols="12" sm="12" md="6" align="center"
          ><p class="text-h5  black--text">13:30</p></v-col
        >
        <v-col cols="12" sm="12" md="6" class="mt-1 black--text" align="center"
          ><p>{{ staff.id }}/10/2018</p></v-col
        >
      </v-row>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions align="center">
      <v-row>
        <v-col align="center" cols="12" class="ma-0 pa-0">
          <p class="font-weight-light text-caption blue--text">
            {{ staff.email }}
          </p>
        </v-col>
      </v-row>
    </v-card-actions>
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
