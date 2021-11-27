<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/finance">{{
        $t("label.breadcrumb.dashboard")
      }}</router-link>
      <router-link to="/finance">{{
        $t("label.breadcrumb.finance")
      }}</router-link>
      <router-link to="/finance/transactions" class="active">{{
        $t("label.breadcrumb.transactions")
      }}</router-link>
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
      positionx: 2,
      search: null,
      dialog: false,

      query: {
        page: null,
        size: null,
      },
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Service/Medicine", value: "service", class: "primary" },
        { text: "Department", value: "departmentName", class: "primary" },
        { text: "Amount", value: "amount", class: "primary" },
        { text: "Currency", value: "currencyCode", class: "primary" },
        { text: "Reversed", value: "isReversed", class: "primary" },
        {
          text: "Transaction Date",
          value: "transactionDate",
          class: "primary",
        },
        {
          text: "Actions",
          value: "actions",
          class: "primary",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    get_next() {
      this.get_bill(this.query.page - 1, this.body.options.itemsPerPage);
    },

    async get_bill(p, s) {
      return await this.$api
        .$get(`transactions/all/?page=${p}&size=${s}`)
        .then((response) => {
          this.transactions = response.data;
          this.query.size = response.totalPages;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    undo: function (it) {
      this.$store.dispatch("revert_transaction", it.id);
      setTimeout(
        () => this.get_bill(0, this.body.options.itemsPerPage),
        this.delay_seconds
      );
    },
  },
  created() {
    this.get_bill(0, this.body.options.itemsPerPage);
  },
};
</script>
