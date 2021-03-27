<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        v-for="(bill, index) in bills"
        :key="index"
        class="ma-0 pa-0 pr-2 pb-2"
      >
        <statistical-card :item="bill"></statistical-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="5" sm="12">
        <v-card class="mr-1">
          <apexchart
            width="98%"
            type="line"
            :options="billtrends"
            :series="billtrends.series"
          ></apexchart>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" sm="12">
        <v-card class="ml-1">
          <smooth-line-chart></smooth-line-chart>
        </v-card>
      </v-col>
      <v-col cols="12" md="2" sm="12">
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
    "smooth-line-chart": SmoothLineChart
  },

  data: function() {
    return {
      options: {
        series: [
          {
            name: "Likes",
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
          }
        ],
        chart: {
          height: 350,
          type: "line"
        },
        theme: {
          mode: "light",
          palette: "palette1",
          monochrome: {
            enabled: true,
            color: "#2E294E",
            shadeTo: "dark",
            shadeIntensity: 1
          }
        },
        stroke: {
          width: 4,
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: [
            "1/11/2000",
            "2/11/2000",
            "3/11/2000",
            "4/11/2000",
            "5/11/2000",
            "6/11/2000",
            "7/11/2000",
            "8/11/2000",
            "9/11/2000",
            "10/11/2000",
            "11/11/2000",
            "12/11/2000",
            "1/11/2001",
            "2/11/2001",
            "3/11/2001",
            "4/11/2001",
            "5/11/2001",
            "6/11/2001"
          ],
          tickAmount: 10,
          labels: {
            formatter: function(value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "dd MMM");
            }
          }
        },
        title: {
          text: "Bill collections",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7
          }
        },
        yaxis: {
          min: -10,
          max: 40,
          title: {
            text: "Engagement"
          }
        }
      }
    };
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
      transactionsummation: "transactionsummation"
    }),
    bills: {
      get() {
        return [
          {
            value: this.billsummation.totalNumberOfBillsToday,
            title: "No. bills today",
            subtitle: "Total number of bills today",
            icon: "mdi-currency-usd-circle",
            color: "black darken-2"
          },
          {
            value: this.billsummation.totalBillsAmountToday,
            title: "Amount of bills today",
            subtitle: "Total amount of bills today",
            icon: "mdi-layers-outline",
            color: "red darken-1"
          },
          {
            value: this.billsummation.totalBillsPaidAmountToday,
            title: "Amount paid today",
            subtitle: "Total amount of bills paid today",
            icon: "mdi-layers-outline",
            color: "red darken-1"
          },
          {
            value: this.billsummation.totalNumberOfBills,
            title: "No. of bills",
            subtitle: "Total number of bills",
            icon: "mdi-bitcoin",
            color: "blue"
          },

          {
            value: this.billsummation.totalBillsAmount,
            title: "Bills amount",
            subtitle: "Total of all bills amount",
            icon: "mdi-layers-outline",
            color: "red darken-1"
          },
          {
            value: this.billsummation.totalBillsPaidAmount,
            title: "Total paid bills",
            subtitle: "Amount paid from bills",
            icon: "mdi-barcode-scan",
            color: "blue darken-2"
          }
        ];
      }
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
            color: "black darken-2"
          },

          {
            value: this.transactionsummation.totalNumberOfTransactionsLast7Days,
            amount: this.transactionsummation.totalTransactionAmountLast7Days,
            title: "Transactions in last 7 days",
            subtitle1: "Number of Transactions",
            subtitle2: "Total amount",
            icon: "mdi-contactless-payment-circle",
            color: "primary darken-1"
          },

          {
            value: this.transactionsummation
              .totalNumberOfTransactionsLast30Days,
            amount: this.transactionsummation.totalTransactionAmountLast30Days,
            title: "Transactions in last 30 days",
            subtitle1: "No. of transactions in last 30 days",
            subtitle2: "Transactions amount in last 30 days",
            icon: "mdi-wallet",
            color: "red darken-1"
          },

          {
            value: this.transactionsummation.totalNumberOfTransactions,
            amount: this.transactionsummation.totalTransactionAmount,
            title: "All transactions",
            subtitle1: "Number of all transactions",
            subtitle2: "Total amounts",
            icon: "mdi-barcode",
            color: "blue darken-2"
          }
        ];
      }
    },
    billtrends: {
      get() {
        var item = this.transactionsperday;
        var datas = new Array();
        var categories = new Array();
        if (item !== undefined) {
          item.forEach(element => {
            datas.push(element.numberOfTransactions);
            var val = element.transactionDate;
            console.log(new Date(val).toISOString());
            categories.push(new Date(val).toISOString());
          });
        }
        var data = {
          series: [
            {
              name: "Service  issued",
              data: datas
            }
          ],
          categories: categories
        };
        return data;
      }
    }
  }
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
