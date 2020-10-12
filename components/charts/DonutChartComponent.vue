<template>
  <apexchart
    :height="height"
    width="100%"
    :options="options"
    :series="data.series"
  ></apexchart>
</template>
<script lang="js">
export default {

  props:{
    height: {
      type: Number,
      default: 350
    },
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
          type: 'donut',
          toolbar: {
            show: true,

          },
          animation:{
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
              },
            dynamicAnimation: {
            enabled: true,
            speed: 350
            }
          },
          dropShadow:{
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke:{
          width: 0
        },
        labels: this.data.chartOptions.labels,
        dataLabels:{
          enabled: true,
          dropShadow:{

          }
        },
         fill:{
          type: 'gradient'
        },
         plotOptions:{
          pie:{
            customScale: 0.8,
             startAngle: -45,
            donut:{
              labels:{
                show:true,
                total:{
                  showAlways: true,
                  show: true
                }
              }
            }

          }
        },
          legend: {
          position: "bottom",
          show: true,
          },
          title: {
              text: this.data.title,
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
