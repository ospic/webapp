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
        <v-toolbar flat>
          <v-toolbar-title>{{
            $t("label.titles.selfusersmanagement")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.isStaff`]="{ item }">
        <v-icon class=" font-weight-black" color="primary" v-if="item.isStaff">
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
        value: "id"
      },
      {
        text: "Username",
        align: "start",
        sortable: false,
        value: "username"
      },
      { text: "Email", value: "email" },
      { text: "Is Staff ?", value: "isStaff" },
      { text: "Roles", value: "roles" }
    ],
    editedItem: {
      id: "",
      username: "",
      isStaff: false,
      email: "",
      staff: null,
      password: "",
      roles: [],
      departmentId: 0
    },
    defaultItem: {
      id: "",
      username: "",
      isStaff: false,
      email: "",
      staff: null,
      password: "",
      roles: [],
      departmentId: 0
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
      "cyan"
    ],
    currentColor: "",
    valid: true,

    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length > 5) || "Name must be less than 5 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
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
    }
  },
  computed: {
    ...mapGetters({
      userslist: "selfserviceusers"
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newuser"
        : "label.titles.edituser";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  }
};
</script>
