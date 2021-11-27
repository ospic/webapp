<template>
  <v-container>
    <v-dialog v-model="dialog" transition="dialog-top-transition" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="isActive" class="button" v-bind="attrs" v-on="on" dark
          ><v-icon small left>mdi-plus</v-icon>Add patient service</v-btn
        >
      </template>
      <v-card>
        <v-toolbar color="primary" dark
          >Add new service's received by this patient</v-toolbar
        >
        <v-card-text>
          <v-select
            v-model="service"
            :items="servicetypes"
            item-text="name"
            item-value="id"
            chips
            small-chips
            @click="fetch_medical_service_types"
            @change="fetch_medical_types"
            :rules="[(v) => !!v || 'You must select one to continue!']"
            label="Medical services"
            required
            persistent-hint
            single-line
          ></v-select>
          <v-select
            v-model="select"
            :items="medicalservices"
            item-text="name"
            item-value="id"
            chips
            small-chips
            :disabled="medicalservices.length <= 0"
            :rules="[(v) => !!v || 'You must select one to continue!']"
            :label="
              medicalservices.length > 0
                ? 'Medical services'
                : 'Selected category have no medical services'
            "
            @change="update_service"
            required
            persistent-hint
            single-line
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn @click="dialog = false">Close</v-btn>
          <v-btn class="warning" @click="save">Save</v-btn>
        </v-card-actions>
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
          :items="transactions"
          mobile-breakpoint="100"
        >
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
    charges: Charges,
  },
  props: {
    consultationsservices: {
      type: Array,
      default: null,
    },
    transaction: {
      type: Object,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    select: null,
    dialog: false,
    service_transactions: null,
    type: "service",
    service: null,
    payload: {},
    data: {
      id: null,
      quantity: 0,
      type: "service",
    },
    headers: [
      { text: "ID", value: "id", class: "primary" },
      {
        text: "Service",
        value: "medicalServiceName",
        sortable: true,
        class: "primary",
      },
      { text: "Department", value: "departmentName", class: "primary" },
      { text: "Amount", value: "amount", sortable: false, class: "primary" },
      { text: "Currency", value: "currencyCode", class: "primary" },
      {
        text: "Reversed",
        value: "isReversed",
        sortable: true,
        class: "primary",
      },
      { text: "Transaction Date", value: "transactionDate", class: "primary" },
    ],
  }),

  methods: {
    fetch_medical_services() {
      this.$store.dispatch("get_medical_services");
    },

    fetch_medical_types: function (it) {
      this.$store.dispatch("get_medical_services_by_type", it);
    },
    update_service: function (it) {
      this.data.id = parseInt(it);
    },
    save() {
      this.payload.route = this.$route.params.id;
      this.data.quantity = parseInt(1);
      this.payload.data = this.data;

      this.$store
        .dispatch("initiate_medical_transaction", this.payload)
        .then((res) => {
          setTimeout(() => this.$emit("update"), this.delay_seconds);
        });
      this.dialog = false;
    },
  },

  computed: {
    ...mapGetters({
      medicalservices: "medicalservices",
      servicetypes: "servicetypes",
    }),
    transactions() {
      return this.transaction.transactions.filter(
        (t) => t.medicalServiceName !== null
      );
    },
  },
};
</script>
