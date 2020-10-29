<template>
  <v-container class="ma-0 pa-0 px-2" fluid>
    <v-row justify="start" align="start">
      <summarycard
        v-for="(item, i) in summary_items"
        :key="i"
        :data="item"
      ></summarycard>
    </v-row>
    <v-row justify="start" align="start">
      <v-col
        v-for="(item, i) in trend_items"
        :key="i"
        cols="12"
        sm="6"
        md="2"
        class="ma-0 pa-0 mt-1"
      >
        <v-card class="mr-1 ml-1" dense color="#FFFFFF">
          <v-card-text v-if="i % 2 === 0">
            <pie-chart :data="item" :height="265"></pie-chart>
          </v-card-text>
          <v-card-text v-if="i % 2 !== 0">
            <donutchart :data="item" :height="260"></donutchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12">
        <v-card>
          <basic-chart-column :data="basic_chart"></basic-chart-column>
        </v-card>
      </v-col>
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
import BasicChartColumn from "@/components/charts/BasicColumnBarChart";
export default {
  components: {
    "pie-chart": PieChartComponent,
    "bar-chart": BarChartComponent,
    summarycard: SummaryCardComponent,
    donutchart: DonutChartCompoent,
    "basic-chart-column": BasicChartColumn
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
    basic_chart: {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 71, 58, 54, 51]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 100, 89, 93, 92]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 34, 51, 47, 74]
        },
        {
          name: "Free Cash In",
          data: [52, 53, 41, 34, 51, 47, 35, 41, 36, 26, 45, 48, 84]
        }
      ]
    }
  }),
  methods: {
    percentCalculation: function(percent, total) {
      var number = (percent / total) * 100;

      return +number.toFixed(2);
    }
  },

  computed: {
    trend_items: {
      get() {
        return [
          {
            series: [44, 13],
            chartOptions: {
              labels: ["Male", "Female"]
            },
            title: "Male Vs Female"
          },
          {
            series: [
              this.percentCalculation(
                this.$store.getters.ipdpatients.length,
                this.$store.getters.patients.length
              ),
              this.percentCalculation(
                this.$store.getters.opdpatients.length,
                this.$store.getters.patients.length
              )
            ],
            chartOptions: {
              labels: ["IPD", "OPD"]
            },
            title: "OPD Vs IPD in (%)"
          },
          {
            series: [45, 62],
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
          },
          {
            series: [44, 55, 27],
            chartOptions: {
              labels: ["Male", "Female"]
            },
            title: "Patient Trends By"
          },
          {
            series: [44, 55, 27, 45],
            chartOptions: {
              labels: ["Male", "Female"]
            },
            title: "Patient Trends By"
          }
        ];
      }
    },
    summary_items: {
      get() {
        return [
          {
            title: "Overall Total Patients",
            subtitle: "Overall Total Patients",
            value: this.$store.getters.patients.length,
            icon: "mdi-account-group-outline"
          },
          {
            title: "Assigned Patients",
            subtitle: "Assigned patients",
            measure: "p/d",
            value: this.$store.getters.assigned.length,
            icon: "mdi-account-group-outline"
          },
          {
            title: "Unassigned Patients",
            subtitle: "Unassigned Patients",
            value: this.$store.getters.unassigned.length,
            icon: "mdi-account-group-outline"
          },
          {
            title: " OPD",
            subtitle: "OPD  Patients",
            value: this.$store.getters.opdpatients.length,
            measure: "p/d",
            icon: "mdi-account-group-outline"
          },
          {
            title: "IPD ",
            subtitle: "IPD  Patients",
            measure: "p/d",
            value: this.$store.getters.ipdpatients.length,
            icon: "mdi-account-group-outline"
          },
          {
            title: "Physicians",
            subtitle: "No. of Physicians",
            value: this.$store.getters.physicians.length,
            icon: "mdi-account-multiple"
          },
          {
            title: "Errors",
            subtitle: "Total Error Responses",
            value: "13",
            icon: "mdi-select-group"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group"
          },
          {
            title: "Average HT",
            subtitle: "Average Handle Time",
            value: "30 MIN",
            measure: "pt/min",
            icon: "mdi-select-group"
          }
        ];
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
