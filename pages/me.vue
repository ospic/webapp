<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/me" class="active">Profile</router-link>
    </div>
    <v-container fluid>
      <v-card class="mb-4" v-if="edit">
        <v-toolbar dark color="primary" flat>
          <v-toolbar-title> Edit staff profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <div v-if="progress">
            <a class="light-blue--text">Please wait...</a>
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </v-toolbar>
        <v-card-text>
          <v-form
            @submit.prevent="updateprofile"
            id="check-update-profile-form"
            class="mt-3"
          >
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.username"
                    label="Username"
                    :readonly="readonly"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.fullName"
                    label="Full name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.contacts"
                    label="Phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.level"
                    label="Level"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.email"
                    label="Email "
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    v-model="user.staff.imageUrl"
                    label="Thumbnail link"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark class="button cancel" @click="edit = !edit">
            cancel
          </v-btn>
          <v-btn class="button" type="submit" form="check-update-profile-form">
            save Updates
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="!edit" class="mx-auto default">
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title> User Profile</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn-toggle borderless rounded v-model="toggle_exclusive">
                <v-btn
                  medium
                  class="button cancel"
                  elevation="2"
                  @click="edit = !edit"
                  v-if="user.isStaff"
                >
                  <v-icon>mdi-pencil</v-icon>edit</v-btn
                >
                <v-btn
                  v-if="user != null"
                  v-bind="attrs"
                  v-on="on"
                  class="button"
                  medium
                  elevation="2"
                >
                  <v-icon small>mdi-lock</v-icon>
                  &nbsp;&nbsp;Change Password</v-btn
                >
              </v-btn-toggle>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Update password
              </v-card-title>

              <v-card-text class="pa-4">
                <v-form
                  @submit.prevent="updatepasssword"
                  id="check-login-form"
                  class="mt-3"
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    v-model="form_data.oldPassword"
                    prepend-inner-icon="mdi-lock"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    error-count="8"
                    label="Old password"
                    placeholder="********"
                    name="input-10-1"
                    counter
                    dense
                    outlined
                    required
                    class="mt-2 ma-5"
                  ></v-text-field>
                  <v-text-field
                    v-model="form_data.newPassword"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    error-count="8"
                    label="New password"
                    placeholder="********"
                    name="input-10-1"
                    hint="At least 8 characters"
                    counter
                    dense
                    outlined
                    required
                    class="mt-2 ma-5"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :rules="[
                      rules.required,
                      rules.min,
                      passwordConfirmationRule
                    ]"
                    :type="show3 ? 'text' : 'password'"
                    @click:append="show3 = !show3"
                    error-count="8"
                    label="Confirm password"
                    placeholder="********"
                    name="input-10-1"
                    counter
                    dense
                    outlined
                    required
                    class="mt-2 ma-5"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" small @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="warning"
                  small
                  type="submit"
                  :disabled="!valid"
                  form="check-login-form"
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                  <h5>Roles:</h5>
                  <v-chip
                    v-for="(role, i) in user.roles"
                    :key="i"
                    class="pa-1 mr-1 "
                    :color="getColor(role.name.toLowerCase())"
                    small
                    >{{ role.name.toLowerCase() }}</v-chip
                  >
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
  </div>
</template>
<script>
export default {
  data: () => ({
    readonly: true,
    dialog: false,
    valid: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    edit: false,
    toggle_exclusive: 2,
    progress: false,

    confirmPassword: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    form_data: {
      oldPassword: "",
      newPassword: ""
    }
  }),
  beforeCreate() {
    this.$store.dispatch("retrieve_profile");
  },
  methods: {
    updatepasssword() {
      this.$store.dispatch("_update_user_password", this.form_data).then(() => {
        this.close();
      });
    },
    updateprofile() {
      this.progress = true;
      delete this.user.staff.user;
      delete this.user.staff.department;
      this.$store.dispatch("updatestaff", this.user.staff).then(response => {
        setTimeout(() => this.closeprofileupdate(), this.delay_seconds);
      });
    },
    closeprofileupdate: function() {
      this.$store.dispatch("retrieve_profile");
      this.edit = false;
      this.progress = false;
    },
    close() {
      this.$refs.form.reset();
      this.dialog = false;
      this.$store.dispatch("_clear_local_storage_and_sign_out");
    },
    getColor(role) {
      if (role === "user") {
        return "yellow";
      } else if (role === "admin") {
        return "blue darken-3 white--text";
      } else if (role === "moderator") {
        return "green";
      } else {
        return "cyan";
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.profile;
    },
    passwordConfirmationRule() {
      return () =>
        this.form_data.newPassword === this.confirmPassword ||
        "Password must match";
    }
  }
};
</script>
