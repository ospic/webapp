<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="3" sm="12">
        <v-col
          v-for="(item, index) in items"
          :key="index"
          class="ma-0 pa-0 pr-2 pb-2"
        >
          <statistical-card :item="item"></statistical-card>
        </v-col>
      </v-col>
      <v-col cols="12" md="9" sm="12" style="background-color: white">
        <apexchart
          width="98%"
          type="line"
          :options="options"
          :series="options.series"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StatisticalCard from "~/components/finance/statistical-card.vue";
export default {
  components: {
    "statistical-card": StatisticalCard
  },

  data: function() {
    return {
      items: [
        {
          value: 1238000,
          title: "Active bills",
          subtitle: "Total bill amounts",
          icon: "mdi-bitcoin",
          color: "blue"
        },
        {
          value: 478000,
          title: "Amount collected",
          subtitle: "Amount collected today",
          icon: "mdi-currency-usd-circle",
          color: "black darken-2"
        },
        {
          value: 562000,
          title: "Amount not collected",
          subtitle: "Amount not collected today",
          icon: "mdi-layers-outline",
          color: "red darken-1"
        },
        {
          value: 34000,
          title: "Total bills",
          subtitle: "Amount collected today",
          icon: "mdi-barcode-scan",
          color: "blue darken-2"
        },
        {
          value: 562000,
          title: "Amount not collected",
          subtitle: "Amount not collected today",
          icon: "mdi-looks",
          color: "red darken-1"
        },
        {
          value: 3000,
          title: "Total bills",
          subtitle: "Amount collected today",
          icon: "mdi-memory",
          color: "green darken-2"
        }
      ],
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
  }
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
