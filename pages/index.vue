<template>
  <v-container class="ma-0 pa-0" fluid app>
    <v-row justify="start" align="start">
      <summarycard
        v-for="(item, i) in summary_items"
        :key="i"
        :data="item"
      ></summarycard>
    </v-row>
    <v-row justify="start" align="start">
      <v-col v-for="(item, i) in trend_items" :key="i" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text v-if="i % 2 === 0">
            <pie-chart :data="item" :height="255"></pie-chart>
          </v-card-text>
          <v-card-text v-if="i % 2 !== 0">
            <donutchart :data="item" :height="250"></donutchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="3">
        <v-card class="mx-auto">
          <bar-chart :data="apexdata"></bar-chart>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-card class="mx-auto">
          <bar-chart :data="apexdata"></bar-chart>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <v-card class="mx-auto" min-height="365">
          <pie-chart :data="pie_options" :height="300"></pie-chart>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-card class="mx-auto">
          <v-card-text>
            <pie-chart :data="pie_options" style="height: 200px"></pie-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PieChartComponent from "@/components/charts/PieChartComponent";
import BarChartComponent from "@/components/charts/ApexLineChart";
import SummaryCardComponent from "@/components/charts/summary-card";
import DonutChartCompoent from "@/components/charts/DonutChartComponent";
export default {
  components: {
    "pie-chart": PieChartComponent,
    "bar-chart": BarChartComponent,
    summarycard: SummaryCardComponent,
    donutchart: DonutChartCompoent
  },
  data: () => ({
    apexdata: {
      series: [
        {
          name: "Trends",
          data: [28, 29, 33, 36, 32, 32, 33]
        }
        /*{
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13],
        },
        */
      ]
    },
    pie_options: {
      series: [44, 55, 13, 33],
      chartOptions: {
        labels: ["Apple", "Mango", "Orange", "Watermelon"]
      }
    },
    trend_items: [
      {
        series: [44, 13],
        chartOptions: {
          labels: ["Male", "Female"]
        },
        title: "Male Vs Female"
      },
      {
        series: [44, 33],
        chartOptions: {
          labels: ["Allowed", "Admitted"]
        },
        title: "Allowed Vs Admitted"
      },
      {
        series: [13, 33],
        chartOptions: {
          labels: ["Male", "Female"]
        },
        title: "Overall Sex Trends"
      },
      {
        series: [44, 55],
        chartOptions: {
          labels: ["Male", "Female"]
        },
        title: "Patient Trends By"
      }
    ],
    summary_items: [
      {
        title: "Requests Rate",
        subtitle: "Req rate on last time interval",
        value: 0.0,
        measure: "req/sec"
      },
      {
        title: "Requests",
        subtitle: "Total Request Received",
        value: 89666
      },
      {
        title: "Apex Score",
        subtitle: "Overall Apex Score",
        value: 0.48
      },
      {
        title: " Error Rate",
        subtitle: "Err rate on last time interval",
        value: 0.0,
        measure: "err/sec"
      },
      {
        title: "CPU Usage",
        subtitle: "Process CPU Usage %",
        value: "0.59%"
      },
      {
        title: "Memmory Usage",
        subtitle: "Req rate on last time interval",
        value: "38.48 MB"
      },
      {
        title: "Errors",
        subtitle: "Total Error Responses",
        value: "13"
      },
      {
        title: "Success",
        subtitle: "Success Responses",
        value: "4245"
      },
      {
        title: "Success",
        subtitle: "Success Responses",
        value: "4245"
      },
      {
        title: "Success",
        subtitle: "Success Responses",
        value: "4245"
      },
      {
        title: "Success",
        subtitle: "Success Responses",
        value: "4245"
      },
      {
        title: "Average HT",
        subtitle: "Average Handle Time",
        value: "30 MIN",
        measure: "pt/min"
      }
    ]
  }),
  methods: {},
  computed: {},
  created() {},
  mounted() {}
};
</script>
