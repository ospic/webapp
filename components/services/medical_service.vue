<template>
  <v-card class="mx-auto">
    <v-progress-circular
      size="52"
      color="primary"
      indeterminate
      v-if="!services"
    ></v-progress-circular>
    <v-data-table
      dense
      v-else
      class="default"
      :headers="headers"
      :items="services"
      :search="search"
      sort-by="isActive"
      :sort-desc="sortDesc"
      mobile-breakpoint="100"
    >
      <template v-slot:top>
        <v-toolbar flat dark color="primary">
          <v-toolbar-title>{{
            $t("label.titles.servicetypesmanagement")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <h3>{{ routename }}</h3>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-select
            :items="servicetypes"
            item-text="name"
            item-value="name"
            chips
            small-chips
            @click="fetch_medical_service_types"
            @change="filter_medical_services"
            :rules="[(v) => !!v || 'You must select one to continue!']"
            label="Filter by service types"
            required
            persistent-hint
            single-line
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                class="button"
                v-bind="attrs"
                v-on="on"
                v-if="isMdAndUp"
                ><v-icon small left>mdi-plus</v-icon>
                {{ $t("label.button.btnaddnewservice") }}</v-btn
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
                      <v-col cols="12" sm="12" md="6">
                        <v-select
                          v-model="editedItem.medicalServiceType"
                          :items="servicetypes"
                          item-text="name"
                          item-value="id"
                          chips
                          small-chips
                          @click="fetch_medical_service_types"
                          :rules="[
                            (v) => !!v || 'You must select one to continue!',
                          ]"
                          label="Service types"
                          required
                          persistent-hint
                          single-line
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.units"
                          :items="measures"
                          item-text="unit"
                          item-value="symbol"
                          chips
                          small-chips
                          @click="fetch_measures"
                          :rules="[
                            (v) => !!v || 'You must select one to continue!',
                          ]"
                          label="Measure unit"
                          required
                          persistent-hint
                          single-line
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
          <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        </td>
        <td @click.stop>
          <v-icon class="mr-2" color="red" @click="deleteItem(item.id)">
            mdi-trash-can
          </v-icon>
        </td>
        <td @click.stop>
          <v-switch
            v-model="item.isActive"
            inset
            dense
            @change="enableDisableService(item)"
            color="green lighten-1"
          ></v-switch>
        </td>
      </template>
      <template v-slot:no-data>
        <p class="mt-2">{{ $t("label.message.nodataavailable") }}</p>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: {
    services: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    dialog: false,
    search: "",
    sortDesc: false,
    editedIndex: -1,
    valid: true,
    switch1: true,
    headers: [
      { text: "ID", value: "id", sortable: true, class: "primary" },
      { text: "Name", value: "name", class: "primary" },
      {
        text: "Is Active",
        value: "isActive",
        class: "primary",
        sortable: false,
      },
      { text: "Price", value: "price", class: "primary" },
      { text: "Service type", value: "serviceTypeName", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      price: 0,
      medicalServiceType: 0,
      units: "",
    },
    defaultItem: {
      id: "",
      name: "",
      price: 0,
      medicalServiceType: 0,
      units: "",
    },
  }),
  methods: {
    handleClick: function (item) {
      this.$router.push("roles/" + item.id);
    },
    editItem(item) {
      this.editedIndex = this.services.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$emit("update");
      });
    },
    enableDisableService(item) {
      var data = {
        id: item.id,
        action: item.isActive ? "enable" : "disable",
      };
      if (item.isActive) {
        this.$store
          .dispatch("enable_disable_medical_service", data)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      } else {
        this.$store
          .dispatch("enable_disable_medical_service", data)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      }
    },
    deleteItem(serviceId) {
      this.$store.dispatch("delete_medical_service", serviceId).then((res) => {
        setTimeout(() => this.$emit("update"), this.delay_seconds);
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        this.$store.dispatch("update_medical_service", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_new_medical_service", this.editedItem);
      }
      this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newservice"
        : "label.titles.editservice";
    },
    routename() {
      return this.$route.params.service;
    },
  },
};
</script>
