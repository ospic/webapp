<template>
  <div fluid>
    <apexchart
      height="350"
      width="98%"
      type="line"
      :options="options"
      :series="data.series"
    ></apexchart>
  </div>
</template>
<script lang="js">
export default {

  props:{

    data:{
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      options:{
         chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: true,
            offsetY: 25
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          width: 3,
          curve: "smooth",
        },
        title: {
          text: "Average High & Low Temperature",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 2,
          floating: false,
          style:{
            fontSize: '14px'
          }
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        fill:{
          type:'gradient',
          gradient:{
             shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
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
                size: 7,
              }
            },

        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: {
            text: "Month",
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 0,
        },

        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
          itemMargin: {
            horizontal: 5,
            vertical: 15,
          },
        },

      },

    };
  },
};
</script>
