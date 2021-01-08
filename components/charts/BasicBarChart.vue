<template>
  <div fluid>
    <apexchart
      height="350"
      width="98%"
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
          type: "bar",

          toolbar: {
            show: true,
            offsetY: 25
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },

        title: {
          text: "Services issued on Date",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 2,
          floating: false,
          style:{
            fontSize: '16px',
            fontWeight:"18"
          }
        },


        xaxis: {
          categories: this.data.categories,
          title: {
            text: "Date",
          },
          labels:{
            show: true,
            otate: 180,
          },
          crosshairs: {
            show: false
            }
        },
        yaxis: {
          title: {
            text: "No. of issued services" ,
          },
          subtitle:{
            text:"No of issued services"
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
  created(){
    console.log(this.$vuetify.theme.dark)
  },
  computed:{
    dark(){
      return this.$vuetify.theme.dark;
    }

  }
};
</script>
