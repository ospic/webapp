<template>
  <v-container fluid>
    <v-data-table
      dense
      :headers="headers"
      :items="roles"
      sort-by="id"
      class="elevation-1"
      @click:row="handleClick"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>{{
            $t("label.titles.rolesmanagement")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="button"
                v-bind="attrs"
                v-on="on"
                v-if="isMdAndUp"
                dark
                ><v-icon small left>mdi-plus</v-icon>
                {{ $t("label.button.btnaddnewrole") }}</v-btn
              >
              <v-btn
                v-else
                fab
                small
                class="mb-2 button"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary">
                <span>{{ $t(formTitle) }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Role name"
                          hint="E.g Administrator"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="8">
                        <v-select
                          v-model="editedItem.privileges"
                          :items="authorities"
                          item-text="name"
                          item-value="id"
                          chips
                          disable-lookup
                          deletable-chips
                          clearable
                          small-chips
                          multiple
                          :rules="[
                            (v) => !!v || 'You must select one to continue!',
                          ]"
                          label="Select role permissions"
                          required
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <td @click.stop>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      editedIndex: -1,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
          class: "primary",
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          class: "primary",
        },
        {
          text: "Actions",
          value: "actions",
          class: "primary",
          sortable: false,
        },
      ],
      editedItem: {
        id: "",
        name: "",
        privileges: [],
      },
      dialog: false,
      valid: true,
    };
  },
  methods: {
    handleClick: function (item) {
      this.$router.push("roles/" + item.id);
    },
    editItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$store.dispatch("fetchuserroles");
    },
    request_data() {
      this.$store.dispatch("request_role_privileges");
      this.$store.dispatch("fetchuserroles");
    },
    save() {
      if (this.editedIndex > -1) {
        this.update_role_privileges(this.editedItem.id, this.editedItem);
        this.close();
      } else {
        this.$store.dispatch("create_role", this.editedItem);
        this.close();
      }
    },
    async update_role_privileges(id, payload) {
      return await this.$api
        .$put(`auth/roles/${id}/`, payload)
        .then((response) => {
          this.$router.push(`roles/${response.id}`);
          this.request_data();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.$store.dispatch("request_role_privileges");
    this.$store.dispatch("fetchuserroles");
  },
  computed: {
    ...mapGetters({
      authorities: "privileges",
      roles: "userroles",
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newrole"
        : "label.titles.editrole";
    },
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>
