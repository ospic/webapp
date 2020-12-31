<template>
  <v-container class="ma-2 pa-0 px-2" fluid>
    <div v-if="statistics">
      <v-row justify="start" align="start" class="mt-2">
        <template v-for="(item, i) in summary_items">
          <summarycard
            :key="i"
            :item="item"
            v-if="item.value !== 0"
          ></summarycard>
        </template>
      </v-row>
      <v-row justify="start" align="start" class="mt-3">
        <v-col
          v-for="(item, i) in trend_items"
          :key="i"
          cols="12"
          sm="6"
          md="2"
          class="ma-0 pa-0 mt-1"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="mr-1 ml-1 mx-auto "
                :elevation="hover ? 3 : 1"
                dense
              >
                <v-card-text v-if="i % 2 === 0" class="ma-0 ">
                  <pie-chart :data="item" :height="200"></pie-chart>
                </v-card-text>
                <v-card-text v-else class="ma-0 ">
                  <donutchart :data="item" :height="200"></donutchart>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-row justify="start" align="start" class="mt-3">
        <v-col cols="12" sm="12" v-if="bsc_size > 0" class="ma-0 pa-0 mt-3">
          <v-card class="mr-1 ml-1 " dense>
            <area-chart-spline
              :data="bsc_chart"
              class="ma-0 "
            ></area-chart-spline>
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
    </div>
    <div v-else>
      <v-progress-circular
        indeterminate
        color="grey lighten-5"
        size="16"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import PieChartComponent from "@/components/charts/PieChartComponent";
import BarChartComponent from "@/components/charts/ApexLineChart";
import SummaryCardComponent from "@/components/statistics/dashboard_card";
import DonutChartCompoent from "@/components/charts/DonutChartComponent";
import AreaChartSpline from "@/components/charts/area_chart_spline";
export default {
  components: {
    "pie-chart": PieChartComponent,
    "bar-chart": BarChartComponent,
    summarycard: SummaryCardComponent,
    donutchart: DonutChartCompoent,
    "area-chart-spline": AreaChartSpline
  },
  data: () => ({
    apexdata: {
      series: [
        {
          name: "Trends",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ]
    },
    pie_options: {
      series: [44, 55, 13, 33],
      chartOptions: {
        labels: ["Apple", "Mango", "Orange", "Watermelon"]
      }
    }
  }),
  methods: {
    percentCalculation: function(percent, total) {
      var number = (percent / total) * 100;

      return +number.toFixed(2);
    },
    syncro: async function() {
      const vm = this;
      vm.sync = !vm.sync;
      await Promise.all([
        vm.$store.dispatch("retrievephysicians"),
        vm.$store.dispatch("get_patient_trends"),
        vm.$store.dispatch("get_patient_statistics")
      ]).then(function() {
        console.log("Loading complete...");
      });
      setTimeout(() => {
        vm.sync = !vm.sync;
      }, 2000);
    }
  },
  mounted: function() {
    this.syncro();
  },

  computed: {
    statistics() {
      return this.$store.getters.statistic;
    },
    trend_items: {
      get() {
        return [
          {
            series: [
              this.statistics.totalMale,
              this.statistics.totalFemale,
              this.statistics.totalUnspecified
            ],
            chartOptions: {
              labels: [
                "Male Composition",
                "Female Composition",
                "Others Composition"
              ]
            },
            title: "Gender Composition"
          },
          {
            series: [this.statistics.totalOpd, this.statistics.totalIpd],
            chartOptions: {
              labels: [
                "Out Patient Department(OPD)",
                "In Patient Department (IPD) "
              ]
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
            series: [12, 20, 37],
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
            value: this.statistics.total,
            icon: "mdi-account-group-outline",
            color: "blue"
          },
          {
            title: "Assigned Patients",
            subtitle: "Assigned patients",
            measure: "p/d",
            value: this.statistics.totalAssigned,
            icon: "mdi-account-group-outline",
            color: "red"
          },
          {
            title: "Unassigned Patients",
            subtitle: "Unassigned Patients",
            value: this.statistics.totalUnassigned,
            icon: "mdi-account-group-outline",
            color: "teal"
          },
          {
            title: " OPD",
            subtitle: "OPD  Patients",
            value: this.statistics.totalOpd,
            measure: "p/d",
            icon: "mdi-account-group-outline",
            color: "lime"
          },
          {
            title: "IPD ",
            subtitle: "IPD  Patients",
            measure: "p/d",
            value: this.statistics.totalIpd,
            icon: "mdi-account-group-outline",
            color: "green"
          },
          {
            title: "Physicians",
            subtitle: "No. of Physicians",
            value: this.$store.getters.physicians.length,
            icon: "mdi-account-multiple",
            color: "light-blue"
          },
          {
            title: "Males",
            subtitle: "Male Patients",
            value: this.statistics.totalMale,
            icon: "mdi-gender-male",
            color: "indigo"
          },
          {
            title: "Females",
            subtitle: "Female patients",
            value: this.statistics.totalFemale,
            icon: "mdi-gender-female",
            color: "deep-orange"
          },
          {
            title: "Others",
            subtitle: "Special Gender",
            value: this.statistics.totalUnspecified,
            icon: "mdi-gender-male-female",
            color: "orange"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group",
            color: "brown"
          },
          {
            title: "Success",
            subtitle: "Success Responses",
            value: "4245",
            icon: "mdi-select-group",
            color: "grey"
          },
          {
            title: "Average HT",
            subtitle: "Average Handle Time",
            value: "30 MIN",
            measure: "pt/min",
            icon: "mdi-select-group",
            color: "cyan"
          }
        ];
      }
    },
    bsc_size: {
      get() {
        return this.$store.getters.trends.length;
      }
    },
    bsc_chart: {
      get() {
        var item = this.$store.getters.trends;
        var datatotal = new Array();
        var datamale = new Array();
        var datafemale = new Array();
        var dataother = new Array();
        var categories = new Array();

        item.forEach(element => {
          datatotal.push(element.total);
          datamale.push(element.male);
          datafemale.push(element.female);
          dataother.push(element.other);
          categories.push(element.date);
        });
        categories.push(0);
        var data = {
          series: [
            {
              name: "Total",
              data: datatotal
            },
            {
              name: "Male",
              data: datamale
            },
            {
              name: "Female",
              data: datafemale
            },
            {
              name: "Other",
              data: dataother
            }
          ],
          categories: categories
        };

        return data;
      }
    }
  },
  created() {}
};
</script>
