<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categories"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      dense
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title><h3>Medicine categories</h3></v-toolbar-title>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            label="Search by name/company/composition"
            single-line
            hide-details
            rounded
            height="40"
            filled
          ></v-text-field
          >&nbsp;&nbsp;
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                v-if="isMdAndUp"
                class="button mb-2"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon left>mdi-plus</v-icon>
                {{ $t("label.button.addnewcategory") }}</v-btn
              >
              <v-btn
                v-else
                color="button"
                fab
                large
                class="mb-2 font-weight-normal"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="primary">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        aria-autocomplete="false"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        v-model="select"
                        :items="measures"
                        item-text="unit"
                        item-value="id"
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
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.descriptions"
                        label="Descriptions"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button cancel" @click="close">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn class="button" @click="save">{{
                  $t("label.button.btnsave")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" dark max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button cancel" @click="closeDelete()">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn class="button delete" @click="deleteItemConfirm()">{{
                  $t("label.button.btndelete")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" color="blue" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <p class="mt-2">{{ $t("label.message.nodataavailable") }}</p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    categories: {
      type: Array,
      default: null,
    },
  },
  data: () => {
    return {
      editedIndex: -1,
      editedItemId: "",
      dialog: false,
      dialogDelete: false,
      search: "",
      select: null,
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Name", value: "name", class: "primary" },
        {
          text: "Descriptions",
          value: "descriptions",
          sortable: false,
          class: "primary",
        },

        { text: "Unit of measurement", value: "measureName", class: "primary" },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          class: "primary",
        },
      ],
      editedItem: {
        id: 0,
        name: "",
        measurementId: 0,
        descriptions: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        measurementId: 0,
        descriptions: "",
      },
    };
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.categories[this.editedIndex], this.editedItem);
        delete this.editedItem.measureName;

        this.editedItem.measurementId = this.select;
        this.$store
          .dispatch("update_medicine_category", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      } else {
        this.categories.push(this.editedItem);
        delete this.editedItem.id;
        this.editedItem.measurementId = this.select;
        this.$store
          .dispatch("add_new_medicine_category", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      }
      this.close();
    },
    close: function () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem: function (item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem: function (item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function () {
      this.$store
        .dispatch("delete_medicine_category", this.editedItem.id)
        .then((res) => {
          setTimeout(() => {
            this.closeDelete();
            this.$emit("update");
          }, this.delay_seconds);
        });
    },
    closeDelete: function () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fetch_measures: function () {
      this.$store.dispatch("fetch_medicine_measurements");
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
  computed: {
    ...mapGetters({
      measures: "medicinemeasurements",
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "New medicine  category"
        : "Edit medicine category";
    },
    datas() {
      return this.categories;
    },
  },
};
</script>
