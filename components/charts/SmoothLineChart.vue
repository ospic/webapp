<template>
  <apexchart
    width="98%"
    type="line"
    :options="options"
    :series="options.series"
  ></apexchart>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {
      options: {
        series: this.data.series,
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
          categories: this.data.categories,
          tickAmount: 10
        },
        title: {
          text: this.title == null ? "No. of bills per day" : this.title,
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
          min: 0,
          title: {
            text: this.title
          }
        }
      }
    };
  }
};
</script>
