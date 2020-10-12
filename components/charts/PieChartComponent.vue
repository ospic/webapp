<template>
  <apexchart
    height="350"
    width="100%"
    :options="options"
    :series="data.series"
  ></apexchart>
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
          type: 'pie',
          toolbar: {
            show: true,
          },
        },
        dataLabels:{
          enabled: true,
          dropShadow:{

          }
        },
        plotOptions:{
          pie:{
            customScale: 0.8,

          }
        },
          legend: {
          position: "bottom"
          },
          title: {
              text: 'Stock Price Movement',
                align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: true,
          style:{
            fontSize: '14px',
            color: '#263238'
          }
            },

      },

    };
  },
};
</script>
