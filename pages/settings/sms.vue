<template>
  <v-data-table
    dense
    :headers="headers"
    :items="smsconfigurations"
    sort-by="isActive"
    :sort-desc="sortDesc"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>{{
          $t("label.titles.smsconfigurations")
        }}</v-toolbar-title>
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
              ><v-icon small>mdi-plus</v-icon>
              {{ $t("label.button.btnnewsmsconfig") }}</v-btn
            >
            <v-btn v-else fab class="button" v-bind="attrs" v-on="on" dark
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title class="primary">
              <span>{{ $t(formTitle) }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
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
              <v-btn color="primary" @click="closeDelete">{{
                $t("label.button.btnno")
              }}</v-btn>
              <v-btn color="warning" @click="deleteItemConfirm">{{
                $t("label.button.btnyes")
              }}</v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-tooltip bottom v-if="!item.isActive">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" @click="activateItem(item.id)">
            mdi-power
          </v-icon>
        </template>
        <span>{{ $t("label.tooltip.activate") }}</span>
      </v-tooltip>
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            color="warning"
            @click="activateItem(item.id)"
          >
            mdi-circle
          </v-icon>
        </template>
        <span>{{ $t("label.tooltip.active") }}</span>
      </v-tooltip>

      <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.isActive`]="{ item }">
      <v-icon class="font-weight-black" color="primary" v-if="item.isActive">
        mdi-check
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
    sortDesc: true,
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
      { text: "SID", value: "sid", class: "primary" },
      { text: "Token", value: "token", class: "primary" },
      { text: "From Number", value: "phoneNumber", class: "primary" },
      { text: "Is Active?", value: "isActive", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      sid: "",
      token: "",
      phoneNumber: "",
      isActive: false,
    },
    defaultItem: {
      id: "",
      name: "",
      sid: "",
      token: "",
      phoneNumber: "",
      isActive: false,
    },
  }),

  beforeMount() {
    this.$store.dispatch("fetch_sms_configurations");
  },
  methods: {
    updatedata() {
      this.$store.dispatch("fetch_sms_configurations");
    },
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
    activateItem(id) {
      console.log(id);
      this.$store.dispatch("activate_sms_configuration", id).then(() => {
        this.updatedata();
      });
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
        this.$store
          .dispatch("update_sms_configuration", this.editedItem)
          .then(() => {
            this.updatedata();
          });
        this.close();
      } else {
        delete this.editedItem.id;
        this.$store
          .dispatch("create_sms_configuration", this.editedItem)
          .then(() => {
            this.updatedata();
          });
        this.close();
      }
    },
  },
  computed: {
    ...mapGetters({
      smsconfigurations: "smsconfigurations",
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newsmsconfigurations"
        : "label.titles.updatesmsconfigurations";
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
