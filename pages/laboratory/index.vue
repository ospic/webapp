<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/laboratory" class="active">Laboratory</router-link>
    </div>
    <v-card class="mx-auto pa-2">
      <v-progress-linear
        v-if="(lbservices = null)"
        value="20"
        buffer-value="0"
        stream
        color="primary"
      ></v-progress-linear>
      <v-data-table
        dense
        v-else
        class="default"
        :headers="headers"
        :items="lbservices"
        :search="search"
        sort-by="isActive"
        :sort-desc="sortDesc"
        mobile-breakpoint="100"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{
              $t("label.titles.laboratoryservices")
            }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  medium
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  v-if="isMdAndUp"
                  dark
                  ><v-icon small>mdi-plus</v-icon>
                  {{ $t("label.button.btnnewlaboratoryservice") }}</v-btn
                >
                <v-btn
                  v-else
                  color="primary"
                  fab
                  small
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
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Service name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.price"
                            label="Price"
                            required
                            type="number"
                            min="0"
                          ></v-text-field>
                        </v-col>

                        <v-col c sm="6" md="6" class="pa-2">
                          <v-checkbox
                            v-model="editedItem.isActive"
                            label="Active?"
                            required
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-textarea
                            v-model="editedItem.descriptions"
                            label="Descriptions"
                          ></v-textarea>
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
        <template v-slot:[`item.isActive`]="{ item }">
          <v-tooltip right v-if="item.isActive" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="red lighten-2"
                >mdi-check</v-icon
              >
            </template>
            <span>Active</span>
          </v-tooltip>
          <div v-else></div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <td @click.stop>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    search: "",
    sortDesc: false,
    editedIndex: -1,
    valid: true,
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Is Active", value: "isActive", sortable: false },
      { text: "Price", value: "price" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      id: "",
      name: "",
      descriptions: "",
      isActive: 0,
      price: 0
    },
    defaultItem: {
      id: "",
      name: "",
      descriptions: "",
      isActive: 0,
      price: 0
    }
  }),
  methods: {
    handleClick: function(item) {
      this.$router.push("roles/" + item.id);
    },
    editItem(item) {
      this.editedIndex = this.lbservices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.request_data();
      });
    },
    request_data() {
      this.$store.dispatch("fetch_laboratory_services");
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("update_laboratory_service", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_laboratory_service", this.editedItem);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch("fetch_laboratory_services");
  },
  computed: {
    ...mapGetters({
      lbservices: "laboratoryservices"
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newlaboratoryservice"
        : "label.titles.editlaboratoryservice";
    }
  }
};
</script>
