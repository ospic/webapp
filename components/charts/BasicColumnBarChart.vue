<template>
  <div id="chart">
    <apexchart
      type="area"
      height="280"
      :options="chartOptions"
      :series="data.series"
    ></apexchart>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.data.categories
        },
        yaxis: {
          title: {
            text: "Total"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "" + val + "";
            }
          }
        }
      }
    };
  }
};
</script>
