<template>
  <v-container fluid app>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-1" style="position: relative">
          <canvas id="line-chart" width="100%" height="100%">
            <p>Hello Fallback World</p>
          </canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card
          class="pa-1"
          height="400px"
          style="position: relative; height: 310px"
        >
          <line-chart style="position: relative; height: 300px"></line-chart>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-1" height="400px" style="position: relative">
          <dough-nut :width="300" :height="300"></dough-nut>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Chart } from "chart.js";
import LineChartComponent from "@/components/charts/LineChartComponent";
import DoughnutComponent from "@/components/charts/DoughnutChartComponent";
export default {
  components: {
    "line-chart": LineChartComponent,
    "dough-nut": DoughnutComponent,
  },
  data: () => ({
    chartdata: {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 4, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId).getContext("2d");
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
  mounted() {
    this.createChart("line-chart", this.chartdata);
  },
};
</script>
