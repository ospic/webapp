<template>
  <div>
    <apexchart
      height="395"
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
          id: 'areachart-2'
        },
         stroke: {
          width: 4,
          curve: 'smooth'
        },

        title: {
          text: "Number of consultation's conducted per day",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 2,
          floating: false,
          style:{
            fontSize: '18px',
             fontWeight:  'bold',
            color: '#666'
          }
        },



        xaxis: {
          categories: this.data.categories,
           tickAmount: 10,
          title: {
            text: "Day in a month",
            fontWeight:  'bold',
          },
          axisBorder: {
          show: true,
          color: '#78909C',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
      },

        },
        yaxis: {
          title: {
            text: "No. of consultation`s" ,
          },
          subtitle:{
            text:"Number of patient consultations opened each day"
          },
          min: 0,
          max: this.max === 'undefined' ? 0 : this.max,
            axisBorder: {
          show: true,
          color: '#78909C',
          offsetX: 0,
          offsetY: 0,
          forceNiceScale:true,
      },
      axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
      },
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
   fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },



      },

    };
  },
  created(){
  },
  computed:{
    dark(){
      return this.$vuetify.theme.dark;
    },
    max(){
      var iterable = this.data.series[0].data
      return Math.max(...iterable) + 5;
    }


  }
};
</script>
