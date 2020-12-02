<template>
  <v-container fluid>
    <v-card class="mx-auto">
      <v-toolbar color="primary" dark>
        <v-toolbar-title> User Profile</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text v-if="user != null">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :value="user.username"
                  label="Username"
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :value="user.email"
                  label="Email"
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :value="user.createdDate"
                  label="Created At"
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :value="user.lastModifiedDate"
                  label="Last Modified"
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  value="John Doe"
                  label="Roles"
                  :readonly="readonly"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-text v-else>
        <v-progress-circular
          :width="2"
          color="primary"
          size="20"
          indeterminate
        ></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    readonly: true
  }),
  beforeCreate() {
    this.$store.dispatch("retrieve_profile");
  },
  computed: {
    user() {
      return this.$store.getters.profile;
    }
  }
};
</script>
