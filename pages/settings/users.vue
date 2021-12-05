<template>
  <v-container fluid>
    <v-progress-circular
      size="52"
      color="indigo"
      indeterminate
      v-if="!userslist"
    ></v-progress-circular>
    <v-data-table
      v-else
      dense
      :headers="headers"
      :items="userslist"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>{{
            $t("label.titles.usersmanagement")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="button"
                v-bind="attrs"
                v-on="on"
                x-large
                v-if="isMdAndUp"
                ><v-icon>mdi-plus</v-icon>
                {{ $t("label.button.btncreatenewuser") }}</v-btn
              >

              <v-btn v-else color="button" fab v-bind="attrs" v-on="on" dark
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="primary">
                <span>{{ $t(formTitle) }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.username"
                          :rules="nameRules"
                          label="Username"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" v-if="editedIndex === -1">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Password"
                          type="password"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          :rules="emailRules"
                          label="Email Address"
                          type="email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.roles"
                          :items="userroles"
                          item-text="name"
                          item-value="id"
                          chips
                          small-chips
                          multiple
                          :rules="[
                            (v) => !!v || 'You must select one to continue!',
                          ]"
                          label="Role"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-2">
                        <v-checkbox
                          v-model="editedItem.isStaff"
                          label="Is Staff?"
                          required
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.departmentId"
                          :items="departments"
                          item-text="name"
                          item-value="id"
                          chips
                          small-chips
                          v-if="editedItem.isStaff"
                          :rules="[
                            (v) => !!v || 'You must select one to continue!',
                          ]"
                          label="Department"
                          @click="_fetch_departments"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" small @click="close">
                  {{ $t("label.button.btncancel") }}
                </v-btn>
                <v-btn color="warning" small @click="save">
                  {{ $t("label.button.btnsave") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px" color="red">
            <v-card>
              <v-card-title class="subhead-1 pa-4">
                {{ $t("label.dialogs.deleteconfirmdialog") }}</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" x-small @click="closeDelete">{{
                  $t("label.button.btnno")
                }}</v-btn>
                <v-btn color="warning" x-small @click="deleteItemConfirm">{{
                  $t("label.button.btnyes")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.isStaff`]="{ item }">
        <v-icon class="font-weight-black" color="primary" v-if="item.isStaff">
          mdi-check
        </v-icon>
        <v-icon class="font-weight-black" color="primary" small v-else>
          mdi-close
        </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon color="blue" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.roles`]="{ item }">
        <v-chip
          v-for="(role, i) in item.roles"
          :key="i"
          class="pa-1 mr-1"
          :color="getColor(role.name.toLowerCase())"
          x-small
          >{{ role.name.toLowerCase() }}</v-chip
        >
      </template>
      <template v-slot:no-data>
        <p>No Data available</p>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    role: 0,
    editedIndex: -1,
    departmentId: null,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        class: "primary",
      },
      {
        text: "Username",
        align: "start",
        sortable: false,
        value: "username",
        class: "primary",
      },
      { text: "Email", value: "email", class: "primary" },
      { text: "Is Staff ?", value: "isStaff", class: "primary" },
      { text: "Roles", value: "roles", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      username: "",
      isStaff: false,
      email: "",
      staff: null,
      password: "",
      roles: [],
      departmentId: 0,
    },
    defaultItem: {
      id: "",
      username: "",
      isStaff: false,
      email: "",
      staff: null,
      password: "",
      roles: [],
      departmentId: 0,
    },
    colors: [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "teal",
      "orange",
      "brown",
      "deep-orange",
      "blue-grey",
      "cyan",
    ],
    currentColor: "",
    valid: true,

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length > 5) || "Name must be less than 5 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  created() {
    this.$store.dispatch("fetchuserroles");
    this.$store.dispatch("retrieveAllusers");
  },
  methods: {
    getColor(role) {
      if (role === "user") {
        return "yellow";
      } else if (role === "admin") {
        return "red darken-3 white--text";
      } else if (role === "moderator") {
        return "green";
      } else {
        return "cyan";
      }
    },
    editItem(item) {
      this.editedIndex = this.userslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.departmentId =
        this.editedItem.staff === null
          ? null
          : this.editedItem.staff.department.id;
      var roles = [];
      this.editedItem.roles.forEach((role) => {
        roles.push(role.id);
      });
      this.editedItem.roles = roles;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.userslist.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        setTimeout(() => this._get_users(), this.delay_seconds);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      setTimeout(() => this._get_users(), this.delay_seconds);
    },

    save() {
      if (this.editedIndex > -1) {
        var did = this.editedItem.id;
        delete this.editedItem.staff;
        var payload = { id: did, data: this.editedItem };
        this.$store.dispatch("updateuserdetails", payload);
      } else {
        delete this.editedItem.id;
        if (this.$refs.form.validate()) {
          this.$store.dispatch("create_new_user", this.editedItem);
        }
      }
      this.close();
    },
    _fetch_departments() {
      this.$store.dispatch("retrieve_departments");
    },
    _get_users: function () {
      this.$store.dispatch("retrieveAllusers");
    },
  },
  computed: {
    ...mapGetters({
      userslist: "users",
      userroles: "userroles",
      departments: "departments",
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newuser"
        : "label.titles.edituser";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>
