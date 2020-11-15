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
          width: '100%',
          type: 'donut',
          background: 'transparent',
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
          type: 'solid',
          colors: ['#44FF07', '#58508D','#BC5090', '#FF6361', '#FFA600']
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
                  show: false
                }
              }
            }

          }
        },
        legend: {
          position: "bottom",
          show: false,
          markers:{
           // fillColors: ['#00897B', '#ED1C23']
          },
          },
          title: {
              text: this.data.title,
              align: "left",
              margin: 0,
              offsetX: 0,
              offsetY: 0,
              floating: true,
              style:{
            fontSize: '10px',
            color: '#263238',
            fontWeight: '12'
          }
            },

      },

    };
  },
};
</script>
