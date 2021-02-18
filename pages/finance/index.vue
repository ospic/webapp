<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/finance" class="active">Finance</router-link>
    </div>
    <v-card class="pa-2" color="#F5F5F5">
      <v-card-title class="font-weight-black">Bills</v-card-title>
      <v-row no-gutters>
        <!--<v-col md="3">
          <total-amount :amount="amount"></total-amount>
        </v-col>-->
        <v-col md="12">
          <div>
            <v-progress-linear
              indeterminate
              v-if="bills == null"
            ></v-progress-linear>
            <v-container fluid v-else class="ma-2">
              <v-data-table
                dense
                class="default"
                :headers="headers"
                :items="bills"
                mobile-breakpoint="100"
                group-by="lastUpdatedDate"
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
  layout: "finance",
  components: {
    "total-amount": TransactionTotalsCard
  },

  data: () => ({
    title: "45% This week",
    dialog: false,
    service_transactions: null,
    type: "service",
    amount: 0.0,
    headers: [
      { text: "NID", value: "id" },
      { text: "Patient", value: "patientName" },
      { text: "Amount", value: "totalAmount", sortable: false },
      { text: "Paid Amount", value: "paidAmount" },
      { text: "Paid ?", value: "isPaid" },
      { text: "No.", value: "extraId", sortable: true },
      { text: "CI", value: "consultationId" },
      { text: "Active", value: "isActive", sortable: true },
      { text: "Created Date", value: "createdDate" },
      { text: "Last modified Date", value: "lastUpdatedDate" }
    ]
  }),
  methods: {
    viewconsultation: function(item) {
      this.$router.push("finance/bill/" + item.id);
    }
  },

  created() {
    this.$store.dispatch("get_bills");
  },
  computed: {
    ...mapGetters({
      bills: "bills"
    })
  }
};
</script>
