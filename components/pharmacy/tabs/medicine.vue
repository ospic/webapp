<template>
  <div>
    <v-progress-circular
      size="32"
      indeterminate
      color="primary"
      v-if="medicines == null"
    ></v-progress-circular>
    <v-data-table
      v-else
      :headers="headers"
      :items="medicines"
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
              Medicines
            </h3></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search by name/company/composition"
            hide-details
            rounded
            height="40"
            filled
          ></v-text-field
          >&nbsp;&nbsp;
          <v-dialog v-model="dialog" max-width="900px">
            <template v-if="showaction" v-slot:activator="{ on, attrs }">
              <v-btn
                color="button"
                elevation="1"
                medium
                prepend-icon="mdi-plus"
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                dark
                v-if="isMdAndUp"
                ><v-icon left>mdi-plus</v-icon
                >{{ $t("label.button.addnewmedicine") }}</v-btn
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
              <v-toolbar dark flat color="primary">
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              </v-toolbar>

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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.genericName"
                        label="Generic Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.buyingPrice"
                        type="number"
                        label="Buying price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.company"
                        label="Company"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.compositions"
                        label="Compositions"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.sellingPrice"
                        type="number"
                        label="Selling price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.group"
                        :items="template.medicineGroupOptions"
                        label="Group"
                        item-text="name"
                        :item-value="'id'"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.category"
                        :items="template.medicineCategoriesOptions"
                        label="Medical Category"
                        :item-value="'id'"
                      >
                        <template slot="selection" slot-scope="{ item }">
                          {{ item.name }} - {{ item.id }}
                        </template>
                        <template slot="item" slot-scope="{ item }">
                          {{ item.id }} - {{ item.name }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.effects"
                        label="Effects"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.expireDateTime"
                            label="To Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'Date is required']"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.expireDateTime"
                          no-title
                          scrollable
                          required
                          @input="menu2 = false"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu2 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.units"
                        :items="measures"
                        item-text="unit"
                        item-value="name"
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
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="primary darken-1" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.group`]="{ item }">
        <p>{{ item.group.name }}</p>
      </template>
      <template v-slot:[`item.category`]="{ item }">
        <p>{{ item.group.name }}</p>
      </template>
      <template v-if="showaction" v-slot:[`item.actions`]="{ item }">
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
    medicines: {
      type: Array,
      default: null
    },
    showaction: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    dialog: false,
    search: "",
    medicinos: null,
    menu1: false,
    menu2: false,
    tab: null,
    date: new Date().toISOString().substr(0, 7),
    headers: [
      { text: "Name", value: "name" },
      { text: "Generic Name", value: "genericName" },
      { text: "Company", value: "company", sortable: false },
      { text: "Composition", value: "compositions" },
      { text: "Quantity left", value: "quantity", sortable: true },
      { text: "Group", value: "group", sortable: true },
      { text: "Buying price", value: "buyingPrice" },
      { text: "Selling price", value: "sellingPrice" },
      { text: "Category", value: "category", sortable: true },
      { text: "Effects", value: "effects" },
      { text: "Expire Date", value: "expireDateTime" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItemId: "",
    editedItem: {
      id: 0,
      name: "",
      genericName: "",
      company: "",
      compositions: "",
      category: "",
      quantity: 0,
      group: "",
      units: "",
      buyingPrice: 0,
      sellingPrice: 0,
      expireDateTime: null
    },
    defaultItem: {
      id: 0,
      name: "",
      genericName: "",
      company: "",
      compositions: "",
      category: "",
      quantity: 0,
      group: "",
      units: "",
      buyingPrice: 0,
      sellingPrice: 0,
      expireDateTime: null
    }
  }),
  created() {},
  beforeMount() {
    // this.$store.dispatch("getmedicines");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.medicines.indexOf(item);
      var measureunit = this.measures.find(
        x => x.unit === this.editedItem.unit
      );

      this.editedItem.units = measureunit;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem(item) {
      const index = this.medicines.indexOf(item);
      confirm("Are you sure you want to delete this item?");
      //this.datalist.splice(index, 1);
      //this.$store.dispatch("delete_patient", item.id);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.medicines[this.editedIndex], this.editedItem);
        this.editedItem.group = this.editedItem.group.id;

        this.editedItem.category = this.editedItem.category.id;
        delete this.editedItem.unit;
        this.editedItem.price = parseFloat(this.editedItem.price + ".00");
        this.$store.dispatch("update_medicine_product", this.editedItem);
      } else {
        this.medicines.push(this.editedItem);
        this.$store.dispatch("add_new_medicine", this.editedItem);
      }
      this.close();
    },
    handleClick: function(value) {
      console.log(value);
      this.$router.push("/patients/" + value.id);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$store.dispatch("retrieve_medicine_template");
    }
  },
  computed: {
    ...mapGetters({
      measures: "medicinemeasurements",
      template: "medicine_templates"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New medicine" : "Edit medicine";
    }
  }
};
</script>
