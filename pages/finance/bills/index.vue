<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/finance">{{
        $t("label.breadcrumb.finance")
      }}</router-link>
      <router-link to="/finance/bills" class="active">{{
        $t("label.breadcrumb.bills")
      }}</router-link>
    </div>
    <v-card>
      <v-card-title class="ma-0 pa-0">
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Bills</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Enter search text ..."
              rounded
              dense
              outlined
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-toolbar>
        <v-dialog
          v-model="dialog"
          max-width="600px"
          class="ma-0 pa-0"
          hide-overlay
          open-delay="12"
        >
          <v-progress-linear
            background-color="white"
            indeterminate
            color="cyan"
            v-if="bill == null"
          ></v-progress-linear>
          <receipt v-else :bill="bill"></receipt>
        </v-dialog>
      </v-card-title>

      <v-card-text class="ma-0 pa-0">
        <v-progress-linear
          indeterminate
          v-if="bills == null"
        ></v-progress-linear>
        <v-container fluid class="ma-0 pa-0" v-else>
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
                <v-tooltip bottom color="primary lighten-1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      small
                      v-bind="attrs"
                      v-on="on"
                      class="blue--text"
                      @click="viewreceipt(item.id)"
                    >
                      mdi-receipt
                    </v-icon>
                  </template>
                  <span>{{ $t("label.tooltip.viewreceipt") }}</span>
                </v-tooltip>
              </td>
            </template>

            <template v-slot:no-data>
              <p class="mt-2">No Data available for {{ routename }}</p>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ReceiptComponent from "@/components/finance/receipt_component.vue";
import TransactionTotalsCard from "@/components/finance/total-cards";
export default {
  components: {
    "total-amount": TransactionTotalsCard,
    receipt: ReceiptComponent,
  },

  data: () => ({
    title: "45% This week",
    dialog: false,
    search: null,
    service_transactions: null,
    type: "service",
    amount: 0.0,
    bill: null,

    headers: [
      { text: "NID", value: "id", class: "primary" },
      { text: "Patient", value: "patientName", class: "primary" },
      {
        text: "Amount",
        value: "totalAmount",
        class: "primary",
        sortable: false,
      },
      { text: "Paid Amount", value: "paidAmount", class: "primary" },
      { text: "Paid ?", value: "isPaid", class: "primary" },
      { text: "No.", value: "extraId", class: "primary", sortable: true },
      { text: "CI", value: "consultationId", class: "primary" },
      { text: "Active", value: "isActive", class: "primary", sortable: true },
      { text: "Created Date", value: "createdDate", class: "primary" },
      {
        text: "Last modified Date",
        value: "lastUpdatedDate",
        class: "primary",
      },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
  }),
  methods: {
    viewconsultation: function (item) {
      this.$router.push("/finance/bills/" + item.id);
    },
    async viewreceipt(cid) {
      this.dialog = true;
      this.bill = null;
      return await this.$api
        .$get(`bills/${cid}`)
        .then((response) => {
          this.bill = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.$store.dispatch("get_bills");
  },
  computed: {
    ...mapGetters({
      bills: "bills",
    }),
  },
};
</script>
