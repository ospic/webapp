<template>
  <div>
    <v-progress-circular
      size="52"
      color="indigo"
      indeterminate
      v-if="userslist == null"
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
            $t("label.titles.selfusersmanagement")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px" color="red">
            <v-card dark>
              <v-card-title class="subhead-1 pa-4">
                {{ $t("label.dialogs.deleteuserconfirmdialog") }}</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" small @click="closeDelete">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn color="warning" small @click="deleteItemConfirm">{{
                  $t("label.button.btnyesdelete")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.isStaff`]="{ item }">
        <v-icon class="font-weight-black" color="primary" v-if="item.isStaff">
          mdi-check
        </v-icon>
        <v-icon class="font-weight-black" small color="primary" v-else>
          mdi-close
        </v-icon>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" v-if="false" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="warning">
          mdi-trash-can
        </v-icon>
      </template>
      <template v-slot:no-data>
        <p>No Data available</p>
      </template>
    </v-data-table>
  </div>
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
    this.$store.dispatch("get_self_service_users");
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
    deleteItem(item) {
      this.editedIndex = this.userslist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("delete_user", this.editedItem.id).then(() => {
        this.closeDelete();
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$store.dispatch("get_self_service_users");
    },
  },
  computed: {
    ...mapGetters({
      userslist: "selfserviceusers",
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
