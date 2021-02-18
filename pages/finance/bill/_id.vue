<template>
  <v-container fluid>
    <v-card class=" pa-1">
      <v-progress-linear indeterminate v-if="bill == null"></v-progress-linear>
      <div v-else></div>
      {{ id }}

      <charges :transaction="transaction"></charges>
    </v-card>
  </v-container>
</template>
<script>
import Charges from "@/components/profile/tabs/charges"
export default {
  components:{
    'charges':Charges,
  },
  data() {
    return {
      bill: null,
      transactions: null,
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
    async get_bill() {
      return await this.$api
        .$get(`bills/${this.$route.params.id}/`)
        .then(response => {
          this.bill = response;
          this.transaction = response.transactionResponse;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_bill();
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
