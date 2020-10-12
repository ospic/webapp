<template>
  <v-container fluid app>
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
          <pie-chart :data="pie_options"></pie-chart>
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
export default {
  components: {
    "pie-chart": PieChartComponent,
    "bar-chart": BarChartComponent,
  },
  data: () => ({
    apexdata: {
      series: [
        {
          name: "Trends",
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        /*{
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13],
        },
        */
      ],
    },
    pie_options: {
      series: [44, 55, 13, 33],
      chartOptions: {
        labels: ["Apple", "Mango", "Orange", "Watermelon"],
      },
    },
  }),
  methods: {},
  computed: {},
  created() {},
  mounted() {},
};
</script>
