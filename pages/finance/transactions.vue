<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link to="/finance/transactions" class="active"
        >Transactions</router-link
      >
    </div>
    <v-card>
      <v-card-text>
        <h1>Transactions</h1>
        <v-progress-linear
          indeterminate
          v-if="transactions == null"
        ></v-progress-linear>
        <v-container fluid v-else class="ma-2">
          <v-data-table
            dense
            class="default"
            :headers="headers"
            :options="body.options"
            :items="transactions"
            disable-pagination
            hide-default-footer
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

      query: {
        page: null,
        size: null
      },
      headers: [
        { text: "ID", value: "id" },
        { text: "Service/Medicine", value: "service", sortable: true },
        { text: "Department", value: "departmentName" },
        { text: "Amount", value: "amount", sortable: false },
        { text: "Currency", value: "currencyCode" },
        { text: "Reversed", value: "isReversed", sortable: true },
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
