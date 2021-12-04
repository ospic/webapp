<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="measures"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      dense
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title><h3>Medicine measurement units</h3></v-toolbar-title>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            label="Search by ..."
            single-line
            hide-details
            rounded
            filled
            height="40"
          ></v-text-field
          >&nbsp;&nbsp;
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-large
                elevation="1"
                v-if="isMdAndUp"
                class="button"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon left>mdi-plus</v-icon>
                {{ $t("label.button.addnewmeasure") }}</v-btn
              >
              <v-btn v-else fab class="button" v-bind="attrs" v-on="on" dark
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.unit"
                        label="Unit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.symbol"
                        label="Symbol"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.quantity"
                        label="Quantity"
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
                  $t(
                    editedIndex === -1
                      ? "label.button.btnsave"
                      : "label.button.btnedityes"
                  )
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button py-2" @click="closeDelete()">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn
                  class="button cancel py-2"
                  @click="deleteItemConfirm()"
                  >{{ $t("label.button.btnyesdelete") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" color="blue lighten-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    measures: {
      type: Array,
      default: null,
    },
  },
  data: function () {
    return {
      dialog: false,
      dialogDelete: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        id: 0,
        unit: "",
        symbol: "",
        quantity: "",
      },
      defaultItem: {
        id: 0,
        unit: "",
        symbol: "",
        quantity: "",
      },
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Unit", value: "unit", class: "primary" },
        { text: "Symbol", value: "symbol", sortable: false, class: "primary" },
        {
          text: "Quantity",
          value: "quantity",
          sortable: false,
          class: "primary",
        },

        {
          text: "Actions",
          value: "actions",
          sortable: false,
          class: "primary",
        },
      ],
    };
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.measures[this.editedIndex], this.editedItem);
        this.$store
          .dispatch("update_medicine_measure", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      } else {
        this.$store
          .dispatch("create_medicine_measurement", this.editedItem)
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
      this.editedIndex = this.measures.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem: function (item) {
      this.editedIndex = this.measures.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: function () {
      console.log(this.editedItem);
      this.$store
        .dispatch("delete_medicine_measure", this.editedItem.id)
        .then((res) => {
          setTimeout(() => {
            this.$emit("update");
            this.closeDelete();
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
    ...mapGetters({}),
    formTitle() {
      return this.editedIndex === -1
        ? "New medicine  measures"
        : "Edit medicine measures ?";
    },
  },
};
</script>
