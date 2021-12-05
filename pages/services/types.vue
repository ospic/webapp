<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>

      <router-link to="/services">{{
        $t("label.breadcrumb.services")
      }}</router-link>
      <router-link to="/services/types" class="active"
        >{{ $t("label.breadcrumb.servicecategories") }}
      </router-link>
    </div>
    <v-card class="mx-auto">
      <v-progress-circular
        size="52"
        color="primary"
        indeterminate
        v-if="servicetypes.length < 0"
      ></v-progress-circular>
      <v-data-table
        dense
        v-else
        class="default"
        :headers="headers"
        :items="servicetypes"
        :search="search"
        sort-by="isActive"
        :sort-desc="sortDesc"
        mobile-breakpoint="100"
        @click:row="handleClick"
      >
        <template v-slot:top>
          <v-toolbar flat dark color="primary">
            <v-toolbar-title>{{
              $t("label.titles.servicetypesmanagement")
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
                  {{ $t("label.button.btnaddnewservicetype") }}</v-btn
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
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Service type name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.descriptions"
                            label="Descriptions"
                            required
                            min="0"
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
            <v-icon
              small
              class="mr-2"
              color="red"
              @click="deleteMedicalServiceType(item.id)"
            >
              mdi-trash-can
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
      { text: "ID", value: "id", class: "primary" },
      { text: "Name", value: "name", class: "primary" },
      {
        text: "Description",
        value: "descriptions",
        class: "primary",
        sortable: false,
      },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      descriptions: "",
    },
    defaultItem: {
      id: "",
      name: "",
      descriptions: "",
    },
  }),
  methods: {
    handleClick: function (item) {
      this.$router.push("/services/" + item.name);
    },
    editItem(item) {
      this.editedIndex = this.servicetypes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        setTimeout(() => this.request_data(), this.delay_seconds);
      });
    },
    request_data() {
      this.$store.dispatch("get_medical_service_types");
    },
    deleteMedicalServiceType(id) {
      console.log(id);
      this.$store.dispatch("delete_medical_service_type", id).then((res) => {
        setTimeout(() => this.request_data(), this.delay_seconds);
      });
    },
    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        delete this.editedItem.new;
        this.$store.dispatch("update_medical_service_type", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch(
          "create_new_medical_service_type",
          this.editedItem
        );
      }
      this.close();
    },
  },
  created() {
    this.request_data();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newservicetype"
        : "label.titles.editservicetype";
    },
    ...mapGetters({
      servicetypes: "servicetypes",
      measures: "medicinemeasurements",
    }),
  },
};
</script>
