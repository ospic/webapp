<template>
  <v-progress-linear
    indeterminate
    v-if="transaction == null"
  ></v-progress-linear>
  <v-container fluid v-else class="ma-2">
    <v-row justify="end" class="mb-2" no-gutters>
      <v-spacer></v-spacer>
      <v-col style="background-color: green" md="4">
        <v-card class="pa-2 primary" dark elevation="1" outlined tile>
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
      :item-class="row_classes"
      mobile-breakpoint="100"
    >
      <template v-slot:[`item.service`]="{ item }">
        <a v-if="item.medicalServiceName != null">
          {{ item.medicalServiceName }}
        </a>
        <a v-else>{{ item.medicineName }}</a>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip v-if="item.isReversed" color="primary" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              prepend-icon="mdi-undo"
              outlined
              color="button"
              v-bind="attrs"
              v-on="on"
              @click="undo(item)"
              ><v-icon small>mdi-undo-variant</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("label.tooltip.reopentransaction") }}</span>
        </v-tooltip>
        <v-tooltip v-else color="primary" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              outlined
              v-bind="attrs"
              v-on="on"
              class="primary"
              dark
              @click="undo(item)"
              ><v-icon small> mdi-undo</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("label.tooltip.reversetransaction") }}</span>
        </v-tooltip>
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
      { text: "Transaction Date", value: "transactionDate" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  methods: {
    undo: function(it) {
      this.$store.dispatch("revert_transaction", it.id).then(response => {
        setTimeout(() => this.$emit("undo"), this.delay_seconds);
      });
    }
  }
};
</script>
