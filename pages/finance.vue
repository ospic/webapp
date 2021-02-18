<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/finance" class="active">Finance</router-link>
    </div>
    <v-card class="pa-2" color="#F5F5F5">
      <v-row no-gutters>
        <v-col md="3">
          <total-amount :amount="transaction.totalAmount"></total-amount>
        </v-col>
        <v-col md="9">
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
                :items="transaction.transactions"
                mobile-breakpoint="100"
                group-by="consultationId"
                @click:row="viewconsultation"
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
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TransactionTotalsCard from "@/components/finance/total-cards";
export default {
  components: {
    "total-amount": TransactionTotalsCard
  },

  data: () => ({
    title: "45% This week",
    dialog: false,
    service_transactions: null,
    type: "service",
    headers: [
      { text: "#", value: "id" },
      { text: "ID", value: "consultationId" },
      { text: "Service", value: "service", sortable: true },
      { text: "Department", value: "departmentName" },
      { text: "Amount", value: "amount", sortable: false },
      { text: "Currency", value: "currencyCode" },
      { text: "Reversed", value: "isReversed", sortable: true },
      { text: "Transaction Date", value: "transactionDate" }
    ]
  }),
  methods: {
    viewconsultation: function(item) {
      this.$router.push("consultations/" + item.consultationId);
    }
  },

  created() {
    this.$store.dispatch("get_transactions");
  },
  computed: {
    ...mapGetters({
      transaction: "transactions"
    })
  }
};
</script>
