<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="isActive" color="primary" v-bind="attrs" v-on="on"
          >Add patient medicine</v-btn
        >
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Give new medicine to this patient</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="mx-1">
              <v-col cols="12" sm="12" md="6">
                <v-card-text>
                  <v-select
                    v-model="payload.id"
                    :items="medicines"
                    item-text="name"
                    item-value="id"
                    chips
                    small-chips
                    @click="fetch_medical_services"
                    @click.clear="clear_select"
                    @change="change_select"
                    label="Select Medicine"
                    persistent-hint
                    single-line
                    filled
                    :rules="[v => !!v || 'Medicine is required!']"
                    required
                    clearable
                  ></v-select>
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="6" v-if="payload.id">
                <v-text-field
                  v-model="payload.quantity"
                  label="Quantity"
                  type="number"
                  filled
                  min="1"
                  class="mt-4"
                  :suffix="suffix === null ? '' : suffix"
                  :rules="[v => !!v || 'Quantity is required!']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions class="justify-end">
            <v-btn @click="dialog = false">Close</v-btn>
            <v-btn class="warning" @click="save">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
    <div>
      <v-progress-linear
        indeterminate
        v-if="transaction == null"
      ></v-progress-linear>
      <v-container fluid v-else class="ma-2">
        <v-data-table
          dense
          class="default"
          :headers="headers"
          :items="
            transaction.transactions.filter(t => t.medicalServiceName === null)
          "
          mobile-breakpoint="100"
        >
          <template v-slot:[`item.service`]="{ item }">
            <p v-if="item.medicalServiceName != null">
              {{ item.medicalServiceName }}
            </p>
            <p v-else>{{ item.medicineName }}</p>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import Charges from "./charges.vue";
export default {
  components: {
    charges: Charges
  },
  props: {
    consultationsservices: {
      type: Array,
      default: null
    },
    transaction: {
      type: Object,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    select: null,
    dialog: false,
    service_transactions: null,
    type: "medicine",
    quantity: null,
    valid: false,
    payload: {
      id: null,
      quantity: 0,
      type: "medicine"
    },
    suffix: null,

    headers: [
      { text: "ID", value: "id" },
      { text: "Service", value: "service", sortable: true },
      { text: "Department", value: "departmentName" },
      { text: "Amount", value: "amount", sortable: false },
      { text: "Currency", value: "currencyCode" },
      { text: "Reversed", value: "isReversed", sortable: true },
      { text: "Transaction Date", value: "transactionDate" }
    ]
  }),

  methods: {
    fetch_medical_services() {
      this.$store.dispatch("getmedicines");
    },
    save() {
      console.log(this.payload);
      if (this.$refs.form.validate()) {
        this.payload.id = parseInt(this.$route.params.id);
        this.payload.quantity = parseInt(this.payload.quantity);
        this.$store.dispatch("initiate_medical_transaction", this.payload);
        this.dialog = false;
      }
    },
    clear_select: function() {
      this.select = null;
    },
    change_select: function(it) {
      var med = this.medicines.find(x => x.id === it);
      this.suffix = med === undefined ? "" : med.unit;
    }
  },

  computed: {
    ...mapGetters({
      medicines: "medicines"
    })
  }
};
</script>
