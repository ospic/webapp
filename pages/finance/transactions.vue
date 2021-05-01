<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/finance">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link to="/finance/transactions" class="active"
        >Transactions</router-link
      >
    </div>
    <v-card>
      <v-card-title class="ma-0 pa-0">
        <v-toolbar flat dark color="primary">
          <v-toolbar-title>Transactions</v-toolbar-title>
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
        </v-toolbar>
      </v-card-title>
      <v-card-text class="ma-0 pa-0">
        <v-progress-linear
          indeterminate
          v-if="transactions == null"
        ></v-progress-linear>

        <v-data-table
          dense
          v-else
          class="default"
          :headers="headers"
          :options="body.options"
          :items="transactions"
          :search="search"
          :item-class="row_classes"
          disable-pagination
          hide-default-footer
          mobile-breakpoint="100"
        >
          <template v-slot:[`item.service`]="{ item }">
            <a v-if="item.medicalServiceName != null">
              {{ item.medicalServiceName }}
            </a>
            <a v-else>{{ item.medicineName }}</a>
          </template>
        </v-data-table>

        <div class="text-center">
          <v-pagination
            v-model="query.page"
            :length="query.size"
            @input="get_next"
            :total-visible="totalvisible"
            circle
          ></v-pagination>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bill: null,
      transactions: null,
      search: null,

      query: {
        page: null,
        size: null
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Service/Medicine", value: "service" },
        { text: "Department", value: "departmentName" },
        { text: "Amount", value: "amount" },
        { text: "Currency", value: "currencyCode" },
        { text: "Reversed", value: "isReversed" },
        { text: "Transaction Date", value: "transactionDate" }
      ]
    };
  },
  methods: {
    get_next() {
      this.get_bill(this.query.page - 1, this.body.options.itemsPerPage);
    },

    async get_bill(p, s) {
      return await this.$api
        .$get(`transactions/all/?page=${p}&size=${s}`)
        .then(response => {
          this.transactions = response.data;
          this.query.size = response.totalPages;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_bill(0, this.body.options.itemsPerPage);
  }
};
</script>
