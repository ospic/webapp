<template>
  <div id="chart">
    <apexchart
      type="area"
      height="380"
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
          curve: "smooth",
          width: 1
        },
        xaxis: {
          type: "date",
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
          },
          x: {
            format: "dd/MM/yy"
          }
        }
      }
    };
  }
};
</script>
