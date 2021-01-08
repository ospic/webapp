<template>
  <v-container class="ma-2 pa-0 px-2" fluid>
    <div v-if="statistics">
      <v-row justify="start" align="start" class="mt-2">
        <template>
          <v-progress-circular
            v-if="patient == undefined"
          ></v-progress-circular>
          <summarycard
            v-else
            v-for="(item, i) in patient_items"
            :key="i"
            :item="item"
          ></summarycard>
          <v-progress-circular
            v-if="services == undefined"
          ></v-progress-circular>
          <summarycard
            v-else
            v-for="(item, i) in service_items"
            :key="item.title"
            :item="item"
          ></summarycard>

          <v-progress-circular v-if="users == undefined"></v-progress-circular>

          <summarycard
            v-else
            v-for="(item, i) in user_items"
            :key="item.title"
            :item="item"
          ></summarycard>

          <v-progress-circular
            v-if="ward == null || ward == undefined"
          ></v-progress-circular>

          <summarycard
            v-else
            v-for="(item, i) in ward_bed"
            :key="item.title"
            :item="item"
          ></summarycard>
        </template>
      </v-row>
      <v-row justify="start" align="start" class="mt-3" v-if="patienttrends">
        <v-col
          v-for="(item, i) in patient_trends"
          :key="i"
          cols="12"
          sm="6"
          md="2"
          class="ma-0 pa-0 mt-1"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                class="mr-1 ml-1 mx-auto default"
                :elevation="hover ? 3 : 1"
                dense
              >
                <v-card-text class="ma-0 ">
                  <pie-chart :data="item" :height="200"></pie-chart>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <v-row justify="start" align="start" class="mt-3">
        <v-col cols="12" sm="12" v-if="bsc_size > 0" class="ma-0 pa-0 mt-3">
          <v-card class="mr-1 ml-1 mx-auto default " dense>
            <area-chart-spline
              :data="bsc_chart"
              class="ma-0 "
            ></area-chart-spline>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-card class=" mx-auto default">
            <bar-chart :data="apexdata"></bar-chart>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-card class="mx-auto default">
            <bar-chart :data="apexdata"></bar-chart>
          </v-card>
        </v-col>

        <v-col cols="12" sm="12" md="3">
          <v-card class="mx-auto default" min-height="365">
            <pie-chart :data="pie_options" :height="300"></pie-chart>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-card class="mx-auto default">
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
import { mapGetters } from "vuex";
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
        vm.$store.dispatch("retrieve_statistics")
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
    ...mapGetters({
      staffs: "staffStatistics",
      servicetrends: "serviceTrends",
      users: "userStatistics",
      patient: "patientStatistics",
      ward: "wardstatistics",
      services: "servicestatistics",
      patienttrends: "patienttrends"
    }),
    statistics() {
      return this.$store.getters.statistics;
    },
    patient_trends: {
      get() {
        return [
          {
            series: [this.patient.totalMale, this.patient.totalFemale],
            chartOptions: {
              labels: ["Male ", "Female"]
            },
            title: "Gender Composition"
          },
          {
            series: [this.services.totalOpd, this.services.totalIpd],
            chartOptions: {
              labels: [
                "Out Patient Department(OPD)",
                "In Patient Department (IPD) "
              ]
            },
            title: "OPD Vs IPD in (%)"
          },
          {
            series: [this.services.totalActive, this.services.totalInActive],
            chartOptions: {
              labels: ["Active", "Inactive"]
            },
            title: "Service distributions"
          },
          {
            series: [
              this.services.totalAssigned,
              this.services.totalUnAssigned
            ],
            chartOptions: {
              labels: ["Assigned", "Un-Assigned"]
            },
            title: "Service assignment"
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
    patient_items: {
      get() {
        return [
          {
            title: "Overall Total Patients",
            subtitle: "Overall Total Patients",
            value: this.patient.total,
            icon: "mdi-account-group-outline",
            color: "blue"
          },
          {
            title: "Males",
            subtitle: "Male Patients",
            value: this.patient.totalMale,
            icon: "mdi-gender-male",
            color: "indigo"
          },
          {
            title: "Females",
            subtitle: "Female patients",
            value: this.patient.totalFemale,
            icon: "mdi-gender-female",
            color: "deep-orange"
          },
          {
            title: "Others",
            subtitle: "Special Gender",
            value: this.patient.totalUnspecified,
            icon: "mdi-gender-male-female",
            color: "orange"
          }
        ];
      }
    },
    user_items: {
      get() {
        return [
          {
            title: "Users",
            subtitle: "Users",
            value: this.users.totalUsers,
            icon: "mdi-gender-male-female",
            color: "orange"
          },
          {
            title: "Staff's",
            subtitle: "Staff's",
            value: this.users.totalStaffs,
            icon: "mdi-gender-male-female",
            color: "orange"
          }
        ];
      }
    },
    service_items: {
      get() {
        return [
          /**Servrices */
          {
            title: "Total services",
            subtitle: "Total services",
            measure: "p/d",
            value: this.services.total,
            icon: "mdi-account-group-outline",
            color: "red"
          },
          {
            title: "Active services",
            subtitle: "Active services",
            measure: "p/d",
            value: this.services.totalActive,
            icon: "mdi-account-group-outline",
            color: "red"
          },
          {
            title: "Inactive services",
            subtitle: "Inactive services",
            measure: "p/d",
            value: this.services.totalInActive,
            icon: "mdi-account-group-outline",
            color: "red"
          },
          {
            title: "Assigned services",
            subtitle: "Assigned services",
            measure: "p/d",
            value: this.services.totalAssigned,
            icon: "mdi-account-group-outline",
            color: "red"
          },
          {
            title: "Unassigned services",
            subtitle: "Unassigned services",
            value: this.services.totalUnAssigned,
            icon: "mdi-account-group-outline",
            color: "teal"
          },
          {
            title: " OPD",
            subtitle: "OPD  services",
            value: this.services.totalOpd,
            measure: "p/d",
            icon: "mdi-account-group-outline",
            color: "lime"
          },
          {
            title: "IPD ",
            subtitle: "IPD  services",
            measure: "p/d",
            value: this.services.totalIpd,
            icon: "mdi-account-group-outline",
            color: "green"
          },
          {
            title: "Physicians",
            subtitle: "No. of Physicians",
            value: this.$store.getters.physicians.length,
            icon: "mdi-account-multiple",
            color: "light-blue"
          }
          /**Ward bed */
        ];
      }
    },
    ward_bed: {
      get() {
        return [
          {
            title: "Total beds",
            subtitle: "Total beds",
            value: this.ward.totalCount,
            icon: "mdi-select-group",
            color: "brown"
          },
          {
            title: "Occupied beds",
            subtitle: "Occupied beds",
            value: this.ward.totalOccupied,
            icon: "mdi-select-group",
            color: "grey"
          },
          {
            title: "Un-Occupied beds",
            subtitle: "Un-Occupied beds",
            value: this.ward.totalUnOccupied,
            measure: "pt/min",
            icon: "mdi-select-group",
            color: "cyan"
          }
        ];
      }
    },

    bsc_size: {
      get() {
        return this.patienttrends == undefined ? 0 : this.patienttrends.length;
      }
    },
    bsc_chart: {
      get() {
        var item = this.patienttrends;
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
