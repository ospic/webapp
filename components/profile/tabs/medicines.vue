<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="isActive" color="primary" v-bind="attrs" v-on="on"
          >Add patient medicine</v-btn
        >
      </template>
      <v-card>
        <v-toolbar color="primary" dark
          >Add new service's received by this patient</v-toolbar
        >
        <v-card-text>
          <v-select
            v-model="select"
            :items="medicines"
            item-text="name"
            item-value="id"
            chips
            small-chips
            @click="fetch_medical_services"
            :rules="[v => !!v || 'You must select one to continue!']"
            label="Medical services"
            required
            multiple
            persistent-hint
            single-line
          ></v-select>
        </v-card-text>
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
    select: [],
    dialog: false,
    service_transactions: null,
    type: "medicine",
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
      this.$store.dispatch("initiate_medical_transaction", {
        id: this.$route.params.id,
        services: this.select,
        type: this.type
      });
      this.dialog = false;
    }
  },

  computed: {
    ...mapGetters({
      medicines: "medicines"
    })
  }
};
</script>
