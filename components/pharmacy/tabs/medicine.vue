<template>
  <div>
    <v-progress-circular
      size="32"
      indeterminate
      color="primary"
      v-if="medicines == null"
    ></v-progress-circular>
    <v-data-table
      v-if="medicines != null && list"
      :headers="headers"
      :items="medicines"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      dense
      class="elevation-0 text-xs-left"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title><h3>Medicines</h3></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="search"
              label="Search by name/company/composition"
              hide-details
              rounded
              height="40"
              filled
            ></v-text-field>
          </v-col>
          &nbsp;&nbsp;
          <v-dialog v-model="dialog" max-width="900px">
            <template v-if="showaction" v-slot:activator="{ on, attrs }">
              <v-btn-toggle
                v-if="isMdAndUp"
                borderless
                rounded
                v-model="toggle_exclusive"
              >
                <v-btn color="blue" @click="list = !list">
                  <v-icon>mdi-view-grid</v-icon>
                </v-btn>
                <v-btn
                  class="button"
                  prepend-icon="mdi-plus"
                  v-bind="attrs"
                  v-on="on"
                  dark
                  ><v-icon left>mdi-plus</v-icon
                  >{{ $t("label.button.addnewmedicine") }}</v-btn
                >
              </v-btn-toggle>

              <v-btn class="button" fab v-else v-bind="attrs" v-on="on" dark
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="primary">
                <span>{{ formTitle }}</span>
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
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.genericName"
                        label="Generic Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.quantity"
                        type="number"
                        min="0"
                        label="Quantity"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.buyingPrice"
                        type="number"
                        min="0"
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
                        min="0"
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
                      <v-text-field
                        v-model="editedItem.strength"
                        label="Strength"
                        suffix="mg/ml"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.batchNumber"
                        label="Batch Number"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref=""
                        v-model="purchasedate"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.purchaseDateTime"
                            label="Purchase Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || 'Date is required']"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.purchaseDateTime"
                          no-title
                          scrollable
                          required
                          @input="purchasedate = false"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="purchasedate = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.purchasedate.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
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
                            label="Expired Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="[(v) => !!v || 'Date is required']"
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

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        class="my-input input"
                        v-model="editedItem.storeBox"
                        label="Store Box"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button cancel" @click="close">Cancel</v-btn>
                <v-btn class="button" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-tooltip
          right
          :color="item.isExpired ? 'red' : 'warning'"
          v-if="item.isExpiring"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="item.isExpired ? 'red' : 'warning'"
              dark
              v-bind="attrs"
              v-on="on"
              v-html="item.isExpired ? 'mdi-clock-alert' : 'mdi-circle'"
            >
            </v-icon>
          </template>
          <span color="primary" v-if="item.daysToExpire > 0"
            >{{ item.name }} is about to expire on next
            {{ item.daysToExpire }} days. On
            {{ item.expireOn }}
          </span>

          <span color="primary" v-if="item.isExpired"
            >{{ item.name }} is expired about {{ item.daysToExpire * -1 }} days
            ago. On

            {{ item.expireOn }}
          </span>
          <span color="primary" v-if="item.daysToExpire === 0"
            >{{ item.name }} is going to be expired today
          </span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.more`]="{ item }">
        <v-tooltip right color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              v-html="'mdi-information-outline'"
            >
            </v-icon>
          </template>
          <v-list color="primary" dark dense>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>GENERIC NAME</v-list-item-title>
                <v-list-item-subtitle
                  >{{ item.genericName }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item color="primary" three-line>
              <v-list-item-content>
                <v-list-item-title>GROUP</v-list-item-title>
                <v-list-item-subtitle
                  >{{ item.group.name }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item.group.descriptions }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>COMPOSITION</v-list-item-title>
                <v-list-item-subtitle
                  >{{ item.compositions }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>MANUFACTURE</v-list-item-title>
                <v-list-item-subtitle>{{ item.company }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tooltip>
      </template>

      <template class="primary"> </template>
      <template v-if="showaction" v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="indigo darken-4" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <p class="mt-2">{{ $t("label.message.nodataavailable") }}</p>
      </template>
    </v-data-table>
    <v-card v-else class="mx-auto" flat tile>
      <v-toolbar class="primary" dark>
        <v-card-title>
          <span>Grid view</span>
        </v-card-title>

        <v-spacer></v-spacer>
        <v-btn medium class="button cancel" @click="list = !list">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container class="ma-2 pa-0 px-2" fluid>
          <v-row justify="start" align="start" class="mt-2">
            <v-col
              class="pa-1"
              xs="6"
              sm="6"
              md="2"
              v-for="(item, i) in sortedmedicines"
              :key="i"
            >
              <v-tooltip bottom :disabled="!item.isExpiring" color="primary">
                <template v-slot:activator="{ on, attrs }">
                  <v-card flat outlined v-bind="attrs" v-on="on">
                    <v-list-item>
                      <v-avatar
                        :color="item.isExpiring ? 'red' : 'blue'"
                        size="48"
                        class="ml-0 mr-3"
                      >
                        <v-icon color="white">mdi-pill</v-icon></v-avatar
                      >

                      <v-list-item-content>
                        <v-list-item-subtitle
                          class="font-weight-normal"
                          v-html="item.name"
                        ></v-list-item-subtitle>
                        <v-list-item-title
                          class="text-h6 font-weight-black my-1"
                          v-html="`Quantity left: ` + item.quantity"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </template>
                <span>{{ $t("label.tooltip.expirewarning") }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    medicines: {
      type: Array,
      default: null,
    },
    showaction: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    dialog: false,
    search: "",
    medicinos: null,
    menu1: false,
    menu2: false,
    purchasedate: false,
    tab: null,
    list: true,
    date: new Date().toISOString().substr(0, 7),
    headers: [
      { text: "", value: "status", class: "primary" },
      { text: "Name", value: "name", class: "primary", align: "left" },
      { text: "Store Box", value: "storeBox", class: "primary" },
      { text: "Strength(mg/ml)", value: "strength", class: "primary" },

      {
        text: "Quantity left",
        value: "quantity",
        class: "primary",
        sortable: true,
      },
      { text: "Buying price", value: "buyingPrice", class: "primary" },
      { text: "Selling price", value: "sellingPrice", class: "primary" },

      {
        text: "Category",
        value: "category.name",
        class: "primary",
        sortable: true,
      },

      { text: "Batch #", value: "batchNumber", class: "primary" },
      { text: "Effects", value: "effects", class: "primary" },
      { text: "Purchase", value: "purchasedOn", class: "primary" },
      { text: "Expire", value: "expireOn", class: "primary" },
      { text: "More", value: "more", class: "primary", sortable: false },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
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
      expireDateTime: null,
      storeBox: "",
      purchaseDateTime: null,
      batchNumber: "",
      strength: "",
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
      expireDateTime: null,
      storeBox: "",
      purchaseDateTime: null,
      batchNumber: "",
      strength: "",
    },
  }),
  created() {
    this.$store.dispatch("fetch_medicine_measurements");
  },
  beforeMount() {
    // this.$store.dispatch("getmedicines");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.medicines.indexOf(item);
      var dt = item.expireDate;
      var xdt = item.purchaseDate;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
      this.editedItem.units = this.$store.getters.get_measure_by_unit(
        item.unit
      );

      this.editedItem.expireDateTime = dt.substring(0, dt.length - 8);
      this.editedItem.purchaseDateTime = xdt.substring(0, xdt.length - 8);
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

        setTimeout(() => this.$emit("update"), this.delay_seconds);
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.medicines[this.editedIndex], this.editedItem);
        this.editedItem.group = this.editedItem.group.id;

        this.editedItem.category = this.editedItem.category.id;
        delete this.editedItem.unit;
        this.editedItem.price = parseFloat(this.editedItem.price + ".00");
        if (this.editedItem.units instanceof Object) {
          this.editedItem.units = this.editedItem.units.symbol;
        }
        this.$store.dispatch("update_medicine_product", this.editedItem);
      } else {
        this.medicines.push(this.editedItem);
        this.$store.dispatch("add_new_medicine", this.editedItem);
      }
      this.close();
    },
    handleClick: function (value) {
      this.$router.push("/patients/" + value.id);
    },
    comparator: function (a, b) {
      return parseInt(a["quantity"], 10) - parseInt(b["quantity"], 10);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$store.dispatch("retrieve_medicine_template");
    },
  },
  computed: {
    ...mapGetters({
      measures: "medicinemeasurements",
      template: "medicine_templates",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New medicine" : "Edit medicine";
    },
    sortedmedicines() {
      var md = this.medicines.sort(function (a, b) {
        return parseFloat(a.quantity) - parseFloat(b.quantity);
      });
      return md;
    },
  },
};
</script>
<style>
.my-input input {
  text-transform: uppercase;
}
</style>
