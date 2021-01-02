<template>
  <v-data-table
    dense
    :headers="headers"
    :items="smsconfigurations"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{
          $t("label.titles.smsconfigurations")
        }}</v-toolbar-title>
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
              <span>{{ $t(formTitle) }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.sid"
                        label="SID"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.token"
                        label="Token"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.phoneNumber"
                        label="Phone number"
                        required
                      ></v-text-field>
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
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
    valid: true,
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
      { text: "SID", value: "sid" },
      { text: "Token", value: "token" },
      { text: "From Number", value: "phoneNumber" },
      { text: "Is Active?", value: "isActive" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      id: "",
      name: "",
      sid: "",
      token: "",
      phoneNumber: "",
      isActive: false
    },
    defaultItem: {
      id: "",
      name: "",
      sid: "",
      token: "",
      phoneNumber: "",
      isActive: false
    }
  }),

  beforeMount() {
    this.$store.dispatch("fetch_sms_configurations");
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.smsconfigurations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.smsconfigurations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.smsconfigurations.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.reset();
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
        // Object.assign(this.smsconfigurations[this.editedIndex], this.editedItem);
        this.close();
      } else {
        delete this.editedItem.id;
        if (this.$refs.form.validate()) {
          console.log(this.editedItem);
          // this.$store.dispatch("create_sms_configuration", this.editedItem);
          this.close();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      smsconfigurations: "smsconfigurations"
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newsmsconfigurations"
        : "label.titles.updatesmsconfigurations";
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
