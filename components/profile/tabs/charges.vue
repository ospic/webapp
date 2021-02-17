<template>
  <v-progress-linear
    indeterminate
    v-if="transaction == null"
  ></v-progress-linear>
  <v-container fluid v-else class="ma-2">
    <v-row justify="end" class="mb-2" no-gutters>
      <v-spacer></v-spacer>
      <v-col style="background-color: green" md="4">
        <v-card class="pa-2" elevation="1" outlined tile>
          <h3>Total amount: {{ transaction.totalAmount }}</h3>
        </v-card>
      </v-col>
    </v-row>
    <v-data-table
      dense
      class="default"
      :headers="headers"
      :options="body.options"
      :items="transaction.transactions"
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
</template>
<script>
export default {
  props: {
    transaction: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Service/Medicine", value: "service", sortable: true },
      { text: "Department", value: "departmentName" },
      { text: "Amount", value: "amount", sortable: false },
      { text: "Currency", value: "currencyCode" },
      { text: "Reversed", value: "isReversed", sortable: true },
      { text: "Transaction Date", value: "transactionDate" }
    ]
  })
};
</script>
