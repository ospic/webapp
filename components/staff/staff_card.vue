<template>
  <v-card class="ma-1 pa-0" link :to="`/staffs/${staff.id}`">
    <v-card-title class="d-flex flex-row justify-center mb-2">
      <v-avatar size="82">
        <img
          alt="user"
          height="100%"
          width="100%"
          :src="
            staff.imageUrl == null
              ? 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
              : staff.imageUrl
          "
        />
      </v-avatar>
    </v-card-title>
    <div class="d-flex flex-row justify-center mb-0">
      <strong
        ><h3>
          {{ staff.fullName === null ? staff.username : staff.fullName }}
        </h3></strong
      >
    </div>

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" align="center" class="mt-0">
          <p class="subtitle mt-0">
            {{ staff.user.roles[0].name.toLowerCase() }}
          </p>
          <p class="font-weight-light text-caption blue--text">
            {{ staff.email }}
          </p>
          <v-icon color="blue" x-small>mdi-check-circle</v-icon>
          <v-icon color="green" x-small>mdi-close-circle-outline</v-icon>
        </v-col>
        <v-col cols="12" sm="12" md="12" align="center">
          <v-btn small fab text
            ><v-icon color="blue">mdi-facebook</v-icon></v-btn
          >
          <v-btn small fab text
            ><v-icon color="purple darken-4">mdi-instagram</v-icon></v-btn
          >
          <v-btn small fab text
            ><v-icon color="blue">mdi-twitter</v-icon></v-btn
          >
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
