<template>
  <v-container>
    <v-data-table
      dense
      :headers="headers"
      :items="roles"
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
          <v-dialog v-model="dialog" max-width="700px">
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
              <v-card-title class="primary">
                <span>Edit Role privileges</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Name"
                          required
                          readonly
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
                            v => !!v || 'You must select one to continue!'
                          ]"
                          label="Chips"
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="handleClick(item)">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id"
        },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedItem: {
        id: "",
        name: "",
        privileges: []
      },
      dialog: false,
      valid: true
    };
  },
  methods: {
    handleClick: function(value) {
      this.$router.push("roles/" + value.id);
    },
    editItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    request_data() {
      this.$store.dispatch("request_role_privileges");
      this.$store.dispatch("fetchuserroles");
    },
    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem.privileges);
        this.update_role_privileges(
          this.editedItem.id,
          this.editedItem.privileges
        );
        this.close();
      } else {
        console.log("NONE");
      }
    },
    async update_role_privileges(id, payload) {
      return await this.$api
        .$put(`auth/roles/${id}/`, payload)
        .then(response => {
          this.$router.push(`roles/${response.id}`);
          this.request_data();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.$store.dispatch("request_role_privileges");
  },
  computed: {
    ...mapGetters({
      authorities: "privileges",
      roles: "userroles"
    })
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  margin-top: 100px;
  font-family: sans-serif;
}
</style>