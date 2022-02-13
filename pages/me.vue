<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/me" class="active">{{
        $t("label.breadcrumb.profile")
      }}</router-link>
    </div>
    <v-container fluid>
      <v-card class="mb-4" flat v-if="edit">
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
      <v-card v-if="!edit" flat class="mx-auto default">
        <v-toolbar color="primary" flat dark>
          <v-toolbar-title> User Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-overlay dark :absolute="true" :value="uploaddialog">
            <v-dialog v-model="uploaddialog" persistent max-width="600">
              <v-card>
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>
                    <span class="headline">
                      Upload profile image</span
                    ></v-toolbar-title
                  >
                </v-toolbar>

                <v-card-text class="pt-4">
                  <v-file-input
                    label="Profile picture"
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    show-size
                    @change="selectFile"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label color="primary">
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.stop="uploaddialog = false">
                    Cancel
                  </v-btn>
                  <v-btn shaped @click="uploadProfileImage()"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-overlay>

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
                  medium
                  class="button upload"
                  color="green"
                  elevation="2"
                  @click="uploaddialog = !uploaddialog"
                  v-if="user.isStaff"
                >
                  <v-icon>mdi-cloud-upload</v-icon>&nbsp;Update image</v-btn
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
            <v-card flat>
              <v-toolbar dark flat class="primary">
                <v-toolbar-title><h3>Update password</h3></v-toolbar-title>
              </v-toolbar>

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
                      passwordConfirmationRule,
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
                <v-btn class="button cancel" small @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  class="button"
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
          <v-container>
            <v-list three-line flat width="100%" class="default">
              <v-list-item>
                <v-list-item-avatar size="120">
                  <v-img
                    :src="entityThumbNail"
                    :alt="user.username"
                    lazy-src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
                  >
                  </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <strong
                      ><h3>Username: {{ user.username }}</h3></strong
                    ></v-list-item-title
                  >
                  <v-list-item-subtitle
                    ><strong
                      >Email: {{ user.email }}</strong
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-container>
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
    progress: false,
    uploaddialog: false,
    confirmPassword: "",
    currentFile: undefined,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
    form_data: {
      oldPassword: "",
      newPassword: "",
    },
  }),
  beforeCreate() {
    this.$store.dispatch("retrieve_profile");
  },
  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
      console.log("File chnaged");
    },
    updatepasssword() {
      this.$store.dispatch("_update_user_password", this.form_data);
    },
    updateprofile() {
      this.progress = true;
      delete this.user.staff.user;
      delete this.user.staff.department;
      this.$store.dispatch("updatestaff", this.user.staff).then((response) => {
        setTimeout(() => this.closeprofileupdate(), this.delay_seconds);
      });
    },
    async uploadProfileImage() {
      const formData = new FormData();
      formData.append("file", this.currentFile);
      const userId = this.$store.getters.userInfos.id;

      return await this.$api
        .$patch(`/auth/${userId}/images/`, formData)
        .then((response) => {
          if (response !== null) {
            this.uploaddialog = false;
            setTimeout(
              () => this.$store.dispatch("retrieve_profile"),
              this.delay_seconds
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeprofileupdate: function () {
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
    },
  },
  created() {
    if (this.$route.query.edit) {
      this.edit = true;
    }
  },
  computed: {
    user() {
      var user = this.$store.getters.profile;
      if (user.staff && user.staff.fullName != undefined) {
        this.edit = true;
      }
      return user;
    },
    entityThumbNail() {
      if (this.user.staff) {
        return this.$api.defaults.baseURL + "auth/" + this.user.id + "/images";
      }
    },
    passwordConfirmationRule() {
      return () =>
        this.form_data.newPassword === this.confirmPassword ||
        "Password must match";
    },
  },
};
</script>
