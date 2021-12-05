<template>
  <v-container fluid>
    <v-row no-gutters wrap>
      <v-col
        v-for="(bill, index) in bills"
        :key="index"
        class="ma-0 pa-0 pr-2 pb-2"
        sm="12"
        md="2"
        lg="2"
        xl="2"
      >
        <statistical-card :item="bill"></statistical-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="5" sm="12">
        <v-card class="mr-1">
          <smooth-line-chart
            :data="transactiontrends"
            title="Number of transactions per day"
          ></smooth-line-chart>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="5"
        sm="12"
        v-if="billsperday != null"
        class="pa-0 ma-0"
      >
        <v-card class="ml-1">
          <smooth-line-chart
            :data="billtrends"
            title="Number of bills created per day"
          ></smooth-line-chart>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="12" class="ma-0 pa-0">
        <v-col
          v-for="(trx, index) in transactions"
          :key="index"
          class="ma-0 pa-0 pl-2 pb-2"
        >
          <transaction-card :item="trx"></transaction-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StatisticalCard from "~/components/finance/statistical-card.vue";
import TransactionCard from "~/components/finance/transactions_card";
import SmoothLineChart from "~/components/charts/SmoothLineChart";
import { mapGetters } from "vuex";
export default {
  components: {
    "statistical-card": StatisticalCard,
    "transaction-card": TransactionCard,
    "smooth-line-chart": SmoothLineChart,
  },

  data: function () {
    return {};
  },
  created() {
    this.$store.dispatch("get_bills_perday");
    this.$store.dispatch("get_bills_summation");
    this.$store.dispatch("get_transactions_perday");
    this.$store.dispatch("get_transactions_summations");
  },
  computed: {
    ...mapGetters({
      billsperday: "billsperday",
      billsummation: "billsummation",
      transactionsperday: "transactionsperday",
      transactionsummation: "transactionsummation",
    }),
    bills: {
      get() {
        return [
          {
            value: this.billsummation.totalNumberOfBillsToday,
            title: "No. bills today",
            subtitle: "Total number of bills today",
            icon: "mdi-currency-usd-circle",
            color: "black darken-2",
          },
          {
            value: this.billsummation.totalBillsAmountToday,
            title: "Amount of bills today",
            subtitle: "Total amount of bills today",
            icon: "mdi-layers-outline",
            color: "red darken-1",
          },
          {
            value: this.billsummation.totalBillsPaidAmountToday,
            title: "Amount paid today",
            subtitle: "Total amount of bills paid today",
            icon: "mdi-layers-outline",
            color: "red darken-1",
          },
          {
            value: this.billsummation.totalNumberOfBills,
            title: "No. of bills",
            subtitle: "Total number of bills",
            icon: "mdi-bitcoin",
            color: "blue",
          },

          {
            value: this.billsummation.totalBillsAmount,
            title: "Bills amount",
            subtitle: "Total of all bills amount",
            icon: "mdi-layers-outline",
            color: "red darken-1",
          },
          {
            value: this.billsummation.totalBillsPaidAmount,
            title: "Total paid bills",
            subtitle: "Amount paid from bills",
            icon: "mdi-barcode-scan",
            color: "blue darken-2",
          },
        ];
      },
    },
    transactions: {
      get() {
        return [
          {
            value: this.transactionsummation.totalNumberOfTransactionsToday,
            amount: this.transactionsummation.totalTransactionAmountToday,
            title: "Transactions today",
            subtitle1: "Transactions",
            subtitle2: "Total amount",
            icon: "mdi-currency-usd-circle",
            color: "black darken-2",
          },

          {
            value: this.transactionsummation.totalNumberOfTransactionsLast7Days,
            amount: this.transactionsummation.totalTransactionAmountLast7Days,
            title: "Transactions in last 7 days",
            subtitle1: "Number of Transactions",
            subtitle2: "Total amount",
            icon: "mdi-contactless-payment-circle",
            color: "primary darken-1",
          },

          {
            value:
              this.transactionsummation.totalNumberOfTransactionsLast30Days,
            amount: this.transactionsummation.totalTransactionAmountLast30Days,
            title: "Transactions in last 30 days",
            subtitle1: "No. of transactions in last 30 days",
            subtitle2: "Transactions amount in last 30 days",
            icon: "mdi-wallet",
            color: "red darken-1",
          },

          {
            value: this.transactionsummation.totalNumberOfTransactions,
            amount: this.transactionsummation.totalTransactionAmount,
            title: "All transactions",
            subtitle1: "Number of all transactions",
            subtitle2: "Total amounts",
            icon: "mdi-barcode",
            color: "blue darken-2",
          },
        ];
      },
    },
    transactiontrends: {
      get() {
        var item = this.transactionsperday;
        var datas = new Array();
        var categories = new Array();
        if (item !== undefined) {
          item.forEach((element) => {
            datas.push(element.numberOfTransactions);
            var val = element.transactionDate;
            categories.push(new Date(val).toISOString());
          });
        }
        var data = {
          series: [
            {
              name: "Number of Transactions per day",
              data: datas,
            },
          ],
          categories: categories,
        };
        return data;
      },
    },
    billtrends: {
      get() {
        var item = this.billsperday;
        var datas = new Array();
        var categories = new Array();
        if (item !== undefined) {
          item.forEach((element) => {
            datas.push(element.totalBills);
            var val = element.createdDate;
            categories.push(new Date(val).toISOString());
          });
        }
        var data = {
          series: [
            {
              name: "Number of bills per day",
              data: datas,
            },
          ],
          categories: categories,
        };
        return data;
      },
    },
  },
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
