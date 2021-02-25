<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/finance">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link to="/finance/bills" class="active">Bills</router-link>
    </div>
    <v-card class="pa-2" color="#F5F5F5">
      <v-card-title class="font-weight-black">Bills</v-card-title>
      <v-row no-gutters>
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
                :search="search"
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
                <template v-slot:[`item.actions`]="{ item }">
                  <td @click.stop class="none-clickable">
                    <v-icon
                      small
                      class="blue--text"
                      @click="viewreceipt(item.consultationId)"
                    >
                      mdi-eye
                    </v-icon>
                  </td>
                </template>
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-row no-gutters>
                      <v-col cols="12" md="2" align-self="center">
                        <h3 class="title">Blood Bank</h3>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="search"
                          append-icon="search"
                          label="Enter search text ..."
                          solo
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-dialog v-model="dialog" max-width="600px">
                      <v-card>
                        <v-card-text>
                          <receipt></receipt>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:no-data>
                  <v-progress-linear
                    indeterminate
                    color="cyan"
                  ></v-progress-linear>
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
import ReceiptComponent from "@/components/finance/receipt_component.vue";
import TransactionTotalsCard from "@/components/finance/total-cards";
export default {
  layout: "finance",
  components: {
    "total-amount": TransactionTotalsCard,
    receipt: ReceiptComponent
  },

  data: () => ({
    title: "45% This week",
    dialog: false,
    search: null,
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
      { text: "Last modified Date", value: "lastUpdatedDate" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  methods: {
    viewconsultation: function(item) {
      this.$router.push("/finance/bills/" + item.id);
    },
    viewreceipt: function(cid) {
      this.dialog = true;
      console.log(cid);
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
