<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categories"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      dense
      class="elevation-0 "
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title
            ><h3>
              Medicine categories
            </h3></v-toolbar-title
          >
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
                color="button"
                elevation="1"
                medium
                v-if="isMdAndUp"
                class="mb-2 font-weight-normal"
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
                small
                class="mb-2 font-weight-normal"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
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
                          v => !!v || 'You must select one to continue!'
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

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn color="warning" medium @click="save">{{
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
                <v-btn color="indigo" class="py-2" @click="closeDelete()">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn
                  color="warning darken-1"
                  class="py-2"
                  @click="deleteItemConfirm()"
                  >{{ $t("label.button.btndelete") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="indigo darken-4" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
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
      default: null
    }
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
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Descriptions", value: "descriptions", sortable: false },

        { text: "Unit of measurement", value: "measureName" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedItem: {
        id: 0,
        name: "",
        measurementId: 0,
        descriptions: ""
      },
      defaultItem: {
        id: 0,
        name: "",
        measurementId: 0,
        descriptions: ""
      }
    };
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.categories[this.editedIndex], this.editedItem);
        delete this.editedItem.measureName;

        this.editedItem.measurementId = this.select;
        this.$store.dispatch("update_medicine_category", this.editedItem);
        //this.$emit("update");
      } else {
        this.categories.push(this.editedItem);
        delete this.editedItem.id;
        this.editedItem.measurementId = this.select;
        this.$store.dispatch("add_new_medicine_category", this.editedItem);
        this.$emit("update");
      }
      this.close();
    },
    close: function() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem: function(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem: function(item) {
      this.editedIndex = this.categories.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function() {
      this.closeDelete();
    },
    closeDelete: function() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fetch_measures: function() {
      this.$store.dispatch("fetch_medicine_measurements");
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  computed: {
    ...mapGetters({
      measures: "medicinemeasurements"
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "New medicine  category"
        : "Edit medicine category";
    },
    datas() {
      return this.categories;
    }
  }
};
</script>
