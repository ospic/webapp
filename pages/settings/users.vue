<template>
  <v-data-table
    dense
    :headers="headers"
    :items="userslist"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{
          $t("label.titles.usersmanagement")
        }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              fab
              x-small
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              dark
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ $t(formTitle) }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email Address"
                      type="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.role"
                      :items="roles"
                      attach
                      chips
                      label="Chips"
                      multiple
                    ></v-select>
                  </v-col>
                </v-row>
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
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
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
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
      { text: "Last updated", value: "lastModifiedDate" },
      { text: "Roles", value: "roles" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      id: "",
      username: "",
      email: "",
      password: "",
      role: []
    },
    defaultItem: {
      id: "",
      username: "",
      email: "",
      password: "",
      role: []
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
    roles: ["mod", "admin"]
  }),
  created() {
    console.log("Dispating");
  },
  beforeMount() {
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
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        // Object.assign(this.userslist[this.editedIndex], this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_new_user", this.editedItem);

        // this.userslist.push(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters({
      userslist: "users"
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
